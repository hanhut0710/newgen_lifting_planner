from sqlalchemy.orm import Session
from app.model.schedule import Schedules
from app.model.user import Users
from app.schemas.schedule import ScheduleCreate, ScheduleUpdate, ScheduleResponse
from fastapi import HTTPException

def create_schedule(db: Session, schedule: ScheduleCreate) -> Schedules:
    user = db.query(Users).filter(Users.id == schedule.user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_schedule = Schedules(
        user_id=schedule.user_id,
        schedule_name=schedule.schudule_name,
    )

    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def update_schedule(db: Session, user_id: str, schedule_data: ScheduleUpdate) -> Schedules:
    db_schedule = db.query(Schedules).filter(Schedules.user_id == user_id).first()
    if not db_schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    if schedule_data.schudule_name is not None:
        db_schedule.schedule_name= schedule_data.schudule_name
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def delete_schedule(db: Session, schedule_id: str):
    db_schedule = db.query(Schedules).filter(Schedules.id == schedule_id).first()
    if not db_schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    db.delete(db_schedule)
    db.commit()

def get_all_schedules(db: Session):
    return db.query(Schedules).all()
