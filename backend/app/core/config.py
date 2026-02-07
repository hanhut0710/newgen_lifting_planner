from dotenv import load_dotenv
import os

load_dotenv()

hostname = os.getenv("localhost")
port = os.getenv("PORT")
username = os.getenv("username")
password = os.getenv("password")
database = os.getenv("database")

DATABASE_URL = f"postgresql://{username}:{password}@{hostname}:{port}/{database}"

