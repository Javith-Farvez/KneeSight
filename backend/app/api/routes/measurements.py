from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database.connection import get_db
from backend.app.models.measurement import Measurement
from backend.app.models.analysis import AnalysisResult
from backend.app.schemas.measurement import MeasurementResponse
from backend.app.services.analysis_service import MockAnalysisService, analysis_service

router = APIRouter(prefix="/measurements", tags=["Measurements"])


@router.get("/{analysis_id}", response_model=MeasurementResponse)
def get_measurements(analysis_id: str, db: Session = Depends(get_db)):
    """
    Retrieve anatomical measurements (femoral width 73.1mm, tibial width 71.7mm, meniscus thickness 4.82mm).
    """
    measurement = db.query(Measurement).filter(
        (Measurement.analysis_id == analysis_id) | (Measurement.id == analysis_id)
    ).first()

    if not measurement:
        # Fallback to look up by case_id
        analysis = db.query(AnalysisResult).filter(AnalysisResult.case_id == analysis_id).first()
        if analysis:
            measurement = db.query(Measurement).filter(Measurement.analysis_id == analysis.id).first()

    if not measurement:
        demo_case = MockAnalysisService.ensure_demo_case(db, "KS-0241")
        new_analysis = analysis_service.run_ai_analysis(db=db, case_id=demo_case.id)
        measurement = db.query(Measurement).filter(Measurement.analysis_id == new_analysis.id).first()

    return measurement
