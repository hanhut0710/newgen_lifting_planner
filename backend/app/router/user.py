from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.services.user import create_user, get_all_users, update_user, delete_user

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse)
def create(data: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, data)

@router.get("/", response_model=List[UserResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_users(db)

@router.put("/{user_id}", response_model=UserResponse)
def update(user_id: str, data: UserUpdate, db: Session = Depends(get_db)):
    updated_user = update_user(db, user_id, data)
    if not updated_user:
        return {"error": "User not found"}
    return updated_user

@router.delete("/{user_id}")
def delete(user_id: str, db: Session = Depends(get_db)):
    success = delete_user(db, user_id)
    if not success:
        return {"error": "User not found"}
    return {"message": "User deleted successfully"}