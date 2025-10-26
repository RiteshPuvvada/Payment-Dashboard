import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if "supabase.co" in DATABASE_URL and "options=" not in DATABASE_URL:
    DATABASE_URL += "?options=-c%20inet_client_addr_family%3Dipv4"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
