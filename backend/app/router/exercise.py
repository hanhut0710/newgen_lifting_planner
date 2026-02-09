from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.exercise import ExerciseCreate, ExerciseResponse, ExerciseUpdate
from app.services.exercise import create_exercise, get_all_exercises, update_exercise, delete_exercise

router = APIRouter(prefix="/exercises", tags=["exercises"])

@router.post("/", response_model=ExerciseResponse)
def create(data: ExerciseCreate, db: Session = Depends(get_db)):
    return create_exercise(db, data)

@router.get("/", response_model=List[ExerciseResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_exercises(db)

@router.put("/{exercise_id}", response_model=ExerciseResponse)
def update(exercise_id: str, data: ExerciseUpdate, db: Session = Depends(get_db)):
    updated_exercise = update_exercise(db, exercise_id, data)
    if not updated_exercise:
        return {"error": "Exercise not found"}
    return updated_exercise

@router.delete("/{exercise_id}")
def delete(exercise_id: str, db: Session = Depends(get_db)):
    success = delete_exercise(db, exercise_id)
    if not success:
        return {"error": "Exercise not found"}
    return {"message": "Exercise deleted successfully"}