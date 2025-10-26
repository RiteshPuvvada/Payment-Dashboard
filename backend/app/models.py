from sqlalchemy import Column, Integer, String, Numeric, JSON, DateTime, CheckConstraint
from sqlalchemy.sql import func
from .db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String, unique=True, nullable=False)
    source_account = Column(String)
    destination_account = Column(String)
    amount = Column(Numeric(18, 2), nullable=False)
    currency = Column(String, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    processed_at = Column(DateTime(timezone=True))
    attempts = Column(Integer, default=0)
    extra_data = Column(JSON, default={}) 
    __table_args__ = (CheckConstraint("status IN ('PROCESSING','PROCESSED','FAILED')"),)
