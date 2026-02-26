import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from app.core.database import Base

class Exercises(Base):
    __tablename__ = "exercises"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
    img_url = Column(String, nullable=False)
    primary_muscle = Column(String, nullable=False)
    secondary_muscle = Column(ARRAY(String), nullable=True)