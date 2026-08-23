import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    role = Column(String(50), default="clinician")  # clinician, radiologist, surgeon, admin
    department = Column(String(100), default="Orthopedics")
    hospital_affiliation = Column(String(255), default="Apex Orthopedic Institute")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
