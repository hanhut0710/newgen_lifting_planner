import uuid
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.core.database import Base

class NutritionProfiles(Base):
    __tablename__ = "nutrition_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    tdee = Column(Integer, nullable=False) 
    protein_grams_per_day = Column(Integer, nullable=False)
    carbs_grams_per_day = Column(Integer, nullable=False)
    fats_grams_per_day = Column(Integer, nullable=False)
    training_day = Column(Boolean, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)