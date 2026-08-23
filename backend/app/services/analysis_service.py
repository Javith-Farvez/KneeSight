import uuid
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from backend.app.models.analysis import AnalysisResult
from backend.app.models.measurement import Measurement
from backend.app.models.meniscus_analysis import MeniscusAnalysis
from backend.app.models.case import Case
from backend.app.models.patient import Patient


class MockAnalysisService:
    """
    Realistic Mock AI Analysis Service for KneeSight AI.
    Simulates the multi-step clinical anatomical segmentation and measurement pipeline.
    """

    DEMO_PROCESSING_STEPS = [
        {"step_number": 1, "title": "Image validation", "duration_ms": 700, "status": "completed", "finding": "Valid resolution & contrast verified"},
        {"step_number": 2, "title": "Image preprocessing", "duration_ms": 900, "status": "completed", "finding": "Histogram normalized (0.143 mm/px)"},
        {"step_number": 3, "title": "Femur detection", "duration_ms": 900, "status": "completed", "finding": "Femoral condyles localized (97% Dice)"},
        {"step_number": 4, "title": "Tibia segmentation", "duration_ms": 900, "status": "completed", "finding": "Tibial plateau segmented (96% Dice)"},
        {"step_number": 5, "title": "Meniscus detection", "duration_ms": 1100, "status": "completed", "finding": "Medial horn fibrocartilage mapped (89% Dice)"},
        {"step_number": 6, "title": "Measurement extraction", "duration_ms": 1000, "status": "completed", "finding": "Caliper geometries calculated"},
        {"step_number": 7, "title": "Analysis complete", "duration_ms": 600, "status": "completed", "finding": "Clinical report package generated"},
    ]

    @staticmethod
    def ensure_demo_case(db: Session, case_number: str = "KS-0241") -> Case:
        """Ensures demo patient and case exist in the database."""
        existing_case = db.query(Case).filter(Case.case_number == case_number).first()
        if existing_case:
            return existing_case

        # Create Demo Patient
        demo_patient = Patient(
            mrn="MRN-88204",
            name="Robert Vance",
            age=62,
            sex="Male",
            contact_phone="(555) 349-2041",
            contact_email="r.vance@example.com"
        )
        db.add(demo_patient)
        db.flush()

        # Create Demo Case
        demo_case = Case(
            patient_id=demo_patient.id,
            case_number=case_number,
            status="Review Required",
            clinical_indication="Bilateral knee stiffness, medial compartment joint space narrowing, KL Grade 2 osteoarthritis"
        )
        db.add(demo_case)
        db.commit()
        db.refresh(demo_case)
        return demo_case

    @classmethod
    def run_ai_analysis(cls, db: Session, case_id: str, protocol: str = "Full Knee Analysis", study_id: str = None) -> AnalysisResult:
        """
        Executes mock AI analysis and persists clinical measurements and scores.
        """
        analysis = AnalysisResult(
            case_id=case_id,
            study_id=study_id,
            protocol=protocol,
            status="completed",
            femur_dice_score=0.97,
            tibia_dice_score=0.96,
            meniscus_dice_score=0.89,
            model_version="v2.4-clinical-demo",
            is_demo_analysis="AI-Assisted Demo Analysis",
            disclaimer="Demo results — for clinical review.",
            summary_notes="Preserved femoral bicondylar geometry (73.1mm). Mild medial tibial plateau flattening (71.7mm). Medial meniscus thickness measured at 4.82mm with focal thinning."
        )
        db.add(analysis)
        db.flush()

        # Add Calibrated Anatomical Measurements
        measurements = Measurement(
            analysis_id=analysis.id,
            femoral_width_mm=73.1,
            tibial_width_mm=71.7,
            meniscus_thickness_mm=4.82,
            medial_jsw_mm=3.42,
            lateral_jsw_mm=4.85,
            femorotibial_angle_deg=176.8,
            pixel_spacing="0.143 mm/px",
            calibration_status="calibrated"
        )
        db.add(measurements)

        # Add Meniscus OA Analysis Record
        meniscus_eval = MeniscusAnalysis(
            analysis_id=analysis.id,
            tear_type="Degenerative Horizontal Cleavage",
            tear_location="Posterior Horn (Medial)",
            tear_grade="Grade 2 Tear",
            kl_grade=2,
            oa_status="Mild OA (KL 2)",
            cartilage_loss="Focal Medial Thinning",
            confidence_score=0.92
        )
        db.add(meniscus_eval)

        db.commit()
        db.refresh(analysis)
        return analysis


analysis_service = MockAnalysisService()
