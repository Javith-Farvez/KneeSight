import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String(36), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False, index=True)
    study_id = Column(String(36), ForeignKey("imaging_studies.id", ondelete="SET NULL"), nullable=True)
    protocol = Column(String(100), default="Full Knee Analysis")
    status = Column(String(50), default="completed")  # queued, processing, completed, error
    femur_dice_score = Column(Float, default=0.97)
    tibia_dice_score = Column(Float, default=0.96)
    meniscus_dice_score = Column(Float, default=0.89)
    model_version = Column(String(50), default="v2.4-clinical-demo")
    summary_notes = Column(Text, nullable=True)
    is_demo_analysis = Column(String(50), default="AI-Assisted Demo Analysis")
    disclaimer = Column(String(255), default="Demo results — for clinical review.")
    completed_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    case = relationship("Case", back_populates="analysis_results")
    imaging_study = relationship("ImagingStudy", back_populates="analysis_results")
    measurements = relationship("Measurement", back_populates="analysis_result", cascade="all, delete-orphan")
    meniscus_analyses = relationship("MeniscusAnalysis", back_populates="analysis_result", cascade="all, delete-orphan")
