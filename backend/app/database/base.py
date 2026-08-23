from backend.app.database.connection import Base, engine


def init_db():
    """Initializes all database tables mapped to SQLAlchemy models."""
    from backend.app.models import (
        user,
        patient,
        case,
        imaging_study,
        analysis,
        measurement,
        meniscus_analysis,
        implant_plan,
        implant_option,
        report,
        notification,
    )
    Base.metadata.create_all(bind=engine)
