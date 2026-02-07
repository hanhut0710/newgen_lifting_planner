import uuid
from sqlalchemy import Column, String, Integer, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

from app.core.database import Base

class Users(Base):
    __tablename__ ="users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    gender = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    height_cm = Column(Float, nullable=True)
    weight_kg = Column(Float, nullable=True)
    body_fat = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
