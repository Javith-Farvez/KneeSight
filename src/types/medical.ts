export type KellgrenLawrenceGradeLevel = 0 | 1 | 2 | 3 | 4;

export interface KellgrenLawrenceAssessment {
  grade: KellgrenLawrenceGradeLevel;
  stage: 'None' | 'Doubtful' | 'Minimal' | 'Moderate' | 'Severe';
  confidence: number; // 0 to 100
  osteophytePresence: 'None' | 'Possible' | 'Definite' | 'Multiple Large';
  jointSpaceNarrowing: 'None' | 'Possible' | 'Definite' | 'Severe';
  sclerosis: 'None' | 'Mild' | 'Moderate' | 'Severe';
  deformity: boolean;
}

export type MeniscusLocation = 'anterior_horn' | 'body' | 'posterior_horn';
export type MeniscusTearType = 'radial' | 'horizontal' | 'complex' | 'longitudinal' | 'root_tear' | 'intact';

export interface MeniscusAssessment {
  side: 'medial' | 'lateral';
  tearDetected: boolean;
  confidence: number;
  tearType: MeniscusTearType;
  location: MeniscusLocation;
  grade: 'Grade 0' | 'Grade I' | 'Grade II' | 'Grade III';
  extrusionMm: number;
  rootIntegrity: 'Intact' | 'Compromised' | 'Complete Avulsion';
  clinicalNotes: string;
}

export interface AnatomicalMeasurements {
  tibiofemoralAngleDeg: number; // Normal valgus: ~5-7 deg
  mechanicalAxisDeviationMm: number; // Normal: ~-2 to +2 mm
  medialJointSpaceWidthMm: number; // Normal: ~4.0-5.5 mm
  lateralJointSpaceWidthMm: number; // Normal: ~5.0-7.0 mm
  patellarTiltAngleDeg: number;
  posteriorTibialSlopeDeg: number;
  insallSalvatiRatio: number; // Normal: 0.8 - 1.2
}

export interface ImplantRecommendation {
  id: string;
  patientId: string;
  recommendedSystem: string;
  implantType: 'CR (Cruciate Retaining)' | 'PS (Posterior Stabilized)' | 'Medial Pivot' | 'Unicompartmental (UKA)';
  femoralComponentSize: string;
  tibialComponentSize: string;
  polyethyleneInsertThicknessMm: number;
  plannedVarusValgusCorrectionDeg: number;
  plannedResectionDepthDistalFemurMm: number;
  plannedResectionDepthProximalTibiaMm: number;
  matchConfidence: number;
  status: 'Draft' | 'Clinical_Review_Required' | 'Surgeon_Approved' | 'Exported_To_OR';
}

export interface MedicalScanMetadata {
  id: string;
  patientId: string;
  modality: 'X-Ray (Weight-Bearing)' | 'MRI (3T Knee Protocol)' | 'CT (Anatomical Alignment)';
  view: 'AP Standing' | 'Lateral' | 'Skyline / Merchant' | 'Full-Leg Alignment' | 'Sagittal T2 MRI' | 'Coronal Proton Density';
  laterality: 'Left' | 'Right' | 'Bilateral';
  acquisitionDate: string;
  resolution: string;
  sliceCount?: number;
  dicomUid: string;
  aiProcessingStatus: 'Completed' | 'Processing' | 'Pending_Review' | 'Flagged';
  radiologistSignoff?: string;
}
