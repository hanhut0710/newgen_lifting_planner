from fastapi import FastAPI
from app.core.database import engine, Base
from app.router import exercise, user, nutrition_profile, schedule, workout_day, workout_exercise

app = FastAPI()

app.include_router(exercise.router)
app.include_router(user.router)
app.include_router(nutrition_profile.router)
app.include_router(schedule.router)
app.include_router(workout_day.router)
app.include_router(workout_exercise.router)
