from sqlalchemy.orm import Session
from app.model.user import Users
from app.schemas.user import UserCreate, UserUpdate, UserResponse

def create_user(db: Session, user: UserCreate) -> Users:
    db_user = Users(                                         # convert pydantic model to SQLAlchemy model 
        username=user.username,
        email=user.email,
        password_hash=user.password_hash,
        gender=user.gender,
        age=user.age,
        height_cm=user.height_cm,
        weight_kg=user.weight_kg,
        body_fat=user.body_fat
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: str, user_data: UserUpdate) -> Users:
    db_user = db.query(Users).filter(Users.id == user_id).first()
    if not db_user:
        return None
    if user_data.username is not None:
        db_user.username = user_data.username
    if user_data.email is not None:
        db_user.email = user_data.email
    if user_data.password_hash is not None:
        db_user.password_hash = user_data.password_hash
    if user_data.gender is not None:
        db_user.gender = user_data.gender
    if user_data.age is not None:
        db_user.age = user_data.age 
    if user_data.height_cm is not None:
        db_user.height_cm = user_data.height_cm
    if user_data.weight_kg is not None:
        db_user.weight_kg = user_data.weight_kg
    if user_data.body_fat is not None:
        db_user.body_fat = user_data.body_fat
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: str) -> bool:
    db_user = db.query(Users).filter(Users.id == user_id).first()
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True

def get_all_users(db: Session):
    return db.query(Users).all()