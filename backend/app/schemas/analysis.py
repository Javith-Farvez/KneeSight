from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from backend.app.schemas.measurement import MeasurementResponse


class StartAnalysisRequest(BaseModel):
    case_id: Optional[str] = None
    study_ids: Optional[List[str]] = None
    protocol: Optional[str] = "Full Knee Analysis"
    image_names: Optional[List[str]] = None


class ProcessingStep(BaseModel):
    step_number: int
    title: str
    duration_ms: int
    status: str = "completed"
    finding: Optional[str] = None


class AnalysisResultResponse(BaseModel):
    id: str
    case_id: str
    study_id: Optional[str] = None
    protocol: str = "Full Knee Analysis"
    status: str = "completed"
    femur_dice_score: float = 0.97
    tibia_dice_score: float = 0.96
    meniscus_dice_score: float = 0.89
    femur_quality_pct: int = 97
    tibia_quality_pct: int = 96
    meniscus_quality_pct: int = 89
    model_version: str = "v2.4-clinical-demo"
    summary_notes: Optional[str] = None
    is_demo_analysis: str = "AI-Assisted Demo Analysis"
    disclaimer: str = "Demo results — for clinical review."
    completed_at: Optional[datetime] = None
    created_at: datetime
    measurements: Optional[List[MeasurementResponse]] = None
    processing_steps: Optional[List[ProcessingStep]] = None

    class Config:
        from_attributes = True
