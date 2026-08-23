from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database.connection import get_db
from backend.app.models.implant_plan import ImplantPlan
from backend.app.models.case import Case
from backend.app.schemas.implant_plan import ImplantPlanCreate, ImplantPlanResponse
from backend.app.services.implant_service import implant_service
from backend.app.services.analysis_service import MockAnalysisService

router = APIRouter(prefix="/implant-planning", tags=["Implant Planning"])


@router.post("", response_model=ImplantPlanResponse, status_code=status.HTTP_201_CREATED)
def create_or_update_implant_plan(payload: ImplantPlanCreate, db: Session = Depends(get_db)):
    """Create or update a surgical implant plan."""
    case_obj = db.query(Case).filter((Case.id == payload.case_id) | (Case.case_number == payload.case_id)).first()
    if not case_obj:
        case_obj = MockAnalysisService.ensure_demo_case(db, "KS-0241")

    plan = implant_service.get_or_create_implant_plan(db=db, case_id=case_obj.id)
    plan.selected_system = payload.selected_system or plan.selected_system
    plan.femoral_component_size = payload.femoral_component_size or plan.femoral_component_size
    plan.tibial_tray_size = payload.tibial_tray_size or plan.tibial_tray_size
    plan.insert_type = payload.insert_type or plan.insert_type
    plan.alignment_strategy = payload.alignment_strategy or plan.alignment_strategy
    db.commit()
    db.refresh(plan)
    return plan


@router.get("/{case_id}", response_model=ImplantPlanResponse)
def get_implant_plan(case_id: str, db: Session = Depends(get_db)):
    """Retrieve surgical implant plan by Case ID or Case Number."""
    case_obj = db.query(Case).filter((Case.id == case_id) | (Case.case_number == case_id)).first()
    if not case_obj:
        case_obj = MockAnalysisService.ensure_demo_case(db, "KS-0241")

    plan = implant_service.get_or_create_implant_plan(db=db, case_id=case_obj.id)
    return plan
