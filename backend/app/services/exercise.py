from sqlalchemy.orm import Session
from app.model.exercise import Exercises
from app.schemas.exercise import ExerciseCreate, ExerciseUpdate

def create_exercise(db: Session, exercise: ExerciseCreate) -> Exercises:
    db_exercise = Exercises(                                         # convert pydantic model to SQLAlchemy model 
        name=exercise.name,
        primary_muscle=exercise.primary_muscle,
        secondary_muscle=exercise.secondary_muscles or []
    )
    db.add(db_exercise)
    db.commit()
    db.refresh(db_exercise)
    return db_exercise

def update_exercise(db: Session, exercise_id: str, exercise_data: ExerciseUpdate) -> Exercises:
    db_exercise = db.query(Exercises).filter(Exercises.id == exercise_id).first()
    if not db_exercise:
        return None
    if exercise_data.name is not None:
        db_exercise.name = exercise_data.name
    if exercise_data.primary_muscle is not None:
        db_exercise.primary_muscle = exercise_data.primary_muscle
    if exercise_data.secondary_muscles is not None:
        db_exercise.secondary_muscle = exercise_data.secondary_muscles
    db.commit()
    db.refresh(db_exercise)
    return db_exercise

def delete_exercise(db: Session, exercise_id: str) -> bool:
    db_exercise = db.query(Exercises).filter(Exercises.id == exercise_id).first()
    if not db_exercise:
        return False
    db.delete(db_exercise)
    db.commit()
    return True

def get_all_exercises(db: Session):
    return db.query(Exercises).all() 