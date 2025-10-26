from fastapi import APIRouter, HTTPException
from ..db import SessionLocal
from ..models import Transaction
from ..schemas import TransactionResponse

router = APIRouter(prefix="/v1/transactions", tags=["transactions"])

@router.get("/{transaction_id}", response_model=TransactionResponse)
def get_transaction(transaction_id: str):
    db = SessionLocal()
    tx = db.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    db.close()

    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return tx
