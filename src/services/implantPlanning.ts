import { fetchApi } from './api';

export interface ImplantPlanData {
  id?: string;
  case_id: string;
  selected_system: string;
  manufacturer: string;
  femoral_component_size: string;
  femoral_resection_mm: number;
  femoral_flexion_deg: number;
  tibial_tray_size: string;
  tibial_resection_mm: number;
  tibial_slope_deg: number;
  insert_type: string;
  insert_thickness_mm: number;
  alignment_strategy: string;
  predicted_postop_hka: number;
  status: string;
}

export const implantPlanningService = {
  async getImplantPlan(caseId: string = 'KS-0241'): Promise<{ plan: ImplantPlanData; isFallback: boolean }> {
    const { data, error } = await fetchApi<ImplantPlanData>(`/api/implant-planning/${caseId}`);
    if (error || !data) {
      return {
        plan: {
          case_id: caseId,
          selected_system: 'Persona Knee System',
          manufacturer: 'Zimmer Biomet',
          femoral_component_size: 'Size 6 (Standard)',
          femoral_resection_mm: 9.0,
          femoral_flexion_deg: 3.0,
          tibial_tray_size: 'Size 5',
          tibial_resection_mm: 8.5,
          tibial_slope_deg: 3.0,
          insert_type: 'CR (Cruciate Retaining)',
          insert_thickness_mm: 10.0,
          alignment_strategy: 'Mechanical Alignment (MA)',
          predicted_postop_hka: 179.8,
          status: 'Drafted',
        },
        isFallback: true,
      };
    }
    return { plan: data, isFallback: false };
  },

  async saveImplantPlan(payload: Partial<ImplantPlanData>): Promise<{ plan: ImplantPlanData | null; error: Error | null }> {
    const { data, error } = await fetchApi<ImplantPlanData>('/api/implant-planning', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { plan: data, error };
  },
};
