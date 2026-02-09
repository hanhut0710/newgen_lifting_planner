from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.schedule import ScheduleCreate, ScheduleUpdate, ScheduleResponse
from app.services.schedule import create_schedule, get_all_schedules, update_schedule, delete_schedule

router = APIRouter(prefix="/schedules", tags=["schedules"])

@router.post("/", response_model=ScheduleResponse)
def create(data: ScheduleCreate, db: Session = Depends(get_db)):
    return create_schedule(db, data)

@router.get("/", response_model=List[ScheduleResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_schedules(db)

@router.put("/{user_id}", response_model=ScheduleResponse)
def update(user_id: str, data: ScheduleUpdate, db: Session = Depends(get_db)):
    updated_schedule = update_schedule(db, user_id, data)
    if not updated_schedule:
        return {"error": "Schedule not found"}
    return updated_schedule

@router.delete("/{schedule_id}")
def delete(schedule_id: str, db: Session = Depends(get_db)):
    try:
        delete_schedule(db, schedule_id)
    except Exception as e:
        return {"error": str(e)}
    return {"message": "Schedule deleted successfully"}