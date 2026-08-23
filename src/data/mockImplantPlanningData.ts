export interface ImplantOption {
  id: string;
  rank: number;
  sizeName: string;
  systemName: string;
  matchScore: number;
  femoralFit: 'Excellent' | 'Good' | 'Review';
  tibialFit: 'Excellent' | 'Good' | 'Review';
  coverageStatus: 'Excellent' | 'Good' | 'Review';
  alignmentStatus: 'Excellent' | 'Good' | 'Review';
  coveragePct: number;
  femoralML: number;
  femoralAP: number;
  tibialML: number;
  tibialAP: number;
  polyThickness: string;
  overhangMm: number; // positive = overhang, negative = underhang
  resectionDepth: number; // mm
  valgusAngle: number; // deg
  surgeonNotes: string;
  suggestedTag: string;
}

export const MOCK_IMPLANT_PATIENT = {
  id: 'KS-0241',
  name: 'Eleanor Vance',
  age: 62,
  gender: 'Female',
  studyId: 'KNEE-MRI-0241',
  implantSystem: 'Zimmer Biomet Persona® Personalized Knee System',
  affectedSide: 'Right Knee',
  surgeryType: 'Total Knee Arthroplasty (TKA)',
  femoralMeasurements: {
    ml: 73.2,
    ap: 65.1,
    aspectRatio: 1.12,
    distalResectionMm: 9.0,
    valgusAngleDeg: 5.5,
  },
  tibialMeasurements: {
    ml: 71.3,
    ap: 48.9,
    aspectRatio: 1.46,
    proximalResectionMm: 8.5,
    posteriorSlopeDeg: 3.0,
  },
};

export const MOCK_IMPLANT_OPTIONS: ImplantOption[] = [
  {
    id: 'opt-size-5',
    rank: 1,
    sizeName: 'Implant Size 5',
    systemName: 'Persona PS Standard ML (CR/PS Tray)',
    matchScore: 96,
    femoralFit: 'Excellent',
    tibialFit: 'Excellent',
    coverageStatus: 'Excellent',
    alignmentStatus: 'Excellent',
    coveragePct: 94.8,
    femoralML: 72.8,
    femoralAP: 64.8,
    tibialML: 71.0,
    tibialAP: 48.6,
    polyThickness: '10 mm High Flex CR/PS',
    overhangMm: 0.3,
    resectionDepth: 9.0,
    valgusAngle: 5.5,
    suggestedTag: 'Suggested match · Top Ranked Recommendation',
    surgeonNotes: 'Anatomically optimal ML coverage with negligible overhang (+0.3mm). Bone preservation profile is superior.',
  },
  {
    id: 'opt-size-4',
    rank: 2,
    sizeName: 'Implant Size 4',
    systemName: 'Persona PS Narrow ML (Conservative Tray)',
    matchScore: 91,
    femoralFit: 'Good',
    tibialFit: 'Good',
    coverageStatus: 'Good',
    alignmentStatus: 'Good',
    coveragePct: 88.6,
    femoralML: 70.4,
    femoralAP: 62.5,
    tibialML: 68.2,
    tibialAP: 46.5,
    polyThickness: '11 mm High Flex CR/PS',
    overhangMm: -2.1,
    resectionDepth: 9.5,
    valgusAngle: 5.0,
    suggestedTag: 'Ranked recommendation · Downsized Option',
    surgeonNotes: 'Eliminates all lateral soft-tissue impingement, but leaves 11.4% peripheral cancellous bone unshielded.',
  },
  {
    id: 'opt-size-6',
    rank: 3,
    sizeName: 'Implant Size 6',
    systemName: 'Persona PS Plus ML (Extended Baseplate)',
    matchScore: 84,
    femoralFit: 'Review',
    tibialFit: 'Review',
    coverageStatus: 'Review',
    alignmentStatus: 'Review',
    coveragePct: 97.6,
    femoralML: 75.6,
    femoralAP: 67.2,
    tibialML: 74.0,
    tibialAP: 51.0,
    polyThickness: '10 mm High Flex CR/PS',
    overhangMm: 2.6,
    resectionDepth: 8.0,
    valgusAngle: 6.0,
    suggestedTag: 'Ranked recommendation · Sizing Overhang Flag',
    surgeonNotes: 'Full bone coverage achieved, however +2.6mm anterior-lateral overhang requires intra-operative retinacular release.',
  },
];
