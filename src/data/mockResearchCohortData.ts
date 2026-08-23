export interface ResearchSubject {
  id: string;
  age: number;
  sex: 'Male' | 'Female';
  oaStatus: 'OA' | 'Non-OA';
  klGrade: number; // 0 to 4
  imagingType: 'Weight-Bearing Radiograph' | '3.0T MRI' | 'Volumetric CT';
  studyGroup: 'Cohort A (Longitudinal)' | 'Cohort B (Pre-Op TKA)' | 'Cohort C (Healthy Controls)';
  meniscusThickness: number; // mm
  femoralML: number; // mm
  femoralAP: number; // mm
  tibialML: number; // mm
  tibialAP: number; // mm
  recommendedImplantSize: 'Size 3' | 'Size 4' | 'Size 5' | 'Size 6' | 'Size 7';
  implantMatchScore: number; // %
}

// Generate realistic 248-subject research cohort
export const RESEARCH_COHORT: ResearchSubject[] = Array.from({ length: 248 }, (_, i) => {
  const num = i + 1;
  const id = `KS-${String(num).padStart(4, '0')}`;
  
  // Seeded distribution
  const isOA = i < 132;
  const sex: 'Male' | 'Female' = i % 2 === 0 ? 'Female' : 'Male';
  const age = isOA
    ? Math.floor(48 + (Math.sin(i * 1.7) + 1) * 18) // 48 - 84
    : Math.floor(20 + (Math.cos(i * 1.3) + 1) * 22); // 20 - 64

  const klGrade = isOA
    ? (i % 4) + 1 // 1, 2, 3, 4
    : 0;

  const imagingType: 'Weight-Bearing Radiograph' | '3.0T MRI' | 'Volumetric CT' =
    i % 3 === 0 ? '3.0T MRI' : i % 3 === 1 ? 'Weight-Bearing Radiograph' : 'Volumetric CT';

  const studyGroup: 'Cohort A (Longitudinal)' | 'Cohort B (Pre-Op TKA)' | 'Cohort C (Healthy Controls)' =
    isOA && klGrade >= 3
      ? 'Cohort B (Pre-Op TKA)'
      : isOA
      ? 'Cohort A (Longitudinal)'
      : 'Cohort C (Healthy Controls)';

  // Meniscus thickness: OA is lower (2.1 - 4.5mm), Non-OA is higher (4.6 - 6.2mm)
  const meniscusThickness = isOA
    ? Number((3.1 + Math.sin(i * 0.8) * 1.1 - (klGrade * 0.25)).toFixed(2))
    : Number((5.3 + Math.cos(i * 0.9) * 0.7).toFixed(2));

  // Bone morphometrics based on sex
  const sexOffset = sex === 'Male' ? 4.5 : 0;
  const femoralML = Number((70.5 + sexOffset + Math.sin(i * 0.5) * 3.2).toFixed(1));
  const femoralAP = Number((62.0 + sexOffset * 0.8 + Math.cos(i * 0.6) * 2.8).toFixed(1));
  const tibialML = Number((68.5 + sexOffset + Math.sin(i * 0.4) * 3.0).toFixed(1));
  const tibialAP = Number((46.5 + sexOffset * 0.7 + Math.cos(i * 0.7) * 2.2).toFixed(1));

  // Implant sizes 3-7
  const implantIndex = Math.min(Math.max(Math.floor((femoralML - 65) / 3.5), 0), 4);
  const sizeMap: ('Size 3' | 'Size 4' | 'Size 5' | 'Size 6' | 'Size 7')[] = [
    'Size 3',
    'Size 4',
    'Size 5',
    'Size 6',
    'Size 7',
  ];
  const recommendedImplantSize = sizeMap[implantIndex];
  const implantMatchScore = Number((86 + (Math.sin(i * 2.1) + 1) * 6).toFixed(1));

  return {
    id,
    age,
    sex,
    oaStatus: isOA ? 'OA' : 'Non-OA',
    klGrade,
    imagingType,
    studyGroup,
    meniscusThickness: Math.max(1.85, Math.min(6.45, meniscusThickness)),
    femoralML,
    femoralAP,
    tibialML,
    tibialAP,
    recommendedImplantSize,
    implantMatchScore,
  };
});
