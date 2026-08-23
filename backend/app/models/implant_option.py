import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Integer
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class ImplantOption(Base):
    __tablename__ = "implant_options"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    implant_plan_id = Column(String(36), ForeignKey("implant_plans.id", ondelete="CASCADE"), nullable=False, index=True)
    rank = Column(Integer, default=1)
    brand = Column(String(100), default="Persona Knee")
    manufacturer = Column(String(100), default="Zimmer Biomet")
    femoral_size = Column(String(50), default="Size 6")
    tibial_size = Column(String(50), default="Size 5")
    insert_thickness = Column(String(50), default="10mm CR")
    bone_coverage_pct = Column(Float, default=94.8)
    overhang_mm = Column(Float, default=0.2)
    match_score_pct = Column(Float, default=96.4)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # Relationships
    implant_plan = relationship("ImplantPlan", back_populates="implant_options")
