import uuid 
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class WorkoutDays(Base):
    __tablename__ = "workout_days"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    schedule_id = Column(UUID(as_uuid=True), ForeignKey("schedules.id"), nullable=False)
    day_of_week = Column(Integer, nullable=False)
    is_rest_day = Column(Boolean, default=False)