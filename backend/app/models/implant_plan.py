import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class ImplantPlan(Base):
    __tablename__ = "implant_plans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String(36), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False, index=True)
    selected_system = Column(String(100), default="Persona Knee System")
    manufacturer = Column(String(100), default="Zimmer Biomet")
    femoral_component_size = Column(String(50), default="Size 6 (Standard)")
    femoral_resection_mm = Column(Float, default=9.0)
    femoral_flexion_deg = Column(Float, default=3.0)
    tibial_tray_size = Column(String(50), default="Size 5")
    tibial_resection_mm = Column(Float, default=8.5)
    tibial_slope_deg = Column(Float, default=3.0)
    insert_type = Column(String(50), default="CR (Cruciate Retaining)")
    insert_thickness_mm = Column(Float, default=10.0)
    alignment_strategy = Column(String(100), default="Mechanical Alignment (MA)")
    predicted_postop_hka = Column(Float, default=179.8)
    status = Column(String(50), default="Drafted")  # Drafted, Approved, Exported
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    case = relationship("Case", back_populates="implant_plans")
    implant_options = relationship("ImplantOption", back_populates="implant_plan", cascade="all, delete-orphan")
