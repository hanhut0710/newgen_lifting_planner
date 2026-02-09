from pydantic import BaseModel
from typing import List, Optional
import uuid

class UserCreate(BaseModel):
    username: str
    email: str
    password_hash: str
    gender: str
    age: int
    height_cm: float
    weight_kg: float
    body_fat: float
    created_at: Optional[str] = None

class UserUpdate(BaseModel):
    email: Optional[str] = None
    password_hash: Optional[str] = None
    username: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    body_fat: Optional[float] = None

class UserResponse(BaseModel):
    id: uuid.UUID
    username: str   
    email: str
    gender: str
    age: int
    height_cm: float
    weight_kg: float
    body_fat: float
    created_at: str

    class Config:
        from_attributes = True