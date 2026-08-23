import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  UploadCloud,
  FileImage,
  Layers,
  ScanLine,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NewAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewAnalysisModal({ isOpen, onClose }: NewAnalysisModalProps) {
  const navigate = useNavigate();
  const [modality, setModality] = useState<'xray' | 'mri'>('xray');
  const [patientId, setPatientId] = useState('KS-0249');
  const [patientName, setPatientName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsUploading(false);
    setIsDone(true);
  };

  const handleLaunchAnalysis = () => {
    onClose();
    setIsDone(false);
    if (modality === 'xray') {
      navigate('/imaging');
    } else {
      navigate('/meniscus');
    }
  };

  const handleReset = () => {
    setIsDone(false);
    setIsUploading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Upload Imaging for AI Clinical Analysis"
      size="md"
    >
      {isDone ? (
        <div className="space-y-4 text-center py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-ds-body text-ds-1">DICOM Ingestion & Normalization Complete</h4>
            <p className="text-ds-small text-ds-3 mt-1">
              Case <strong className="text-ds-1">{patientId}</strong> calibrated with 0.14mm/pixel resolution. Ready for automated segmentation and grading.
            </p>
          </div>
          <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between text-left text-ds-caption">
            <div>
              <span className="text-ds-4 block">Modality</span>
              <span className="font-medium text-ds-1 uppercase">{modality === 'xray' ? 'Radiograph (AP/Lat X-Ray)' : 'MRI Sagittal/Coronal'}</span>
            </div>
            <div>
              <span className="text-ds-4 block">AI Status</span>
              <Badge variant="teal" size="sm">Pre-processed</Badge>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={handleReset}>
              Close
            </Button>
            <Button
              variant="accent"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleLaunchAnalysis}
            >
              Open in {modality === 'xray' ? 'Image Analysis' : 'Meniscus Workspace'}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Modality Selector */}
          <div>
            <label className="text-ds-label font-medium text-ds-2 block mb-2">
              Select Imaging Modality
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModality('xray')}
                className={`flex items-center gap-3 p-3 rounded-card border text-left transition-all ${
                  modality === 'xray'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-900 dark:text-teal-200 shadow-sm'
                    : 'border-ds bg-ds-surface-2 text-ds-3 hover:border-teal-500/40'
                }`}
              >
                <div className={`p-2 rounded-input ${modality === 'xray' ? 'bg-teal-500 text-white' : 'bg-ds-surface text-ds-3 border border-ds'}`}>
                  <ScanLine className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-ds-small font-semibold text-ds-1">Knee Radiograph</p>
                  <p className="text-[11px] text-ds-4">AP Weight-Bearing / Lateral X-Ray</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('mri')}
                className={`flex items-center gap-3 p-3 rounded-card border text-left transition-all ${
                  modality === 'mri'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-900 dark:text-teal-200 shadow-sm'
                    : 'border-ds bg-ds-surface-2 text-ds-3 hover:border-teal-500/40'
                }`}
              >
                <div className={`p-2 rounded-input ${modality === 'mri' ? 'bg-teal-500 text-white' : 'bg-ds-surface text-ds-3 border border-ds'}`}>
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-ds-small font-semibold text-ds-1">Knee MRI Volume</p>
                  <p className="text-[11px] text-ds-4">T2 TSE Sagittal / PDFS Coronal</p>
                </div>
              </button>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id="new-analysis-id"
              label="Assigned Case ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="KS-0249"
              required
            />
            <Input
              id="new-analysis-name"
              label="Patient Full Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g. Jonathan Pierce"
              required
            />
          </div>

          {/* Upload Dropzone */}
          <div>
            <label className="text-ds-label font-medium text-ds-2 block mb-1.5">
              DICOM / Medical Image File
            </label>
            <div className="border-2 border-dashed border-teal-500/30 hover:border-teal-500/60 rounded-panel bg-ds-surface-2/60 p-6 text-center transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-teal-500/10 group-hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center mb-2 transition-colors">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-ds-small font-medium text-ds-1">
                Drag and drop DICOM (.dcm), NIfTI (.nii), or high-res radiological images
              </p>
              <p className="text-[11px] text-ds-4 mt-1">
                Supports Multi-frame DICOM, PACS C-STORE, or anonymized synthetic sets
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-3 border-t border-ds">
            <Button variant="ghost" type="button" onClick={handleReset}>
              Cancel
            </Button>
            <Button
              variant="accent"
              type="submit"
              loading={isUploading}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              {isUploading ? 'Ingesting & Calibrating…' : 'Start Automated Pipeline'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
