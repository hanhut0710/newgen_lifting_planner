from sqlalchemy.orm import Session
from app.model.workout_day import WorkoutDays
from app.model.schedule import Schedules
from app.schemas.workout_day import WorkoutDayCreate, WorkoutDayUpdate
from fastapi import HTTPException

def create_workout_day(db: Session, workout_day: WorkoutDayCreate) -> WorkoutDays:
    schedule = db.query(Schedules).filter(Schedules.id == workout_day.schedule_id).first()

    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")

    db_workout_day = WorkoutDays(
        schedule_id=workout_day.schedule_id,
        day_name=workout_day.day_name,
    )
    db.add(db_workout_day)
    db.commit()
    db.refresh(db_workout_day)
    return db_workout_day

def update_workout_day(db: Session, workout_day_id: str, workout_day_data: WorkoutDayUpdate) -> WorkoutDays:
    db_workout_day = db.query(WorkoutDays).filter(WorkoutDays.id == workout_day_id).first()
    if not db_workout_day:
        raise HTTPException(status_code=404, detail="Workout day not found")
    if workout_day_data.day_name is not None:
        db_workout_day.day_name = workout_day_data.day_name
    db.commit()
    db.refresh(db_workout_day)
    return db_workout_day

def delete_workout_day(db: Session, workout_day_id: str):
    db_workout_day = db.query(WorkoutDays).filter(WorkoutDays.id == workout_day_id).first()
    if not db_workout_day:
        raise HTTPException(status_code=404, detail="Workout day not found")
    db.delete(db_workout_day)
    db.commit()

def get_all_workout_days(db: Session):
    return db.query(WorkoutDays).all()