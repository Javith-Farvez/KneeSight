import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, ForeignKey, DateTime, Integer
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class ImagingStudy(Base):
    __tablename__ = "imaging_studies"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String(36), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False, index=True)
    file_name = Column(String(255), nullable=False)
    storage_path = Column(String(500), nullable=False)  # cases/{case_id}/images/{filename}
    file_url = Column(String(1000), nullable=True)
    modality = Column(String(50), default="Radiograph")  # Radiograph, MRI, CT
    view_position = Column(String(100), default="AP Weight-Bearing")
    file_size_bytes = Column(Integer, nullable=True)
    analysis_status = Column(String(50), default="uploaded")  # uploaded, processing, analyzed, failed
    uploaded_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    case = relationship("Case", back_populates="imaging_studies")
    analysis_results = relationship("AnalysisResult", back_populates="imaging_study", cascade="all, delete-orphan")
