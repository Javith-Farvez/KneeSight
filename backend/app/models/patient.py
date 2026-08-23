import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    mrn = Column(String(64), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    sex = Column(String(16), nullable=False)  # Male, Female, Other
    contact_phone = Column(String(32), nullable=True)
    contact_email = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    cases = relationship("Case", back_populates="patient", cascade="all, delete-orphan")
