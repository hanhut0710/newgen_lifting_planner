import uuid
from sqlalchemy import Column, String, ForeignKey 
from app.core.database import Base
from sqlalchemy.dialects.postgresql import UUID

class Schedules(Base):
    __tablename__ = "schedules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    schedule_name = Column(String, nullable=False)