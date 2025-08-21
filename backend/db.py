# DB connection code goes here
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:pass@localhost/grad_assistant"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Program(Base):
    __tablename__ = "programs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    university = Column(String)
    location = Column(String)
    deadline = Column(Date)
    keywords = Column(String)
    funding = Column(String)