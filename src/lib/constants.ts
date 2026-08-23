export const APP_NAME = 'KneeSight AI';
export const APP_VERSION = '1.0.0-PROTOTYPE';
export const CLINICAL_DISCLAIMER_SHORT = 'AI-Assisted Decision Support Prototype — For Clinical Research & Evaluation Only';
export const CLINICAL_DISCLAIMER_FULL = 
  'KneeSight AI is an investigational software prototype designed to assist credentialed healthcare professionals with knee radiographic analysis, anatomical landmark identification, and pre-operative templating suggestions. It is NOT an FDA-cleared or CE-marked medical device and must NEVER replace independent clinical judgment or formal diagnostic radiologic interpretation.';

export const KL_GRADE_DEFINITIONS = {
  0: { title: 'Grade 0 (None)', desc: 'Definite absence of x-ray changes of osteoarthritis' },
  1: { title: 'Grade 1 (Doubtful)', desc: 'Doubtful joint space narrowing and possible osteophytic lipping' },
  2: { title: 'Grade 2 (Minimal)', desc: 'Definite osteophytes and possible joint space narrowing' },
  3: { title: 'Grade 3 (Moderate)', desc: 'Moderate multiple osteophytes, definite narrowing of joint space, some sclerosis, possible bone contour deformity' },
  4: { title: 'Grade 4 (Severe)', desc: 'Large osteophytes, marked joint space narrowing, severe sclerosis, definite bone contour deformity' }
} as const;

export const NORMAL_ANATOMICAL_RANGES = {
  tibiofemoralAngle: { min: 5.0, max: 7.0, unit: '°', label: 'Tibiofemoral Angle (Valgus)' },
  mechanicalAxisDeviation: { min: -2.0, max: 2.0, unit: 'mm', label: 'Mechanical Axis Deviation' },
  medialJointSpaceWidth: { min: 4.0, max: 5.5, unit: 'mm', label: 'Medial Joint Space' },
  lateralJointSpaceWidth: { min: 5.0, max: 7.0, unit: 'mm', label: 'Lateral Joint Space' },
  insallSalvatiRatio: { min: 0.8, max: 1.2, unit: 'ratio', label: 'Insall-Salvati Ratio' },
  patellarTiltAngle: { min: 8.0, max: 15.0, unit: '°', label: 'Patellar Tilt Angle' },
  posteriorTibialSlope: { min: 7.0, max: 10.0, unit: '°', label: 'Posterior Tibial Slope' },
} as const;
