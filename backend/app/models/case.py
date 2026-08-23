import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class Case(Base):
    __tablename__ = "cases"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    patient_id = Column(String(36), ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True)
    case_number = Column(String(64), unique=True, nullable=False, index=True)  # e.g., KS-0241
    status = Column(String(50), default="Pending Review")  # Completed, Review Required, Flagged
    clinical_indication = Column(String(500), nullable=True)
    assigned_clinician_id = Column(String(36), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    patient = relationship("Patient", back_populates="cases")
    imaging_studies = relationship("ImagingStudy", back_populates="case", cascade="all, delete-orphan")
    analysis_results = relationship("AnalysisResult", back_populates="case", cascade="all, delete-orphan")
    implant_plans = relationship("ImplantPlan", back_populates="case", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="case", cascade="all, delete-orphan")
