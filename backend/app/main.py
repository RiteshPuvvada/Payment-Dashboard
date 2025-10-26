from fastapi import FastAPI
from datetime import datetime, timezone
from .db import Base, engine
from .api import webhooks, transactions
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Transaction Processor")

@app.get("/")
def health():
    return {"status": "HEALTHY", "current_time": datetime.now(timezone.utc)}

@app.get("/health/worker")
def worker_health():
    return {
        "redis_url": os.getenv("REDIS_URL"),
        "db_url": os.getenv("DATABASE_URL"),
        "message": "Worker and API share same environment if both URLs match."
    }

# Include routes
app.include_router(webhooks.router)
app.include_router(transactions.router)
