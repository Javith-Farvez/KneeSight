export const IMPLANT_SYSTEM_CATALOG = [
  {
    manufacturer: 'Apex Medical Systems',
    name: 'Apex-Flex Precision Knee System',
    typesAvailable: ['CR (Cruciate Retaining)', 'PS (Posterior Stabilized)'],
    sizesFemoral: ['Size 1', 'Size 2', 'Size 3', 'Size 4', 'Size 5', 'Size 6'],
    sizesTibial: ['Size 1', 'Size 2', 'Size 3', 'Size 4', 'Size 5'],
    insertThicknesses: [9, 10, 11, 12, 14, 17],
    material: 'Highly Cross-linked Polyethylene with Vitamin E'
  },
  {
    manufacturer: 'BioKinetic Ortho',
    name: 'Kinematic Ultra-Fit Knee Matrix',
    typesAvailable: ['Medial Pivot', 'PS (Posterior Stabilized)'],
    sizesFemoral: ['Size A', 'Size B', 'Size C', 'Size D', 'Size E'],
    sizesTibial: ['Size 1', 'Size 2', 'Size 3', 'Size 4'],
    insertThicknesses: [10, 12, 14, 16],
    material: 'Oxinium Oxidized Zirconium'
  },
  {
    manufacturer: 'UniKnee Solutions',
    name: 'Preserve Medial Compartment System',
    typesAvailable: ['Unicompartmental (UKA)'],
    sizesFemoral: ['Size 1', 'Size 2', 'Size 3'],
    sizesTibial: ['Size 1', 'Size 2', 'Size 3'],
    insertThicknesses: [8, 9, 10],
    material: 'Cobalt Chrome Alloy'
  }
];

export const CLINICAL_CHECKLIST_ITEMS = [
  { id: 'chk_1', text: 'Confirm patient identity, MRN, and affected side laterality (Left/Right)', category: 'Pre-Op Safety' },
  { id: 'chk_2', text: 'Validate full-length weight-bearing mechanical axis calibration', category: 'Radiology' },
  { id: 'chk_3', text: 'Correlate Kellgren-Lawrence Grade with functional physical exam & ROM', category: 'Clinical Evaluation' },
  { id: 'chk_4', text: 'Review medial meniscus posterior horn root integrity on sagittal T2 MRI', category: 'Soft Tissue' },
  { id: 'chk_5', text: 'Inspect anterior and posterior resection depths against bone density', category: 'Surgical Plan' },
];
