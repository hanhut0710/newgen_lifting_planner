from sqlalchemy.orm import Session
from app.model.workout_exercise import WorkoutExercises
from app.model.workout_day import WorkoutDays
from app.model.exercise import Exercises
from app.schemas.workout_exercise import WorkoutExerciseCreate, WorkoutExerciseUpdate
from fastapi import HTTPException

def create_workout_exercise(db: Session, workout_exercise: WorkoutExerciseCreate) -> WorkoutExercises:
    workout_day = db.query(WorkoutDays).filter(WorkoutDays.id == workout_exercise.workout_day_id).first()
    exercise = db.query(Exercises).filter(Exercises.id == workout_exercise.exercise_id).first()

    if not workout_day:
        raise HTTPException(status_code=404, detail="Workout day not found")
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    db_workout_exercise = WorkoutExercises(
        workout_day_id=workout_exercise.workout_day_id,
        exercise_id=workout_exercise.exercise_id,
        sets=workout_exercise.sets,
        reps=workout_exercise.reps,
    )
    db.add(db_workout_exercise)
    db.commit()
    db.refresh(db_workout_exercise)
    return db_workout_exercise

def update_workout_exercise(db: Session, workout_exercise_id: str, workout_exercise_data: WorkoutExerciseUpdate) -> WorkoutExercises:
    db_workout_exercise = db.query(WorkoutExercises).filter(WorkoutExercises.id == workout_exercise_id).first()
    if not db_workout_exercise:
        raise HTTPException(status_code=404, detail="Workout exercise not found")
    if workout_exercise_data.sets is not None:
        db_workout_exercise.sets = workout_exercise_data.sets
    if workout_exercise_data.reps is not None:
        db_workout_exercise.reps = workout_exercise_data.reps
    if workout_exercise_data.rir is not None:
        db_workout_exercise.rir = workout_exercise_data.rir
    if workout_exercise_data.weight_kg is not None:
        db_workout_exercise.weight_kg = workout_exercise_data.weight_kg
    if workout_exercise_data.tempo is not None:
        db_workout_exercise.tempo = workout_exercise_data.tempo
    db.commit()
    db.refresh(db_workout_exercise)
    return db_workout_exercise

def delete_workout_exercise(db: Session, workout_exercise_id: str):
    db_workout_exercise = db.query(WorkoutExercises).filter(WorkoutExercises.id == workout_exercise_id).first()
    if not db_workout_exercise:
        raise HTTPException(status_code=404, detail="Workout exercise not found")
    db.delete(db_workout_exercise)
    db.commit()

def get_all_workout_exercises(db: Session):
    return db.query(WorkoutExercises).all()