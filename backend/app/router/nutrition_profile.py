from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.nutrition_profile import NutritionProfileCreate, NutritionProfileUpdate, NutritionProfileResponse
from app.services.nutrition_profile import create_nutrition_profile, get_all_nutrition_profiles, update_nutrition_profile, delete_nutrition_profile

router = APIRouter(prefix="/nutrition_profiles", tags=["nutrition_profiles"])

@router.post("/", response_model=NutritionProfileResponse)
def create(data: NutritionProfileCreate, db: Session = Depends(get_db)):
    return create_nutrition_profile(db, data)

@router.get("/", response_model=List[NutritionProfileResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_nutrition_profiles(db)

@router.put("/{user_id}", response_model=NutritionProfileResponse)
def update(user_id: str, data: NutritionProfileUpdate, db: Session = Depends(get_db)):
    updated_profile = update_nutrition_profile(db, user_id, data)
    if not updated_profile:
        return {"error": "Nutrition profile not found"}
    return updated_profile

@router.delete("/{profile_id}")
def delete(profile_id: str, db: Session = Depends(get_db)):
    try:
        delete_nutrition_profile(db, profile_id)
    except Exception as e:
        return {"error": str(e)}
    return {"message": "Nutrition profile deleted successfully"}