from pydantic import BaseModel
from typing import List, Optional
import uuid

class ExerciseCreate(BaseModel):
    name: str
    primary_muscle: str
    secondary_muscles: Optional[List[str]] = None

class ExerciseUpdate(BaseModel):
    name: Optional[str] = None
    primary_muscle: Optional[str] = None
    secondary_muscles: Optional[List[str]] = None

class ExerciseResponse(BaseModel):
    id: uuid.UUID
    name: str
    primary_muscle: str
    secondary_muscles: Optional[List[str]] = None

    class Config:
        from_attributes = True