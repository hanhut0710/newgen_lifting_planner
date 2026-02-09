from pydantic import BaseModel
from typing import List, Optional
import uuid

class ScheduleCreate(BaseModel):
    user_id: uuid.UUID
    schudule_name: str

class ScheduleUpdate(BaseModel):
    schudule_name: Optional[str] = None

class ScheduleResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    schudule_name: str

    class Config:
        from_attributes = True
