from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.workout_exercise import WorkoutExerciseCreate, WorkoutExerciseUpdate, WorkoutExerciseResponse
from app.services.workout_exercise import create_workout_exercise, get_all_workout_exercises, update_workout_exercise, delete_workout_exercise

router = APIRouter(prefix="/workout_exercises", tags=["workout_exercises"])

@router.post("/", response_model=WorkoutExerciseResponse)
def create(data: WorkoutExerciseCreate, db: Session = Depends(get_db)):
    return create_workout_exercise(db, data)

@router.get("/", response_model=List[WorkoutExerciseResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_workout_exercises(db)

@router.put("/{workout_exercise_id}", response_model=WorkoutExerciseResponse)
def update(workout_exercise_id: str, data: WorkoutExerciseUpdate, db: Session = Depends(get_db)):
    updated_workout_exercise = update_workout_exercise(db, workout_exercise_id, data)
    if not updated_workout_exercise:
        return {"error": "Workout exercise not found"}
    return updated_workout_exercise

@router.delete("/{workout_exercise_id}")
def delete(workout_exercise_id: str, db: Session = Depends(get_db)):
    try:
        delete_workout_exercise(db, workout_exercise_id)
    except Exception as e:
        return {"error": str(e)}
    return {"message": "Workout exercise deleted successfully"}