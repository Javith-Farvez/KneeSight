import { Patient } from '../types';
import { MOCK_SCANS } from './mockScans';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PT-10492',
    mrn: 'MRN-894-0129',
    firstName: 'Eleanor',
    lastName: 'Vance',
    age: 64,
    gender: 'Female',
    dob: '1962-04-18',
    affectedKnee: 'Right',
    primarySymptom: 'Medial joint line pain with morning stiffness and mechanical catching',
    vasPainScore: 7.5,
    womacScore: 54,
    kssScore: 48,
    bmi: 27.8,
    lastVisitDate: '2026-02-14',
    attendingPhysician: 'Dr. Michael Sterling, MD (Orthopedic Surgery)',
    status: 'Pre-Op Planning',
    
    klAssessment: {
      grade: 3,
      stage: 'Moderate',
      confidence: 94.2,
      osteophytePresence: 'Definite',
      jointSpaceNarrowing: 'Definite',
      sclerosis: 'Moderate',
      deformity: true
    },
    meniscusAssessment: {
      side: 'medial',
      tearDetected: true,
      confidence: 91.8,
      tearType: 'complex',
      location: 'posterior_horn',
      grade: 'Grade III',
      extrusionMm: 3.4,
      rootIntegrity: 'Compromised',
      clinicalNotes: 'Complex tear extending across posterior horn and body with 3.4mm medial extrusion outside tibial margin.'
    },
    measurements: {
      tibiofemoralAngleDeg: 2.1, // Marked varus alignment
      mechanicalAxisDeviationMm: -7.8, // Medial shift (Varus)
      medialJointSpaceWidthMm: 1.8, // Severely narrowed
      lateralJointSpaceWidthMm: 5.6,
      patellarTiltAngleDeg: 12.4,
      posteriorTibialSlopeDeg: 8.5,
      insallSalvatiRatio: 0.98
    },
    implantPlan: {
      id: 'IMP-9021',
      patientId: 'PT-10492',
      recommendedSystem: 'Apex-Flex Precision Knee System',
      implantType: 'PS (Posterior Stabilized)',
      femoralComponentSize: 'Size 4 (Narrow Left-Asymmetric)',
      tibialComponentSize: 'Size 3 (Standard Baseplate)',
      polyethyleneInsertThicknessMm: 11,
      plannedVarusValgusCorrectionDeg: 4.5,
      plannedResectionDepthDistalFemurMm: 8.5,
      plannedResectionDepthProximalTibiaMm: 7.0,
      matchConfidence: 96.4,
      status: 'Clinical_Review_Required'
    },
    scans: [MOCK_SCANS[0], MOCK_SCANS[1]]
  },
  {
    id: 'PT-20914',
    mrn: 'MRN-419-5832',
    firstName: 'Marcus',
    lastName: 'Brody',
    age: 58,
    gender: 'Male',
    dob: '1968-09-03',
    affectedKnee: 'Left',
    primarySymptom: 'Weight-bearing lateral discomfort and post-activity swelling',
    vasPainScore: 4.8,
    womacScore: 32,
    kssScore: 68,
    bmi: 25.1,
    lastVisitDate: '2026-02-18',
    attendingPhysician: 'Dr. Sarah Jenkins, MD',
    status: 'Conservative Management',
    
    klAssessment: {
      grade: 2,
      stage: 'Minimal',
      confidence: 88.5,
      osteophytePresence: 'Possible',
      jointSpaceNarrowing: 'Possible',
      sclerosis: 'Mild',
      deformity: false
    },
    meniscusAssessment: {
      side: 'medial',
      tearDetected: false,
      confidence: 95.1,
      tearType: 'intact',
      location: 'body',
      grade: 'Grade I',
      extrusionMm: 0.8,
      rootIntegrity: 'Intact',
      clinicalNotes: 'Intrasubstance degeneration without frank articular surface disruption.'
    },
    measurements: {
      tibiofemoralAngleDeg: 5.8,
      mechanicalAxisDeviationMm: 0.5,
      medialJointSpaceWidthMm: 4.2,
      lateralJointSpaceWidthMm: 5.1,
      patellarTiltAngleDeg: 9.6,
      posteriorTibialSlopeDeg: 7.8,
      insallSalvatiRatio: 1.05
    },
    scans: [MOCK_SCANS[2]]
  },
  {
    id: 'PT-39108',
    mrn: 'MRN-723-9041',
    firstName: 'Sophia',
    lastName: 'Chen',
    age: 71,
    gender: 'Female',
    dob: '1955-11-29',
    affectedKnee: 'Right',
    primarySymptom: 'Severe chronic stiffness, bone-on-bone sensation, valgus deformity',
    vasPainScore: 8.9,
    womacScore: 78,
    kssScore: 35,
    bmi: 31.4,
    lastVisitDate: '2026-02-20',
    attendingPhysician: 'Dr. Michael Sterling, MD',
    status: 'Pre-Op Planning',
    
    klAssessment: {
      grade: 4,
      stage: 'Severe',
      confidence: 97.6,
      osteophytePresence: 'Multiple Large',
      jointSpaceNarrowing: 'Severe',
      sclerosis: 'Severe',
      deformity: true
    },
    meniscusAssessment: {
      side: 'medial',
      tearDetected: true,
      confidence: 93.4,
      tearType: 'complex',
      location: 'body',
      grade: 'Grade III',
      extrusionMm: 4.8,
      rootIntegrity: 'Complete Avulsion',
      clinicalNotes: 'Extensive maceration and posterior root avulsion with complete loss of meniscus shock absorption.'
    },
    measurements: {
      tibiofemoralAngleDeg: 11.2, // Severe valgus
      mechanicalAxisDeviationMm: 14.5,
      medialJointSpaceWidthMm: 0.4, // Near complete obliteration
      lateralJointSpaceWidthMm: 2.1,
      patellarTiltAngleDeg: 16.8,
      posteriorTibialSlopeDeg: 10.2,
      insallSalvatiRatio: 0.82
    },
    implantPlan: {
      id: 'IMP-9045',
      patientId: 'PT-39108',
      recommendedSystem: 'Kinematic Ultra-Fit Knee Matrix',
      implantType: 'PS (Posterior Stabilized)',
      femoralComponentSize: 'Size 5 (Standard Right)',
      tibialComponentSize: 'Size 4 (Asymmetric Tibial Tray)',
      polyethyleneInsertThicknessMm: 14,
      plannedVarusValgusCorrectionDeg: 6.2,
      plannedResectionDepthDistalFemurMm: 9.0,
      plannedResectionDepthProximalTibiaMm: 8.0,
      matchConfidence: 94.8,
      status: 'Clinical_Review_Required'
    },
    scans: [MOCK_SCANS[3]]
  },
  {
    id: 'PT-48201',
    mrn: 'MRN-331-7789',
    firstName: 'David',
    lastName: 'Kowalski',
    age: 49,
    gender: 'Male',
    dob: '1977-07-12',
    affectedKnee: 'Left',
    primarySymptom: 'Acute pivoting knee instability after skiing deceleration injury',
    vasPainScore: 6.2,
    womacScore: 41,
    kssScore: 60,
    bmi: 24.3,
    lastVisitDate: '2026-02-21',
    attendingPhysician: 'Dr. Raymond Zhao, MD',
    status: 'Under Review',
    
    klAssessment: {
      grade: 1,
      stage: 'Doubtful',
      confidence: 91.0,
      osteophytePresence: 'Possible',
      jointSpaceNarrowing: 'None',
      sclerosis: 'None',
      deformity: false
    },
    meniscusAssessment: {
      side: 'medial',
      tearDetected: true,
      confidence: 96.2,
      tearType: 'longitudinal',
      location: 'posterior_horn',
      grade: 'Grade III',
      extrusionMm: 1.2,
      rootIntegrity: 'Intact',
      clinicalNotes: 'Longitudinal vertical tear in the vascular red-red zone amenable to arthroscopic surgical repair.'
    },
    measurements: {
      tibiofemoralAngleDeg: 6.1,
      mechanicalAxisDeviationMm: -0.8,
      medialJointSpaceWidthMm: 4.8,
      lateralJointSpaceWidthMm: 5.9,
      patellarTiltAngleDeg: 8.2,
      posteriorTibialSlopeDeg: 9.1,
      insallSalvatiRatio: 1.12
    },
    scans: [MOCK_SCANS[4]]
  }
];
