from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.app.database.connection import get_db
from backend.app.schemas.health import HealthResponse

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("", response_model=HealthResponse)
def get_health_status(db: Session = Depends(get_db)):
    """System health check and database connectivity verification."""
    db_status = "connected"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"degraded ({str(e)})"

    return HealthResponse(
        status="healthy",
        version="1.0.0",
        environment="development",
        database=db_status,
        storage="operational",
        ai_service="ready (mock demo pipeline v2.4)",
        details={
            "api_name": "KneeSight AI Clinical Backend",
            "supported_modalities": ["Radiograph", "MRI", "CT"],
            "pipeline_version": "2.4-clinical-demo"
        }
    )
