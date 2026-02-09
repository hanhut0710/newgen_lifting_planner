from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.model.nutrition_profile import NutritionProfiles
from app.model.user import Users
from app.schemas.nutrition_profile import NutritionProfileCreate, NutritionProfileUpdate, NutritionProfileResponse

def create_nutrition_profile(db: Session, profile: NutritionProfileCreate) -> NutritionProfiles:

    user = db.query(Users).filter(Users.id == profile.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_profile = NutritionProfiles(
        user_id=profile.user_id,
        tdee=profile.tdee,
        protein_grams=profile.protein_grams,
        carbs_grams=profile.carbs_grams,
        fats_grams=profile.fats_grams,
        training_day=profile.training_day
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def update_nutrition_profile(db: Session, user_id: str, profile_data: NutritionProfileUpdate) -> NutritionProfiles:
    db_profile = db.query(NutritionProfiles).filter(NutritionProfiles.user_id == user_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Nutrition profile not found")
    if profile_data.tdee is not None:
        db_profile.tdee = profile_data.tdee
    if profile_data.protein_grams is not None:
        db_profile.protein_grams = profile_data.protein_grams
    if profile_data.carbs_grams is not None:
        db_profile.carbs_grams = profile_data.carbs_grams
    if profile_data.fats_grams is not None:
        db_profile.fats_grams = profile_data.fats_grams
    if profile_data.training_day is not None:
        db_profile.training_day = profile_data.training_day
    db.commit()
    db.refresh(db_profile)
    return db_profile

def delete_nutrition_profile(db: Session, profile_id: str):
    db_profile = db.query(NutritionProfiles).filter(NutritionProfiles.id == profile_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Nutrition profile not found")
    db.delete(db_profile)
    db.commit()


def get_all_nutrition_profiles(db: Session):
    return db.query(NutritionProfiles).all()