import { fetchApi } from './api';

export interface MeasurementData {
  id?: string;
  analysis_id?: string;
  femoral_width_mm: number;
  tibial_width_mm: number;
  meniscus_thickness_mm: number;
  medial_jsw_mm: number;
  lateral_jsw_mm: number;
  femorotibial_angle_deg: number;
  pixel_spacing: string;
  calibration_status: string;
}

export interface ProcessingStepData {
  step_number: number;
  title: string;
  duration_ms: number;
  status: string;
  finding?: string;
}

export interface AnalysisResultData {
  id: string;
  case_id: string;
  protocol: string;
  status: string;
  femur_dice_score: number;
  tibia_dice_score: number;
  meniscus_dice_score: number;
  femur_quality_pct: number;
  tibia_quality_pct: number;
  meniscus_quality_pct: number;
  model_version: string;
  is_demo_analysis: string;
  disclaimer: string;
  summary_notes?: string;
  measurements?: MeasurementData[];
  processing_steps?: ProcessingStepData[];
}

export const analysisService = {
  async startAnalysis(
    caseId: string = 'KS-0241',
    protocol: string = 'Full Knee Analysis'
  ): Promise<{ result: AnalysisResultData; isFallback: boolean }> {
    const { data, error } = await fetchApi<AnalysisResultData>('/api/analysis/start', {
      method: 'POST',
      body: JSON.stringify({ case_id: caseId, protocol }),
    });

    if (error || !data) {
      // Offline fallback
      return {
        result: {
          id: `analysis-demo-${Date.now()}`,
          case_id: caseId,
          protocol,
          status: 'completed',
          femur_dice_score: 0.97,
          tibia_dice_score: 0.96,
          meniscus_dice_score: 0.89,
          femur_quality_pct: 97,
          tibia_quality_pct: 96,
          meniscus_quality_pct: 89,
          model_version: 'v2.4-clinical-demo',
          is_demo_analysis: 'AI-Assisted Demo Analysis',
          disclaimer: 'Demo results — for clinical review.',
          summary_notes: 'Preserved femoral bicondylar geometry (73.1mm). Mild medial tibial plateau flattening (71.7mm). Medial meniscus thickness measured at 4.82mm with focal thinning.',
          measurements: [
            {
              femoral_width_mm: 73.1,
              tibial_width_mm: 71.7,
              meniscus_thickness_mm: 4.82,
              medial_jsw_mm: 3.42,
              lateral_jsw_mm: 4.85,
              femorotibial_angle_deg: 176.8,
              pixel_spacing: '0.143 mm/px',
              calibration_status: 'calibrated',
            },
          ],
        },
        isFallback: true,
      };
    }

    return { result: data, isFallback: false };
  },

  async getAnalysisResult(analysisId: string): Promise<{ result: AnalysisResultData; isFallback: boolean }> {
    const { data, error } = await fetchApi<AnalysisResultData>(`/api/analysis/${analysisId}`);
    if (error || !data) {
      return {
        result: {
          id: analysisId,
          case_id: 'KS-0241',
          protocol: 'Full Knee Analysis',
          status: 'completed',
          femur_dice_score: 0.97,
          tibia_dice_score: 0.96,
          meniscus_dice_score: 0.89,
          femur_quality_pct: 97,
          tibia_quality_pct: 96,
          meniscus_quality_pct: 89,
          model_version: 'v2.4-clinical-demo',
          is_demo_analysis: 'AI-Assisted Demo Analysis',
          disclaimer: 'Demo results — for clinical review.',
        },
        isFallback: true,
      };
    }
    return { result: data, isFallback: false };
  },

  async getMeasurements(analysisId: string): Promise<{ measurements: MeasurementData; isFallback: boolean }> {
    const { data, error } = await fetchApi<MeasurementData>(`/api/measurements/${analysisId}`);
    if (error || !data) {
      return {
        measurements: {
          femoral_width_mm: 73.1,
          tibial_width_mm: 71.7,
          meniscus_thickness_mm: 4.82,
          medial_jsw_mm: 3.42,
          lateral_jsw_mm: 4.85,
          femorotibial_angle_deg: 176.8,
          pixel_spacing: '0.143 mm/px',
          calibration_status: 'calibrated',
        },
        isFallback: true,
      };
    }
    return { measurements: data, isFallback: false };
  },
};
