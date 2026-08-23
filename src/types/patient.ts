import { KellgrenLawrenceAssessment, MeniscusAssessment, AnatomicalMeasurements, ImplantRecommendation, MedicalScanMetadata } from './medical';

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number (Demo)
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  dob: string;
  affectedKnee: 'Left' | 'Right' | 'Bilateral';
  primarySymptom: string;
  vasPainScore: number; // 0-10
  womacScore?: number; // Western Ontario and McMaster Universities Osteoarthritis Index
  kssScore?: number; // Knee Society Score
  bmi: number;
  lastVisitDate: string;
  attendingPhysician: string;
  status: 'Pre-Op Planning' | 'Under Review' | 'Conservative Management' | 'Post-Op Followup';
  
  // Associated Medical AI Assessments
  klAssessment: KellgrenLawrenceAssessment;
  meniscusAssessment: MeniscusAssessment;
  measurements: AnatomicalMeasurements;
  implantPlan?: ImplantRecommendation;
  scans: MedicalScanMetadata[];
}

export type RiskLevel = 'Low' | 'Moderate' | 'Elevated' | 'High';
