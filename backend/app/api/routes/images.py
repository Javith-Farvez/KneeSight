from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.database.connection import get_db
from backend.app.models.imaging_study import ImagingStudy
from backend.app.models.case import Case
from backend.app.schemas.imaging_study import ImagingStudyResponse, MultiImageUploadResponse
from backend.app.services.storage_service import storage_service
from backend.app.services.analysis_service import MockAnalysisService

router = APIRouter(prefix="/images", tags=["Images"])


@router.post("/upload", response_model=MultiImageUploadResponse)
async def upload_images(
    files: List[UploadFile] = File(...),
    case_id: Optional[str] = Form(None),
    modality: Optional[str] = Form("Radiograph"),
    view_position: Optional[str] = Form("AP Weight-Bearing"),
    db: Session = Depends(get_db)
):
    """
    Multi-image upload endpoint supporting PNG, JPG, JPEG, and DICOM images.
    Uploads to Supabase Storage (cases/{case_id}/images/{filename}) and stores metadata in PostgreSQL.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No image files provided.")

    if len(files) > 4:
        raise HTTPException(status_code=400, detail="Maximum 4 images can be uploaded and analyzed at once.")

    # Resolve or create case
    case_obj = None
    if case_id:
        case_obj = db.query(Case).filter((Case.id == case_id) | (Case.case_number == case_id)).first()
    if not case_obj:
        case_obj = MockAnalysisService.ensure_demo_case(db, "KS-0241")

    saved_images = []

    for file in files:
        content_bytes = await file.read()
        filename = file.filename or f"knee_scan_{len(saved_images)+1}.png"

        # Upload via Storage Service (Supabase Storage / local fallback)
        storage_meta = await storage_service.upload_knee_image(
            case_id=case_obj.id,
            filename=filename,
            content_bytes=content_bytes,
            content_type=file.content_type or "image/png"
        )

        # Persist imaging study metadata in database
        study = ImagingStudy(
            case_id=case_obj.id,
            file_name=filename,
            storage_path=storage_meta["storage_path"],
            file_url=storage_meta.get("file_url"),
            modality=modality or "Radiograph",
            view_position=view_position or "AP Weight-Bearing",
            file_size_bytes=len(content_bytes),
            analysis_status="uploaded"
        )
        db.add(study)
        db.flush()
        saved_images.append(study)

    db.commit()
    for s in saved_images:
        db.refresh(s)

    return MultiImageUploadResponse(
        message=f"Successfully uploaded and cataloged {len(saved_images)} knee scan(s).",
        uploaded_count=len(saved_images),
        case_id=case_obj.id,
        images=saved_images
    )
