import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String(36), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False, index=True)
    report_title = Column(String(255), default="AI-Assisted Knee Clinical Decision Report")
    report_type = Column(String(100), default="Comprehensive Knee Analysis")
    summary = Column(Text, nullable=True)
    clinician_signoff = Column(Boolean, default=False)
    signoff_by = Column(String(255), nullable=True)
    signoff_at = Column(DateTime(timezone=True), nullable=True)
    pdf_url = Column(String(1000), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    case = relationship("Case", back_populates="reports")
