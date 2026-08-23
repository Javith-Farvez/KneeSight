from sqlalchemy.orm import Session
from typing import Optional, List
from backend.app.models.measurement import Measurement
from backend.app.models.analysis import AnalysisResult


class MeasurementService:
    @staticmethod
    def get_measurements_by_analysis(db: Session, analysis_id: str) -> Optional[Measurement]:
        return db.query(Measurement).filter(Measurement.analysis_id == analysis_id).first()

    @staticmethod
    def get_measurements_by_case(db: Session, case_id: str) -> List[Measurement]:
        return (
            db.query(Measurement)
            .join(AnalysisResult, Measurement.analysis_id == AnalysisResult.id)
            .filter(AnalysisResult.case_id == case_id)
            .all()
        )


measurement_service = MeasurementService()
