from pydantic import BaseModel
from typing import List, Optional
import uuid

class WorkoutExerciseCreate(BaseModel):
    exercise_id: uuid.UUID
    workout_day_id: uuid.UUID
    reps: int
    sets: int
    rir: Optional[int] = None
    tempo: Optional[str] = None
    weight: Optional[float] = None

class WorkoutExerciseUpdate(BaseModel):
    reps: Optional[int] = None
    sets: Optional[int] = None
    rir: Optional[int] = None
    tempo: Optional[str] = None
    weight: Optional[float] = None

class WorkoutExerciseResponse(BaseModel):
    id: uuid.UUID
    exercise_id: uuid.UUID
    workout_day_id: uuid.UUID
    reps: int
    sets: int
    rir: Optional[int] = None
    tempo: Optional[str] = None
    weight: Optional[float] = None

    class Config:
        from_attributes = True