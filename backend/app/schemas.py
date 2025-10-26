from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any

class TransactionResponse(BaseModel):
    transaction_id: str
    source_account: Optional[str]
    destination_account: Optional[str]
    amount: float
    currency: str
    status: str
    created_at: datetime
    processed_at: Optional[datetime]
    attempts: Optional[int]
    extra_data: Optional[Any]
  
    class Config:
        orm_mode = True
