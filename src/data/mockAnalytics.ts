export const MOCK_ANALYTICS = {
  totalScansAnalyzed: 1420,
  averageConfidence: 94.6,
  turnaroundTimeSec: 2.8,
  klGradeDistribution: [
    { grade: 'Grade 0', count: 210, percentage: 14.8, fill: '#10b981' },
    { grade: 'Grade 1', count: 325, percentage: 22.9, fill: '#14b8a6' },
    { grade: 'Grade 2', count: 440, percentage: 31.0, fill: '#f59e0b' },
    { grade: 'Grade 3', count: 285, percentage: 20.1, fill: '#f97316' },
    { grade: 'Grade 4', count: 160, percentage: 11.2, fill: '#ef4444' },
  ],
  monthlyVolume: [
    { month: 'Sep', scans: 95, surgeriesPlanned: 18 },
    { month: 'Oct', scans: 142, surgeriesPlanned: 29 },
    { month: 'Nov', scans: 188, surgeriesPlanned: 37 },
    { month: 'Dec', scans: 220, surgeriesPlanned: 44 },
    { month: 'Jan', scans: 340, surgeriesPlanned: 68 },
    { month: 'Feb', scans: 435, surgeriesPlanned: 89 },
  ],
  meniscusTearPrevalence: [
    { type: 'Complex Tear', count: 184, share: '36%' },
    { type: 'Horizontal Cleavage', count: 122, share: '24%' },
    { type: 'Radial Tear', count: 98, share: '19%' },
    { type: 'Root Tear / Extrusion', count: 64, share: '13%' },
    { type: 'Longitudinal Tear', count: 42, share: '8%' },
  ],
  alignmentDistribution: [
    { category: 'Varus (>3°)', count: 580, percentage: 41 },
    { category: 'Neutral (5°-7°)', count: 640, percentage: 45 },
    { category: 'Valgus (>8°)', count: 200, percentage: 14 },
  ]
};
