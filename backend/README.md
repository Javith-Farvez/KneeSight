# KneeSight AI — Backend API & Database

FastAPI-powered clinical decision support backend for **KneeSight AI**, integrating PostgreSQL / Supabase, Supabase Storage, and simulated AI clinical analysis services.

---

## Features

- **FastAPI Framework**: High-performance RESTful API with automated Swagger docs at `/docs`.
- **Database & Persistence**: PostgreSQL (Supabase) integration with SQLAlchemy ORM and automatic local fallback.
- **Image Storage**: Supabase Storage (`cases/{case_id}/images/{filename}`) with local disk static fallback.
- **Realistic Mock AI Service**: Simulates full knee segmentation, Dice quality metrics (Femur 97%, Tibia 96%, Meniscus 89%), and calibrated measurements (Femoral width 73.1mm, Tibial width 71.7mm, Meniscus thickness 4.82mm).
- **Resilient Frontend Connection**: Frontend operates seamlessly with backend and falls back automatically if the server is offline.

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System and DB connectivity health check |
| `GET` | `/api/cases` | List all clinical patient cases |
| `POST` | `/api/cases` | Create a new patient case |
| `GET` | `/api/cases/{case_id}` | Retrieve case details by ID / Case Number |
| `POST` | `/api/images/upload` | Upload multi-image knee study (PNG, JPG, DICOM) |
| `POST` | `/api/analysis/start` | Start AI anatomical segmentation & measurements |
| `GET` | `/api/analysis/{analysis_id}` | Retrieve AI analysis scores and steps |
| `GET` | `/api/measurements/{analysis_id}`| Get calibrated caliper measurement values |
| `POST` | `/api/implant-planning` | Draft / customize surgical implant plan |
| `GET` | `/api/implant-planning/{case_id}` | Retrieve implant options and sizing |
| `GET` | `/api/reports/{case_id}` | Get clinical decision report summary |

---

## Quickstart

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(If no `DATABASE_URL` is set, the backend automatically uses a local zero-config SQLite database).*

### 3. Run Development Server
```bash
python -m uvicorn backend.app.main:app --reload --port 8000
```
- API is available at: [http://localhost:8000](http://localhost:8000)
- Interactive Swagger Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)
