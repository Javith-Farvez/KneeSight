from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ImagingStudyBase(BaseModel):
    case_id: str
    file_name: str
    storage_path: str
    file_url: Optional[str] = None
    modality: str = "Radiograph"
    view_position: str = "AP Weight-Bearing"
    file_size_bytes: Optional[int] = None
    analysis_status: str = "uploaded"


class ImagingStudyCreate(BaseModel):
    case_id: str
    file_name: str
    modality: Optional[str] = "Radiograph"
    view_position: Optional[str] = "AP Weight-Bearing"


class ImagingStudyResponse(ImagingStudyBase):
    id: str
    uploaded_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MultiImageUploadResponse(BaseModel):
    message: str
    uploaded_count: int
    case_id: str
    images: List[ImagingStudyResponse]
