from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ImplantOptionResponse(BaseModel):
    id: str
    rank: int
    brand: str
    manufacturer: str
    femoral_size: str
    tibial_size: str
    insert_thickness: str
    bone_coverage_pct: float
    overhang_mm: float
    match_score_pct: float

    class Config:
        from_attributes = True


class ImplantPlanCreate(BaseModel):
    case_id: str
    selected_system: Optional[str] = "Persona Knee System"
    manufacturer: Optional[str] = "Zimmer Biomet"
    femoral_component_size: Optional[str] = "Size 6 (Standard)"
    tibial_tray_size: Optional[str] = "Size 5"
    insert_type: Optional[str] = "CR (Cruciate Retaining)"
    alignment_strategy: Optional[str] = "Mechanical Alignment (MA)"


class ImplantPlanResponse(BaseModel):
    id: str
    case_id: str
    selected_system: str
    manufacturer: str
    femoral_component_size: str
    femoral_resection_mm: float
    femoral_flexion_deg: float
    tibial_tray_size: str
    tibial_resection_mm: float
    tibial_slope_deg: float
    insert_type: str
    insert_thickness_mm: float
    alignment_strategy: str
    predicted_postop_hka: float
    status: str
    options: Optional[List[ImplantOptionResponse]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
