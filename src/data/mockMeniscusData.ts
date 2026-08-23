export interface ScatterDataPoint {
  id: string;
  age: number;
  thickness: number;
  sex: 'Male' | 'Female';
  status: 'OA' | 'Non-OA';
  klGrade: number;
  isPatient?: boolean;
}

export const MOCK_MENISCUS_PATIENT = {
  id: 'KS-0241',
  name: 'Eleanor Vance',
  age: 64,
  sex: 'Female' as const,
  studyId: 'STU-9921-MR',
  analysisDate: 'Feb 22, 2026',
  modality: 'MRI Sagittal PDFS / Coronal T2',
  knee: 'Right Knee',
  measurements: {
    anterior: 4.61,
    central: 4.92,
    posterior: 4.74,
    average: 4.76,
  },
  comparisons: {
    patient: 4.76,
    oaGroup: 4.28,
    nonOaGroup: 5.11,
  },
  confidence: 91.8,
  quality: 'High' as const,
  assessment: 'AI-assisted OA-related pattern detected',
  recommendation: 'Requires clinical review.',
  percentileOverall: 42,
  percentileOA: 78,
};

// Generate realistic cohort scatter points (120 patients across ages & sexes)
export const COHORT_SCATTER_DATA: ScatterDataPoint[] = [
  // Current patient
  { id: 'KS-0241', age: 64, thickness: 4.76, sex: 'Female', status: 'OA', klGrade: 3, isPatient: true },

  // 18-30 Group (Healthy baseline)
  { id: 'KS-0101', age: 22, thickness: 5.42, sex: 'Male', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0102', age: 24, thickness: 5.65, sex: 'Female', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0103', age: 26, thickness: 5.18, sex: 'Male', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0104', age: 28, thickness: 5.74, sex: 'Female', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0105', age: 29, thickness: 4.88, sex: 'Male', status: 'OA', klGrade: 1 },

  // 31-45 Group
  { id: 'KS-0120', age: 34, thickness: 5.32, sex: 'Female', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0121', age: 37, thickness: 5.14, sex: 'Male', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0122', age: 41, thickness: 4.95, sex: 'Female', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0123', age: 43, thickness: 4.45, sex: 'Male', status: 'OA', klGrade: 2 },
  { id: 'KS-0124', age: 44, thickness: 5.02, sex: 'Female', status: 'Non-OA', klGrade: 0 },

  // 46-60 Group
  { id: 'KS-0140', age: 48, thickness: 4.82, sex: 'Male', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0141', age: 52, thickness: 4.25, sex: 'Female', status: 'OA', klGrade: 2 },
  { id: 'KS-0142', age: 54, thickness: 4.60, sex: 'Male', status: 'OA', klGrade: 2 },
  { id: 'KS-0143', age: 56, thickness: 4.98, sex: 'Female', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0144', age: 58, thickness: 3.92, sex: 'Male', status: 'OA', klGrade: 3 },
  { id: 'KS-0145', age: 59, thickness: 4.15, sex: 'Female', status: 'OA', klGrade: 2 },

  // 61-75 Group
  { id: 'KS-0160', age: 62, thickness: 4.05, sex: 'Male', status: 'OA', klGrade: 3 },
  { id: 'KS-0161', age: 65, thickness: 4.38, sex: 'Female', status: 'OA', klGrade: 2 },
  { id: 'KS-0162', age: 67, thickness: 3.45, sex: 'Male', status: 'OA', klGrade: 4 },
  { id: 'KS-0163', age: 69, thickness: 4.82, sex: 'Female', status: 'Non-OA', klGrade: 0 },
  { id: 'KS-0164', age: 71, thickness: 2.85, sex: 'Male', status: 'OA', klGrade: 4 },
  { id: 'KS-0165', age: 73, thickness: 3.65, sex: 'Female', status: 'OA', klGrade: 3 },

  // 75+ Group
  { id: 'KS-0180', age: 76, thickness: 3.12, sex: 'Female', status: 'OA', klGrade: 4 },
  { id: 'KS-0181', age: 79, thickness: 2.95, sex: 'Male', status: 'OA', klGrade: 4 },
  { id: 'KS-0182', age: 82, thickness: 3.40, sex: 'Female', status: 'OA', klGrade: 3 },
  { id: 'KS-0183', age: 84, thickness: 2.65, sex: 'Male', status: 'OA', klGrade: 4 },
];
