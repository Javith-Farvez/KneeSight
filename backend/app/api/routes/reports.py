from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database.connection import get_db
from backend.app.models.report import Report
from backend.app.models.case import Case
from backend.app.schemas.report import ReportCreate, ReportResponse
from backend.app.services.analysis_service import MockAnalysisService

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/{case_id}", response_model=ReportResponse)
def get_report_by_case(case_id: str, db: Session = Depends(get_db)):
    """Retrieve clinical decision report by Case ID."""
    case_obj = db.query(Case).filter((Case.id == case_id) | (Case.case_number == case_id)).first()
    if not case_obj:
        case_obj = MockAnalysisService.ensure_demo_case(db, "KS-0241")

    report = db.query(Report).filter(Report.case_id == case_obj.id).first()
    if not report:
        report = Report(
            case_id=case_obj.id,
            report_title="AI-Assisted Knee Clinical Decision Report",
            report_type="Comprehensive Knee Analysis",
            summary="Patient Robert Vance (62M) exhibits moderate medial joint space narrowing (3.42mm) and mild OA (KL Grade 2). Femoral width calibrated at 73.1mm, tibial width at 71.7mm. Surgical implant plan drafted for Persona Knee System (Size 6 Femur, Size 5 Tibia).",
            clinician_signoff=False
        )
        db.add(report)
        db.commit()
        db.refresh(report)

    return report


@router.post("", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
def create_or_update_report(payload: ReportCreate, db: Session = Depends(get_db)):
    """Create or update a clinical decision report."""
    case_obj = db.query(Case).filter((Case.id == payload.case_id) | (Case.case_number == payload.case_id)).first()
    if not case_obj:
        case_obj = MockAnalysisService.ensure_demo_case(db, "KS-0241")

    report = db.query(Report).filter(Report.case_id == case_obj.id).first()
    if not report:
        report = Report(
            case_id=case_obj.id,
            report_title=payload.report_title or "AI-Assisted Knee Clinical Decision Report",
            report_type=payload.report_type or "Comprehensive Knee Analysis",
            summary=payload.summary
        )
        db.add(report)
    else:
        report.report_title = payload.report_title or report.report_title
        report.summary = payload.summary or report.summary

    db.commit()
    db.refresh(report)
    return report
