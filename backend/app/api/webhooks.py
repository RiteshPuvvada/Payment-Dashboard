from fastapi import APIRouter, Request, status
from sqlalchemy.exc import IntegrityError
from ..db import SessionLocal
from ..models import Transaction
from ..tasks import enqueue_transaction

router = APIRouter(prefix="/v1/webhooks", tags=["webhooks"])

@router.post("/transactions", status_code=status.HTTP_202_ACCEPTED)
async def receive_transaction(request: Request):
    data = await request.json()
    db = SessionLocal()
    tx = Transaction(
        transaction_id=data["transaction_id"],
        source_account=data.get("source_account"),
        destination_account=data.get("destination_account"),
        amount=data["amount"],
        currency=data["currency"],
        status="PROCESSING",
    )
    try:
        db.add(tx)
        db.commit()
        enqueue_transaction(tx.transaction_id)
    except IntegrityError:
        db.rollback()  # duplicate webhook → ignore
    finally:
        db.close()
    return {"ack": "received"}
