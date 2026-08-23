export interface UploadedKneeImage {
  id: string;
  imageNumber: number;
  filename: string;
  modality: 'Radiograph' | 'MRI' | 'CT';
  subType: string;
  viewName: string;
  filesize: string;
  previewUrl: string;
  selected: boolean;
  measurements: {
    femoralWidth: number;
    tibialWidth: number;
    meniscusThickness: number;
    medialJSW: number;
    lateralJSW: number;
  };
  qualityScores: {
    femur: number;
    tibia: number;
    meniscus: number;
    overall: number;
  };
  structures: {
    femur: boolean;
    tibia: boolean;
    medialMeniscus: boolean;
    lateralMeniscus: boolean;
    patella: boolean;
  };
  seriesNumber: string;
  pixelSpacing: string;
  acquisitionDate: string;
}

export interface DemoPatientCase {
  caseId: string;
  patientName: string;
  age: number;
  sex: 'Male' | 'Female';
  totalImages: number;
}

export const DEMO_PATIENT_CASE: DemoPatientCase = {
  caseId: 'KS-0241',
  patientName: 'Eleanor Vance',
  age: 62,
  sex: 'Male',
  totalImages: 4,
};

export const INITIAL_DEMO_IMAGES: UploadedKneeImage[] = [
  {
    id: 'img-01',
    imageNumber: 1,
    filename: 'Knee_AP_WeightBearing_01.dcm',
    modality: 'Radiograph',
    subType: 'Digital X-Ray',
    viewName: 'AP Standing Weight-Bearing',
    filesize: '2.4 MB',
    previewUrl: '/src/assets/hero-knee.jpg',
    selected: true,
    measurements: {
      femoralWidth: 73.1,
      tibialWidth: 71.7,
      meniscusThickness: 4.82,
      medialJSW: 3.42,
      lateralJSW: 5.18,
    },
    qualityScores: {
      femur: 97,
      tibia: 96,
      meniscus: 89,
      overall: 95,
    },
    structures: {
      femur: true,
      tibia: true,
      medialMeniscus: true,
      lateralMeniscus: true,
      patella: true,
    },
    seriesNumber: 'SER-001/04',
    pixelSpacing: '0.14 mm/px',
    acquisitionDate: '2026-08-18 09:24 EST',
  },
  {
    id: 'img-02',
    imageNumber: 2,
    filename: 'Knee_Sagittal_PDFS_02.dcm',
    modality: 'MRI',
    subType: 'T2 Proton-Density FS',
    viewName: 'Sagittal Medial Compartment',
    filesize: '4.8 MB',
    previewUrl: '/src/assets/hero-knee.jpg',
    selected: true,
    measurements: {
      femoralWidth: 74.2,
      tibialWidth: 70.8,
      meniscusThickness: 4.76,
      medialJSW: 3.38,
      lateralJSW: 5.25,
    },
    qualityScores: {
      femur: 98,
      tibia: 95,
      meniscus: 94,
      overall: 96,
    },
    structures: {
      femur: true,
      tibia: true,
      medialMeniscus: true,
      lateralMeniscus: false,
      patella: true,
    },
    seriesNumber: 'SER-002/04',
    pixelSpacing: '0.12 mm/px',
    acquisitionDate: '2026-08-18 09:32 EST',
  },
  {
    id: 'img-03',
    imageNumber: 3,
    filename: 'Knee_Coronal_T2_03.dcm',
    modality: 'MRI',
    subType: 'Coronal T2 High-Res',
    viewName: 'Coronal Articular Slice 14',
    filesize: '4.1 MB',
    previewUrl: '/src/assets/hero-knee.jpg',
    selected: true,
    measurements: {
      femoralWidth: 72.8,
      tibialWidth: 71.3,
      meniscusThickness: 4.90,
      medialJSW: 3.45,
      lateralJSW: 5.12,
    },
    qualityScores: {
      femur: 96,
      tibia: 97,
      meniscus: 92,
      overall: 95,
    },
    structures: {
      femur: true,
      tibia: true,
      medialMeniscus: true,
      lateralMeniscus: true,
      patella: false,
    },
    seriesNumber: 'SER-003/04',
    pixelSpacing: '0.13 mm/px',
    acquisitionDate: '2026-08-18 09:38 EST',
  },
  {
    id: 'img-04',
    imageNumber: 4,
    filename: 'Knee_Axial_Plateau_04.dcm',
    modality: 'CT',
    subType: 'Bone Algorithm Slice',
    viewName: 'Axial Plateau Resection Plane',
    filesize: '3.6 MB',
    previewUrl: '/src/assets/hero-knee.jpg',
    selected: true,
    measurements: {
      femoralWidth: 73.5,
      tibialWidth: 71.0,
      meniscusThickness: 4.79,
      medialJSW: 3.40,
      lateralJSW: 5.20,
    },
    qualityScores: {
      femur: 95,
      tibia: 94,
      meniscus: 90,
      overall: 93,
    },
    structures: {
      femur: true,
      tibia: true,
      medialMeniscus: true,
      lateralMeniscus: true,
      patella: true,
    },
    seriesNumber: 'SER-004/04',
    pixelSpacing: '0.15 mm/px',
    acquisitionDate: '2026-08-18 09:45 EST',
  },
];
