from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime


class ReportCreate(BaseModel):
    case_id: str
    report_title: Optional[str] = "AI-Assisted Knee Clinical Decision Report"
    report_type: Optional[str] = "Comprehensive Knee Analysis"
    summary: Optional[str] = None


class ReportResponse(BaseModel):
    id: str
    case_id: str
    report_title: str
    report_type: str
    summary: Optional[str] = None
    clinician_signoff: bool = False
    signoff_by: Optional[str] = None
    signoff_at: Optional[datetime] = None
    pdf_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
