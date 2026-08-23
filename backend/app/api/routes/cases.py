import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from backend.app.database.connection import get_db
from backend.app.models.case import Case
from backend.app.models.patient import Patient
from backend.app.schemas.case import CaseCreate, CaseResponse
from backend.app.services.analysis_service import MockAnalysisService

router = APIRouter(prefix="/cases", tags=["Cases"])


@router.get("", response_model=List[CaseResponse])
def get_all_cases(db: Session = Depends(get_db)):
    """Retrieve all clinical cases."""
    # Ensure default demo case exists for immediate testing
    MockAnalysisService.ensure_demo_case(db)
    cases = db.query(Case).order_by(Case.created_at.desc()).all()
    return cases


@router.post("", response_model=CaseResponse, status_code=status.HTTP_201_CREATED)
def create_case(payload: CaseCreate, db: Session = Depends(get_db)):
    """Create a new patient case."""
    patient_id = payload.patient_id
    if not patient_id:
        # Auto-create patient if not provided
        new_patient = Patient(
            mrn=f"MRN-{uuid.uuid4().hex[:6].upper()}",
            name=payload.patient_name or "Anonymous Patient",
            age=payload.patient_age or 55,
            sex=payload.patient_sex or "Male"
        )
        db.add(new_patient)
        db.flush()
        patient_id = new_patient.id

    case_num = payload.case_number or f"KS-{uuid.uuid4().hex[:4].upper()}"
    new_case = Case(
        patient_id=patient_id,
        case_number=case_num,
        clinical_indication=payload.clinical_indication,
        status="Pending Review"
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)
    return new_case


@router.get("/{case_id}", response_model=CaseResponse)
def get_case_by_id(case_id: str, db: Session = Depends(get_db)):
    """Retrieve case by UUID or Case Number (e.g. KS-0241)."""
    # Look up by ID or case_number
    case_obj = db.query(Case).filter((Case.id == case_id) | (Case.case_number == case_id)).first()
    if not case_obj:
        if case_id.upper() in ["KS-0241", "DEMO", "DEFAULT"]:
            case_obj = MockAnalysisService.ensure_demo_case(db, "KS-0241")
        else:
            raise HTTPException(status_code=404, detail="Case not found")
    return case_obj
