from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MeasurementBase(BaseModel):
    femoral_width_mm: float = 73.1
    tibial_width_mm: float = 71.7
    meniscus_thickness_mm: float = 4.82
    medial_jsw_mm: float = 3.42
    lateral_jsw_mm: float = 4.85
    femorotibial_angle_deg: float = 176.8
    pixel_spacing: str = "0.143 mm/px"
    calibration_status: str = "calibrated"


class MeasurementCreate(MeasurementBase):
    analysis_id: str


class MeasurementResponse(MeasurementBase):
    id: str
    analysis_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
