import os
import time
import logging
from redis import Redis
from rq import Queue, Retry
from sqlalchemy.sql import func
from .db import SessionLocal
from .models import Transaction

# -----------------------------------------------------------
# Logging Configuration
# -----------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("app.tasks")

# -----------------------------------------------------------
# Redis + Queue Setup
# -----------------------------------------------------------
REDIS_URL = os.getenv("REDIS_URL")
DATABASE_URL = os.getenv("DATABASE_URL")

redis_conn = Redis.from_url(REDIS_URL)
q = Queue("transactions", connection=redis_conn)
listen = ["transactions"]

logger.info(f"Worker initialized")
logger.info(f"Connected to Redis: {REDIS_URL}")
logger.info(f"Queue name: {q.name}")
logger.info(f" Using Database: {DATABASE_URL}")

# -----------------------------------------------------------
# Job Enqueue Function
# -----------------------------------------------------------
def enqueue_transaction(tx_id: str):
    """Enqueue a new transaction for background processing."""
    logger.info(f"🟡 Enqueuing transaction: {tx_id}")
    try:
        q.enqueue(process_transaction, tx_id, job_id=tx_id, retry=Retry(max=3))
        logger.info(f"✅ Transaction {tx_id} successfully enqueued.")
    except Exception as e:
        logger.error(f"❌ Failed to enqueue transaction {tx_id}: {e}")

# -----------------------------------------------------------
# Job Worker Function
# -----------------------------------------------------------
def process_transaction(tx_id: str):
    """Simulate background transaction processing."""
    logger.info(f"⚙️  Processing transaction: {tx_id}")

    db = SessionLocal()
    tx = db.query(Transaction).filter_by(transaction_id=tx_id).first()

    if not tx:
        logger.warning(f"🚫 Transaction {tx_id} not found in DB. Skipping.")
        db.close()
        return

    if tx.status == "PROCESSED":
        logger.info(f"🟢 Transaction {tx_id} already processed. Skipping.")
        db.close()
        return

    try:
        logger.info(f"⏳ Simulating 30-second external processing delay...")
        time.sleep(30)

        tx.status = "PROCESSED"
        tx.processed_at = func.now()
        db.commit()
        logger.info(f"✅ Transaction {tx_id} marked as PROCESSED at {tx.processed_at}")
    except Exception as e:
        logger.error(f"❌ Error while processing transaction {tx_id}: {e}")
        db.rollback()
    finally:
        db.close()
        logger.info(f"🧹 Database session closed for {tx_id}")

# -----------------------------------------------------------
# Local Debug Entry
# -----------------------------------------------------------
if __name__ == "__main__":
    logger.info("🔧 Running standalone worker test...")
    process_transaction("test_txn")
