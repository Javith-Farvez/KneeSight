from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class PatientBase(BaseModel):
    mrn: str
    name: str
    age: int
    sex: str
    contact_phone: Optional[str] = None
    contact_email: Optional[str] = None


class PatientCreate(PatientBase):
    pass


class PatientResponse(PatientBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CaseBase(BaseModel):
    case_number: str
    status: str = "Pending Review"
    clinical_indication: Optional[str] = None
    assigned_clinician_id: Optional[str] = None


class CaseCreate(BaseModel):
    patient_id: Optional[str] = None
    patient_name: Optional[str] = None
    patient_age: Optional[int] = None
    patient_sex: Optional[str] = None
    case_number: Optional[str] = None
    clinical_indication: Optional[str] = "Routine knee pain and joint space evaluation"


class CaseResponse(CaseBase):
    id: str
    patient_id: str
    patient: Optional[PatientResponse] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
