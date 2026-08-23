from sqlalchemy.orm import Session
from backend.app.models.implant_plan import ImplantPlan
from backend.app.models.implant_option import ImplantOption


class ImplantService:
    @staticmethod
    def get_or_create_implant_plan(db: Session, case_id: str) -> ImplantPlan:
        existing = db.query(ImplantPlan).filter(ImplantPlan.case_id == case_id).first()
        if existing:
            return existing

        plan = ImplantPlan(
            case_id=case_id,
            selected_system="Persona Knee System",
            manufacturer="Zimmer Biomet",
            femoral_component_size="Size 6 (Standard)",
            femoral_resection_mm=9.0,
            femoral_flexion_deg=3.0,
            tibial_tray_size="Size 5",
            tibial_resection_mm=8.5,
            tibial_slope_deg=3.0,
            insert_type="CR (Cruciate Retaining)",
            insert_thickness_mm=10.0,
            alignment_strategy="Mechanical Alignment (MA)",
            predicted_postop_hka=179.8,
            status="Drafted"
        )
        db.add(plan)
        db.flush()

        # Add ranked implant sizing alternatives
        options_data = [
            {"rank": 1, "brand": "Persona Knee", "manufacturer": "Zimmer Biomet", "femoral_size": "Size 6", "tibial_size": "Size 5", "insert_thickness": "10mm CR", "bone_coverage_pct": 94.8, "overhang_mm": 0.2, "match_score_pct": 96.4},
            {"rank": 2, "brand": "Attune Knee", "manufacturer": "DePuy Synthes", "femoral_size": "Size 7", "tibial_size": "Size 5", "insert_thickness": "10mm FB", "bone_coverage_pct": 93.1, "overhang_mm": 0.4, "match_score_pct": 94.2},
            {"rank": 3, "brand": "Triathlon Knee", "manufacturer": "Stryker", "femoral_size": "Size 6", "tibial_size": "Size 6", "insert_thickness": "11mm CS", "bone_coverage_pct": 92.5, "overhang_mm": 0.6, "match_score_pct": 91.8},
        ]
        for opt in options_data:
            db.add(ImplantOption(implant_plan_id=plan.id, **opt))

        db.commit()
        db.refresh(plan)
        return plan


implant_service = ImplantService()
