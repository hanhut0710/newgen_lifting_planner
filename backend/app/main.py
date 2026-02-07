from fastapi import FastAPI
from app.core.database import engine, Base

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to the Lifting Planner API"}

