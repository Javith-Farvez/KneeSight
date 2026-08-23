import { fetchApi } from './api';
import { DEMO_PATIENT_CASE, UploadedKneeImage, INITIAL_DEMO_IMAGES } from '@/data/mockMultiImageData';

export interface CaseData {
  id: string;
  case_number: string;
  status: string;
  clinical_indication?: string;
  patient?: {
    id: string;
    mrn: string;
    name: string;
    age: number;
    sex: string;
    contact_phone?: string;
    contact_email?: string;
  };
  created_at?: string;
}

export const casesService = {
  async getCases(): Promise<{ cases: CaseData[]; isFallback: boolean }> {
    const { data, error } = await fetchApi<CaseData[]>('/api/cases');
    if (error || !data) {
      // Offline fallback
      return {
        cases: [
          {
            id: 'demo-ks-0241',
            case_number: DEMO_PATIENT_CASE.caseId,
            status: 'Review Required',
            clinical_indication: 'Bilateral knee stiffness, medial compartment joint space narrowing, KL Grade 2 osteoarthritis',
            patient: {
              id: 'pat-demo-1',
              mrn: 'MRN-88204',
              name: DEMO_PATIENT_CASE.patientName,
              age: DEMO_PATIENT_CASE.age,
              sex: DEMO_PATIENT_CASE.sex,
            },
          },
        ],
        isFallback: true,
      };
    }
    return { cases: data, isFallback: false };
  },

  async getCaseById(caseId: string): Promise<{ caseData: CaseData; isFallback: boolean }> {
    const { data, error } = await fetchApi<CaseData>(`/api/cases/${caseId}`);
    if (error || !data) {
      return {
        caseData: {
          id: caseId,
          case_number: DEMO_PATIENT_CASE.caseId,
          status: 'Review Required',
          clinical_indication: 'Bilateral knee stiffness, medial compartment joint space narrowing, KL Grade 2 osteoarthritis',
          patient: {
            id: 'pat-demo-1',
            mrn: 'MRN-88204',
            name: DEMO_PATIENT_CASE.patientName,
            age: DEMO_PATIENT_CASE.age,
            sex: DEMO_PATIENT_CASE.sex,
          },
        },
        isFallback: true,
      };
    }
    return { caseData: data, isFallback: false };
  },

  async createCase(payload: Partial<CaseData>): Promise<{ caseData: CaseData | null; error: Error | null }> {
    const { data, error } = await fetchApi<CaseData>('/api/cases', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { caseData: data, error };
  },
};
