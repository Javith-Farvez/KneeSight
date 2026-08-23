from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database.connection import get_db
from backend.app.models.analysis import AnalysisResult
from backend.app.models.case import Case
from backend.app.schemas.analysis import (
    StartAnalysisRequest,
    AnalysisResultResponse,
    ProcessingStep,
)
from backend.app.schemas.measurement import MeasurementResponse
from backend.app.services.analysis_service import MockAnalysisService, analysis_service

router = APIRouter(prefix="/analysis", tags=["Analysis"])


@router.post("/start", response_model=AnalysisResultResponse)
def start_analysis(payload: StartAnalysisRequest, db: Session = Depends(get_db)):
    """
    Starts simulated AI segmentation and anatomical measurement extraction pipeline.
    """
    case_obj = None
    if payload.case_id:
        case_obj = db.query(Case).filter((Case.id == payload.case_id) | (Case.case_number == payload.case_id)).first()
    if not case_obj:
        case_obj = MockAnalysisService.ensure_demo_case(db, "KS-0241")

    # Run AI Analysis Pipeline & Persist
    result = analysis_service.run_ai_analysis(
        db=db,
        case_id=case_obj.id,
        protocol=payload.protocol or "Full Knee Analysis",
        study_id=payload.study_ids[0] if payload.study_ids else None
    )

    # Format response with processing steps
    response_data = AnalysisResultResponse.from_orm(result)
    response_data.processing_steps = [ProcessingStep(**s) for s in MockAnalysisService.DEMO_PROCESSING_STEPS]
    response_data.femur_quality_pct = int(result.femur_dice_score * 100)
    response_data.tibia_quality_pct = int(result.tibia_dice_score * 100)
    response_data.meniscus_quality_pct = int(result.meniscus_dice_score * 100)
    return response_data


@router.get("/{analysis_id}", response_model=AnalysisResultResponse)
def get_analysis_result(analysis_id: str, db: Session = Depends(get_db)):
    """
    Retrieve analysis result and measurements by analysis ID or case ID.
    """
    result = db.query(AnalysisResult).filter(
        (AnalysisResult.id == analysis_id) | (AnalysisResult.case_id == analysis_id)
    ).first()

    if not result:
        # Auto-create for demo case if requested
        demo_case = MockAnalysisService.ensure_demo_case(db, "KS-0241")
        result = analysis_service.run_ai_analysis(db=db, case_id=demo_case.id)

    response_data = AnalysisResultResponse.from_orm(result)
    response_data.processing_steps = [ProcessingStep(**s) for s in MockAnalysisService.DEMO_PROCESSING_STEPS]
    response_data.femur_quality_pct = int(result.femur_dice_score * 100)
    response_data.tibia_quality_pct = int(result.tibia_dice_score * 100)
    response_data.meniscus_quality_pct = int(result.meniscus_dice_score * 100)
    return response_data
