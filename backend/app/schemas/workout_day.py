from pydantic import BaseModel
from typing import List, Optional
import uuid

class WorkoutDayCreate(BaseModel):
    schedule_id: uuid.UUID
    is_rest_day: bool
    day_of_week: int 

class WorkoutDayUpdate(BaseModel):
    is_rest_day: Optional[bool] = None
    day_of_week: Optional[int] = None


class WorkoutDayResponse(BaseModel):
    id: uuid.UUID
    schedule_id: uuid.UUID
    is_rest_day: bool
    day_of_week: int 

    class Config:
        from_attributes = True