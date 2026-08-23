export interface RecentAnalysisItem {
  id: string; // e.g. KS-0241
  patientName: string;
  age: number;
  sex: 'Male' | 'Female';
  oaStatus: 'Severe OA (KL-4)' | 'Moderate OA (KL-3)' | 'Mild OA (KL-2)' | 'Doubtful (KL-1)' | 'Non-OA (KL-0)';
  oaGrade: number;
  meniscusThickness: number; // in mm
  meniscusStatus: 'Intact' | 'Minor Degeneration' | 'Partial Tear' | 'Complex Tear';
  analysisStatus: 'Completed' | 'Review Required' | 'Processing' | 'Flagged';
  lastUpdated: string;
  knee: 'Right' | 'Left';
  confidence: number;
}

export const MOCK_RECENT_ANALYSES: RecentAnalysisItem[] = [
  {
    id: 'KS-0241',
    patientName: 'Eleanor Vance',
    age: 64,
    sex: 'Female',
    oaStatus: 'Moderate OA (KL-3)',
    oaGrade: 3,
    meniscusThickness: 3.42,
    meniscusStatus: 'Complex Tear',
    analysisStatus: 'Review Required',
    lastUpdated: '10 mins ago',
    knee: 'Right',
    confidence: 94.2,
  },
  {
    id: 'KS-0242',
    patientName: 'Marcus Sterling',
    age: 58,
    sex: 'Male',
    oaStatus: 'Mild OA (KL-2)',
    oaGrade: 2,
    meniscusThickness: 4.65,
    meniscusStatus: 'Minor Degeneration',
    analysisStatus: 'Completed',
    lastUpdated: '25 mins ago',
    knee: 'Left',
    confidence: 96.8,
  },
  {
    id: 'KS-0243',
    patientName: 'Arthur Pendelton',
    age: 71,
    sex: 'Male',
    oaStatus: 'Severe OA (KL-4)',
    oaGrade: 4,
    meniscusThickness: 2.18,
    meniscusStatus: 'Complex Tear',
    analysisStatus: 'Flagged',
    lastUpdated: '1 hour ago',
    knee: 'Right',
    confidence: 98.1,
  },
  {
    id: 'KS-0244',
    patientName: 'Clara Martinez',
    age: 49,
    sex: 'Female',
    oaStatus: 'Non-OA (KL-0)',
    oaGrade: 0,
    meniscusThickness: 5.84,
    meniscusStatus: 'Intact',
    analysisStatus: 'Completed',
    lastUpdated: '2 hours ago',
    knee: 'Left',
    confidence: 99.0,
  },
  {
    id: 'KS-0245',
    patientName: 'Devon Hughes',
    age: 62,
    sex: 'Male',
    oaStatus: 'Moderate OA (KL-3)',
    oaGrade: 3,
    meniscusThickness: 3.85,
    meniscusStatus: 'Partial Tear',
    analysisStatus: 'Completed',
    lastUpdated: '3 hours ago',
    knee: 'Right',
    confidence: 92.5,
  },
  {
    id: 'KS-0246',
    patientName: 'Hannah Abbott',
    age: 53,
    sex: 'Female',
    oaStatus: 'Doubtful (KL-1)',
    oaGrade: 1,
    meniscusThickness: 5.12,
    meniscusStatus: 'Intact',
    analysisStatus: 'Completed',
    lastUpdated: '4 hours ago',
    knee: 'Right',
    confidence: 95.4,
  },
  {
    id: 'KS-0247',
    patientName: 'Samuel Thorne',
    age: 67,
    sex: 'Male',
    oaStatus: 'Severe OA (KL-4)',
    oaGrade: 4,
    meniscusThickness: 2.45,
    meniscusStatus: 'Complex Tear',
    analysisStatus: 'Review Required',
    lastUpdated: '5 hours ago',
    knee: 'Left',
    confidence: 97.2,
  },
  {
    id: 'KS-0248',
    patientName: 'Rachel Kim',
    age: 44,
    sex: 'Female',
    oaStatus: 'Non-OA (KL-0)',
    oaGrade: 0,
    meniscusThickness: 5.92,
    meniscusStatus: 'Intact',
    analysisStatus: 'Completed',
    lastUpdated: '6 hours ago',
    knee: 'Right',
    confidence: 99.4,
  },
];

export interface ThicknessBin {
  binRange: string; // e.g. "2.0-2.5 mm"
  thickness: number;
  countAll: number;
  countOA: number;
  countNonOA: number;
  countMale: number;
  countFemale: number;
}

export const MENISCUS_DISTRIBUTION_DATA: ThicknessBin[] = [
  { binRange: '1.5–2.0 mm', thickness: 1.75, countAll: 8, countOA: 8, countNonOA: 0, countMale: 5, countFemale: 3 },
  { binRange: '2.1–2.5 mm', thickness: 2.3, countAll: 18, countOA: 17, countNonOA: 1, countMale: 10, countFemale: 8 },
  { binRange: '2.6–3.0 mm', thickness: 2.8, countAll: 29, countOA: 26, countNonOA: 3, countMale: 16, countFemale: 13 },
  { binRange: '3.1–3.5 mm', thickness: 3.3, countAll: 38, countOA: 31, countNonOA: 7, countMale: 20, countFemale: 18 },
  { binRange: '3.6–4.0 mm', thickness: 3.8, countAll: 45, countOA: 28, countNonOA: 17, countMale: 24, countFemale: 21 },
  { binRange: '4.1–4.5 mm', thickness: 4.3, countAll: 52, countOA: 14, countNonOA: 38, countMale: 28, countFemale: 24 },
  { binRange: '4.6–5.0 mm', thickness: 4.8, countAll: 64, countOA: 6, countNonOA: 58, countMale: 33, countFemale: 31 },
  { binRange: '5.1–5.5 mm', thickness: 5.3, countAll: 48, countOA: 2, countNonOA: 46, countMale: 25, countFemale: 23 },
  { binRange: '5.6–6.0 mm', thickness: 5.8, countAll: 34, countOA: 0, countNonOA: 34, countMale: 18, countFemale: 16 },
  { binRange: '6.1–6.5 mm', thickness: 6.3, countAll: 12, countOA: 0, countNonOA: 12, countMale: 7, countFemale: 5 },
];

export interface OAComparisonMetric {
  metric: string;
  unit: string;
  oaGroup: number;
  nonOaGroup: number;
  difference: string;
  clinicalSignificance: string;
}

export const OA_COMPARISON_METRICS: OAComparisonMetric[] = [
  {
    metric: 'Medial Joint Space Width (JSW)',
    unit: 'mm',
    oaGroup: 2.14,
    nonOaGroup: 4.88,
    difference: '-56.1%',
    clinicalSignificance: 'Severe space collapse in KL-3/4',
  },
  {
    metric: 'Mean Meniscus Thickness',
    unit: 'mm',
    oaGroup: 3.12,
    nonOaGroup: 5.48,
    difference: '-43.1%',
    clinicalSignificance: 'Extensive fibrocartilage thinning',
  },
  {
    metric: 'Meniscus Extrusion Rate',
    unit: '%',
    oaGroup: 68.4,
    nonOaGroup: 4.2,
    difference: '+64.2%',
    clinicalSignificance: 'Subluxation beyond tibial margin',
  },
  {
    metric: 'Subchondral Sclerosis Index',
    unit: 'HU / score',
    oaGroup: 84.6,
    nonOaGroup: 12.3,
    difference: '+72.3%',
    clinicalSignificance: 'Dense eburnation of subchondral plate',
  },
  {
    metric: 'Full-Thickness Cartilage Defect',
    unit: '%',
    oaGroup: 74.2,
    nonOaGroup: 2.1,
    difference: '+72.1%',
    clinicalSignificance: 'High risk of bone-on-bone friction',
  },
];

export interface ImplantPlanningCase {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  knee: 'Right' | 'Left';
  femoralAP: number; // mm
  femoralML: number; // mm
  femoralCutAngle: number; // deg
  tibialWidth: number; // mm
  tibialSlope: number; // deg
  tibialResection: number; // mm
  recommendedImplant: string;
  system: string;
  matchPercentage: number;
  reviewStatus: 'Approved' | 'Pending Review' | 'Flagged for Adjustment';
}

export const MOCK_IMPLANT_CASES: ImplantPlanningCase[] = [
  {
    id: 'PLAN-8921',
    patientId: 'KS-0241',
    patientName: 'Eleanor Vance',
    age: 64,
    knee: 'Right',
    femoralAP: 64.2,
    femoralML: 71.8,
    femoralCutAngle: 5.5,
    tibialWidth: 74.0,
    tibialSlope: 3.0,
    tibialResection: 9.0,
    recommendedImplant: 'Persona PS Size 5 (Standard ML)',
    system: 'Zimmer Biomet Persona',
    matchPercentage: 98.4,
    reviewStatus: 'Pending Review',
  },
  {
    id: 'PLAN-8922',
    patientId: 'KS-0243',
    patientName: 'Arthur Pendelton',
    age: 71,
    knee: 'Right',
    femoralAP: 68.5,
    femoralML: 76.2,
    femoralCutAngle: 6.0,
    tibialWidth: 78.5,
    tibialSlope: 3.5,
    tibialResection: 10.0,
    recommendedImplant: 'Triathlon CR Size 6 (Wide)',
    system: 'Stryker Triathlon',
    matchPercentage: 96.2,
    reviewStatus: 'Approved',
  },
  {
    id: 'PLAN-8923',
    patientId: 'KS-0245',
    patientName: 'Devon Hughes',
    age: 62,
    knee: 'Right',
    femoralAP: 62.0,
    femoralML: 69.4,
    femoralCutAngle: 5.0,
    tibialWidth: 72.0,
    tibialSlope: 2.5,
    tibialResection: 8.5,
    recommendedImplant: 'Attune CR Size 4 (Narrow)',
    system: 'DePuy Synthes Attune',
    matchPercentage: 94.8,
    reviewStatus: 'Approved',
  },
  {
    id: 'PLAN-8924',
    patientId: 'KS-0247',
    patientName: 'Samuel Thorne',
    age: 67,
    knee: 'Left',
    femoralAP: 66.8,
    femoralML: 74.0,
    femoralCutAngle: 6.5,
    tibialWidth: 76.2,
    tibialSlope: 4.0,
    tibialResection: 11.0,
    recommendedImplant: 'Persona PS Size 6 (Standard)',
    system: 'Zimmer Biomet Persona',
    matchPercentage: 89.2,
    reviewStatus: 'Flagged for Adjustment',
  },
];

export interface AISystemNode {
  name: string;
  category: string;
  status: 'Operational' | 'Processing' | 'Attention';
  latency: string;
  throughput: string;
  version: string;
  detail: string;
}

export const AI_SYSTEM_NODES: AISystemNode[] = [
  {
    name: 'Image Processing',
    category: 'DICOM Ingestion & Normalization',
    status: 'Operational',
    latency: '38 ms',
    throughput: '142 scans/hr',
    version: 'v3.1.2-cuda12',
    detail: 'Spatial calibration, isotropic voxel resampling, dynamic window leveling',
  },
  {
    name: 'Segmentation Engine',
    category: 'Multi-Tissue nnU-Net V2',
    status: 'Operational',
    latency: '1.24 s',
    throughput: '85 volumes/hr',
    version: 'v2.4.0-weights-2026',
    detail: 'Femur, tibia, patella, medial/lateral meniscus horns & cartilage masks',
  },
  {
    name: 'Measurement Engine',
    category: 'Morphometrics & KL Grading',
    status: 'Processing',
    latency: '185 ms',
    throughput: '2 MRIs queued',
    version: 'v4.0.1-precision',
    detail: 'Automated 3D joint space width, meniscus height, extrusion index',
  },
  {
    name: 'Implant Matching',
    category: 'Surgical Resection Templating',
    status: 'Operational',
    latency: '240 ms',
    throughput: '24 sizing matrices',
    version: 'v1.8.6-fda-db',
    detail: 'Multi-manufacturer geometry fitting (Zimmer, Stryker, DePuy, Smith+Nephew)',
  },
];
