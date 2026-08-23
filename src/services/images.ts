import { fetchApi } from './api';

export interface UploadedImageMeta {
  id: string;
  case_id: string;
  file_name: string;
  storage_path: string;
  file_url?: string;
  modality: string;
  view_position: string;
  file_size_bytes?: number;
  analysis_status: string;
  uploaded_at: string;
}

export interface UploadResponse {
  message: string;
  uploaded_count: number;
  case_id: string;
  images: UploadedImageMeta[];
}

export const imagesService = {
  async uploadImages(files: File[], caseId: string = 'KS-0241'): Promise<{ result: UploadResponse | null; isFallback: boolean }> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('case_id', caseId);

    const { data, error } = await fetchApi<UploadResponse>('/api/images/upload', {
      method: 'POST',
      body: formData,
    });

    if (error || !data) {
      // Local fallback representation
      const fallbackImages: UploadedImageMeta[] = files.map((file, i) => ({
        id: `local-img-${Date.now()}-${i}`,
        case_id: caseId,
        file_name: file.name,
        storage_path: `cases/${caseId}/images/${file.name}`,
        file_url: URL.createObjectURL(file),
        modality: 'Radiograph',
        view_position: 'AP Weight-Bearing',
        file_size_bytes: file.size,
        analysis_status: 'uploaded',
        uploaded_at: new Date().toISOString(),
      }));

      return {
        result: {
          message: `Locally processed ${files.length} images.`,
          uploaded_count: files.length,
          case_id: caseId,
          images: fallbackImages,
        },
        isFallback: true,
      };
    }

    return { result: data, isFallback: false };
  },
};
