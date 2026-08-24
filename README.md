# 🦿 KneeSight AI

### AI-Assisted Knee Imaging Analysis & Patient-Specific Implant Planning

> **Transforming knee medical imaging into measurable anatomical insight.**

KneeSight AI is a modern clinical decision-support prototype designed to demonstrate how artificial intelligence can assist clinicians in analyzing knee medical images, extracting anatomical measurements, assessing medial meniscus/OA-related patterns, and supporting patient-specific implant planning.

The platform combines a premium medical-imaging interface with an interactive AI analysis workflow, structured measurements, research analytics, and implant-planning visualization.

---

## ✨ Highlights

* 🩻 **Multi-image knee imaging upload**
* 🤖 **AI-assisted anatomical analysis workflow**
* 🦴 **Femur and tibia detection**
* 🧠 **Medial meniscus analysis**
* 📏 **Automated anatomical measurements**
* 📊 **OA / non-OA comparative analytics**
* 🦿 **Patient-specific implant planning**
* 🔎 **Interactive medical-image viewer**
* 📈 **Research and statistical visualization**
* 📋 **Clinical case management**
* 🌓 **Light / dark mode**
* 📱 **Responsive medical workstation UI**
* 🎞️ **Smooth, professional micro-interactions**
* 🗃️ **Backend + database architecture**
* 🔐 **Environment-based configuration**

---

# 🎯 Problem

Knee imaging assessment and implant planning can involve multiple measurements, anatomical structures, image interpretation, and clinical comparisons.

KneeSight AI explores a workflow where medical imaging can be transformed into structured information that is easier to review:

```text
Medical Imaging
      ↓
AI-Assisted Analysis
      ↓
Anatomical Segmentation
      ↓
Measurement Extraction
      ↓
Meniscus / OA Analysis
      ↓
Clinical Review
      ↓
Implant Planning
      ↓
Report
```

The goal is not to replace clinicians.

The goal is to provide an interactive **decision-support workflow** that helps organize quantitative information for clinical review.

---

# 🧠 Core Workflow

## 1. Upload Imaging

Users can select up to four knee images.

```text
Choose Images
      ↓
Preview
      ↓
Select / Deselect
      ↓
Upload
```

Each image can be reviewed before analysis.

---

## 2. AI-Assisted Processing

The prototype demonstrates an AI processing pipeline:

```text
Image Validation
       ↓
Preprocessing
       ↓
Femur Detection
       ↓
Tibia Detection
       ↓
Meniscus Detection
       ↓
Measurement Extraction
       ↓
Analysis Complete
```

The interface provides visual processing states so users can understand what the system is doing.

---

## 3. Anatomical Analysis

The imaging workspace displays:

* Femur
* Tibia
* Medial meniscus
* Segmentation overlays
* Measurement markers
* Anatomical dimensions
* Analysis quality indicators

Example demo measurements:

```text
Femoral Width       73.1 mm
Tibial Width        71.7 mm
Meniscus Thickness   4.82 mm
```

---

# 🦿 Implant Planning

KneeSight AI provides a demonstration of patient-specific implant planning based on extracted anatomical measurements.

The interface can display ranked implant-fit suggestions such as:

| Rank | Implant | Match |
| ---- | ------- | ----: |
| 1    | Size 5  |   96% |
| 2    | Size 4  |   91% |
| 3    | Size 6  |   84% |

The system presents these as **suggested/ranked matches**, not definitive clinical decisions.

---

# 📊 Research Analytics

The analytics workspace demonstrates how structured measurements can be explored across a dataset.

Supported visualizations include:

* Meniscus thickness distribution
* OA vs non-OA comparison
* Age vs meniscus thickness
* Male vs female comparison
* Femoral measurement distribution
* Tibial measurement distribution
* Implant-size distribution

Filters can include:

* Age range
* Sex
* OA status
* Imaging type
* Study group

---

# 🖥️ Product Experience

KneeSight AI is designed as a premium clinical workstation rather than a generic SaaS dashboard.

### Design principles

```text
Clinical credibility
        +
AI sophistication
        +
Information clarity
        +
Minimal visual noise
```

### Design system

| Property         | Value            |
| ---------------- | ---------------- |
| Primary          | `#0B132B`        |
| Medical Accent   | `#2EC4B6`        |
| CTA Accent       | `#FF6B5E`        |
| Light Background | `#F7F9FC`        |
| Dark Background  | `#090F20`        |
| Display Font     | DM Serif Display |
| UI Font          | Inter            |
| Numeric Font     | IBM Plex Mono    |
| Grid             | 8-point          |
| Card Radius      | 16px             |
| Button Radius    | 12px             |

The interface uses subtle motion rather than excessive animation to maintain a professional clinical feel.

---

# 🏗️ Architecture

```text
┌─────────────────────────────────────┐
│           KneeSight AI UI           │
│       React + Vite + TypeScript     │
└──────────────────┬──────────────────┘
                   │
                   │ REST API
                   ▼
┌─────────────────────────────────────┐
│            FastAPI Backend           │
│                                     │
│ Cases                               │
│ Imaging                             │
│ Analysis                            │
│ Measurements                        │
│ Implant Planning                    │
│ Reports                             │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          Database Layer              │
│                                     │
│ Patients                            │
│ Cases                               │
│ Imaging Studies                     │
│ Analysis Results                    │
│ Measurements                        │
│ Implant Plans                       │
│ Reports                             │
└─────────────────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Recharts
* Lucide React

## Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy

## Database

* SQLite for the current local prototype
* PostgreSQL/Supabase can be introduced for a production-oriented deployment

## Storage

Medical-image files are designed to be handled separately from structured database records.

---

# 📁 Project Structure

```text
KneeSight/
│
├── backend/
│   └── app/
│       ├── api/
│       ├── models/
│       ├── schemas/
│       ├── services/
│       └── database/
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── medical/
│   │   └── charts/
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Imaging/
│   │   ├── Meniscus/
│   │   ├── ImplantPlanning/
│   │   ├── Patients/
│   │   ├── Analytics/
│   │   ├── Reports/
│   │   └── Settings/
│   │
│   ├── services/
│   ├── hooks/
│   ├── data/
│   ├── types/
│   └── utils/
│
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Python 3.10+
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/Kawin13/KneeSight.git
cd KneeSight
```

---

# 2. Install Frontend Dependencies

```bash
npm install
```

---

# 3. Start the Frontend

```bash
npm run dev
```

The Vite development server will provide the local application URL.

---

# 4. Start the Backend

Open another terminal:

```bash
cd backend
```

Create and activate a Python virtual environment:

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start FastAPI:

```powershell
python -m uvicorn app.main:app --reload --port 8000
```

Backend API:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/api/health
```

---

# 🧪 Demo Workflow

For the current prototype:

```text
1. Open KneeSight AI
       ↓
2. Go to New Analysis
       ↓
3. Select 1–4 knee images
       ↓
4. Preview selected images
       ↓
5. Click Analyze
       ↓
6. AI processing animation
       ↓
7. Segmentation visualization
       ↓
8. View measurements
       ↓
9. Review meniscus/OA analysis
       ↓
10. Continue to Implant Planning
       ↓
11. Compare implant suggestions
       ↓
12. Generate/View Report
```

---

# 🗃️ Data Model

The application is designed around the following conceptual relationships:

```text
User
 │
 └── Patient
       │
       └── Case
             │
             ├── Imaging Studies
             │
             ├── Analysis Results
             │      │
             │      ├── Measurements
             │      └── Meniscus Analysis
             │
             ├── Implant Plan
             │      └── Implant Options
             │
             └── Report
```

---

# 🤖 AI Integration

The current prototype uses a **mock/demo analysis pipeline** to demonstrate the complete user experience.

The architecture is intentionally separated so that a real machine-learning model can later replace the demonstration analysis service.

Future model integration could include:

```text
Medical Image
      ↓
Preprocessing
      ↓
Segmentation Model
      ↓
Anatomical Structures
      ↓
Measurement Engine
      ↓
Clinical Analysis
      ↓
Implant Matching
```

The frontend is designed so the AI service can evolve independently from the user interface.

---

# 🔬 Future Development

Potential future work includes:

* Real medical-image segmentation models
* DICOM support
* Automated anatomical landmark detection
* Advanced meniscus/OA analysis
* Larger research datasets
* Model confidence calibration
* Real implant databases
* Advanced 3D anatomical visualization
* Secure cloud storage
* Role-based access control
* Audit logging
* Clinical validation
* Production-grade PostgreSQL infrastructure
* Secure deployment

---

# 🔐 Security & Privacy

KneeSight AI is currently a prototype.

**Do not upload real patient information to this demonstration environment.**

For a production healthcare system, additional requirements would be necessary, including appropriate:

* Authentication
* Authorization
* Encryption
* Audit logging
* Data retention policies
* Secure image storage
* Privacy controls
* Regulatory/compliance processes
* Clinical validation

The repository should use fictional/demo data only.

---

# ⚠️ Medical Disclaimer

KneeSight AI is an **AI-assisted clinical decision-support prototype**.

It is not intended to:

* diagnose disease independently
* replace a qualified healthcare professional
* provide definitive medical advice
* determine the final implant choice without clinical review

Any AI-generated measurements, classifications, or implant suggestions shown in the prototype are demonstrations and should be independently reviewed by a qualified clinician.

---

# 🎓 Project Purpose

KneeSight AI demonstrates how medical imaging, artificial intelligence, anatomical measurement, data visualization, and patient-specific planning can be combined into a single clinical workflow.

The project focuses on making complex imaging information:

**Visible → Quantifiable → Comparable → Reviewable**

rather than presenting AI as a replacement for clinical expertise.

---

# 👥 Team

**KneeSight AI**

Developed as a healthcare technology / AI project prototype.

Repository:

https://github.com/Javith-Farvez/KneeSight
---

# 📄 License

This project is currently intended for educational, research, and demonstration purposes.

Add an appropriate open-source license before distributing the project publicly as production software.

---

<p align="center">

### 🦿 KneeSight AI

**AI-Assisted Knee Imaging • Measurement • Analysis • Implant Planning**

Built to explore the future of intelligent clinical decision support.

</p>
