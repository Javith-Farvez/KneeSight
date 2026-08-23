import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Resilient Database Connection: PostgreSQL if configured, SQLite fallback for local test
if DATABASE_URL and DATABASE_URL.strip():
    # Handle postgres:// vs postgresql:// scheme compatibility
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=300,
        echo=False
    )
else:
    # Local lightweight SQLite fallback database
    SQLITE_URL = "sqlite:///./kneesight.db"
    engine = create_engine(
        SQLITE_URL,
        connect_args={"check_same_thread": False},
        echo=False
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI database session dependency with auto-closing."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
