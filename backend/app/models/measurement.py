import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    analysis_id = Column(String(36), ForeignKey("analysis_results.id", ondelete="CASCADE"), nullable=False, index=True)
    femoral_width_mm = Column(Float, default=73.1)
    tibial_width_mm = Column(Float, default=71.7)
    meniscus_thickness_mm = Column(Float, default=4.82)
    medial_jsw_mm = Column(Float, default=3.42)
    lateral_jsw_mm = Column(Float, default=4.85)
    femorotibial_angle_deg = Column(Float, default=176.8)
    pixel_spacing = Column(String(50), default="0.143 mm/px")
    calibration_status = Column(String(50), default="calibrated")
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    analysis_result = relationship("AnalysisResult", back_populates="measurements")
