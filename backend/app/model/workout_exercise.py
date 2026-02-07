import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class WorkoutExercises(Base):
    __tablename__ = "workout_exercises"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workout_day_id = Column(UUID(as_uuid=True), ForeignKey("workout_days.id"), nullable=False)
    exercise_id = Column(UUID(as_uuid=True), ForeignKey("exercises.id"), nullable=False)
    sets = Column(Integer, nullable=False)
    reps = Column(Integer, nullable=False)
    weight_kg = Column(Float, nullable=True)
    rir = Column(Integer, nullable=True)  
    tempo = Column(String, nullable=True, default="")