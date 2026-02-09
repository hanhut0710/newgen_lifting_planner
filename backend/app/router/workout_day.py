from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.workout_day import WorkoutDayCreate, WorkoutDayResponse, WorkoutDayUpdate
from app.services.workout_day import create_workout_day, get_all_workout_days, update_workout_day, delete_workout_day

router = APIRouter(prefix="/workout_days", tags=["workout_days"])

@router.get("/", response_model=List[WorkoutDayResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_workout_days(db)

@router.post("/", response_model=WorkoutDayResponse)
def create(data: WorkoutDayCreate, db: Session = Depends(get_db)):
    return create_workout_day(db, data)

@router.put("/{workout_day_id}", response_model=WorkoutDayResponse)
def update(workout_day_id: str, data: WorkoutDayUpdate, db: Session = Depends(get_db)):
    updated_workout_day = update_workout_day(db, workout_day_id, data)
    if not updated_workout_day:
        return {"error": "Workout day not found"}
    return updated_workout_day

@router.delete("/{workout_day_id}")
def delete(workout_day_id: str, db: Session = Depends(get_db)):
    try:
        delete_workout_day(db, workout_day_id)
    except Exception as e:
        return {"error": str(e)}
    return {"message": "Workout day deleted successfully"}