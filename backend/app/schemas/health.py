from pydantic import BaseModel
from typing import Dict, Any


class HealthResponse(BaseModel):
    status: str = "healthy"
    version: str = "1.0.0"
    environment: str = "development"
    database: str = "connected"
    storage: str = "operational"
    ai_service: str = "ready (mock demo pipeline v2.4)"
    details: Dict[str, Any] = {}
