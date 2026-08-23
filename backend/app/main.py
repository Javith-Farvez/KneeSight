import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from backend.app.database.base import init_db
from backend.app.api.routes import (
    health_router,
    cases_router,
    images_router,
    analysis_router,
    measurements_router,
    implant_router,
    reports_router,
)

load_dotenv()

# Initialize FastAPI Application
app = FastAPI(
    title="KneeSight AI — Clinical Backend API",
    description="Clinical decision support backend for knee osteoarthritis, meniscus analysis, and surgical implant planning.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000,http://127.0.0.1:3000,http://127.0.0.1:5173")
origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]
if "*" not in origins:
    origins.extend(["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:3000", "http://127.0.0.1:5173"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Local Storage Static Serving Fallback
storage_dir = Path("./backend/storage")
storage_dir.mkdir(parents=True, exist_ok=True)
app.mount("/storage", StaticFiles(directory=str(storage_dir)), name="storage")


@app.on_event("startup")
def on_startup():
    """Initializes database tables on application boot."""
    try:
        init_db()
        print("[KneeSight Backend] Database initialized successfully.")
    except Exception as e:
        print(f"[KneeSight Backend] Database initialization warning: {e}")


# Register API Routers
app.include_router(health_router, prefix="/api")
app.include_router(cases_router, prefix="/api")
app.include_router(images_router, prefix="/api")
app.include_router(analysis_router, prefix="/api")
app.include_router(measurements_router, prefix="/api")
app.include_router(implant_router, prefix="/api")
app.include_router(reports_router, prefix="/api")


@app.get("/")
def root():
    return {
        "service": "KneeSight AI Backend",
        "status": "operational",
        "docs": "/docs",
        "health": "/api/health"
    }


if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend.app.main:app", host=host, port=port, reload=True)
