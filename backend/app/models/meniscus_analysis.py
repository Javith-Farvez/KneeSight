import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base


class MeniscusAnalysis(Base):
    __tablename__ = "meniscus_analysis"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    analysis_id = Column(String(36), ForeignKey("analysis_results.id", ondelete="CASCADE"), nullable=False, index=True)
    tear_type = Column(String(100), default="Degenerative Horizontal Cleavage")
    tear_location = Column(String(100), default="Posterior Horn (Medial)")
    tear_grade = Column(String(50), default="Grade 2 Tear")
    kl_grade = Column(Integer, default=2)  # Kellgren-Lawrence grade 0 to 4
    oa_status = Column(String(50), default="Mild OA (KL 2)")
    cartilage_loss = Column(String(50), default="Focal Medial Thinning")
    confidence_score = Column(Float, default=0.92)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    analysis_result = relationship("AnalysisResult", back_populates="meniscus_analyses")
