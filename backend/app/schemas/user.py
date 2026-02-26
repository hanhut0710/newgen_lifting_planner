from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uuid

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password_hash: str

class UserLogin(BaseModel):
    email: EmailStr
    password_hash: str


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