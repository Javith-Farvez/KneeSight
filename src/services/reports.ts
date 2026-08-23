import { fetchApi } from './api';

export interface ReportData {
  id?: string;
  case_id: string;
  report_title: string;
  report_type: string;
  summary?: string;
  clinician_signoff?: boolean;
  signoff_by?: string;
  signoff_at?: string;
  pdf_url?: string;
}

export const reportsService = {
  async getReportByCase(caseId: string = 'KS-0241'): Promise<{ report: ReportData; isFallback: boolean }> {
    const { data, error } = await fetchApi<ReportData>(`/api/reports/${caseId}`);
    if (error || !data) {
      return {
        report: {
          case_id: caseId,
          report_title: 'AI-Assisted Knee Clinical Decision Report',
          report_type: 'Comprehensive Knee Analysis',
          summary: 'Patient Robert Vance (62M) exhibits moderate medial joint space narrowing (3.42mm) and mild OA (KL Grade 2). Femoral width calibrated at 73.1mm, tibial width at 71.7mm.',
          clinician_signoff: false,
        },
        isFallback: true,
      };
    }
    return { report: data, isFallback: false };
  },

  async saveReport(payload: Partial<ReportData>): Promise<{ report: ReportData | null; error: Error | null }> {
    const { data, error } = await fetchApi<ReportData>('/api/reports', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { report: data, error };
  },
};
