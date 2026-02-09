from pydantic import BaseModel
from typing import List, Optional
import uuid

class NutritionProfileCreate(BaseModel):
    user_id: uuid.UUID
    tdee: float
    protein_grams: float
    carbs_grams: float
    fats_grams: float
    training_day: bool

class NutritionProfileUpdate(BaseModel):
    tdee: Optional[float] = None
    protein_grams: Optional[float] = None
    carbs_grams: Optional[float] = None
    fats_grams: Optional[float] = None
    training_day: Optional[bool] = None

class NutritionProfileResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    tdee: float
    protein_grams: float
    carbs_grams: float
    fats_grams: float
    training_day: bool

    class Config:
        from_attributes = True

