from fastapi import FastAPI
from app.core.database import engine, Base
from app.router import exercise, user, nutrition_profile, schedule, workout_day, workout_exercise, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow all origins (for development only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exercise.router)
app.include_router(user.router)
app.include_router(nutrition_profile.router)
app.include_router(schedule.router)
app.include_router(workout_day.router)
app.include_router(workout_exercise.router)
app.include_router(auth.router)
