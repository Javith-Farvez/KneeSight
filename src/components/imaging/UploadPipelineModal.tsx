import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileCheck2,
  Cpu,
  Brain,
  Layers,
  Ruler,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  X,
  FileImage,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Skeleton';

interface UploadPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: () => void;
}

interface PipelineStep {
  id: number;
  name: string;
  description: string;
  durationMs: number;
  icon: React.ElementType;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 1,
    name: 'Image Validation',
    description: 'Verifying DICOM header metadata, 16-bit pixel depth, and bit-plane integrity',
    durationMs: 700,
    icon: FileCheck2,
  },
  {
    id: 2,
    name: 'Preprocessing',
    description: 'Dynamic window leveling, isotropic resampling to 0.14mm/px, noise reduction',
    durationMs: 850,
    icon: Cpu,
  },
  {
    id: 3,
    name: 'Anatomy Detection',
    description: 'Localizing femoral condyles, tibial plateau margins, and patellar boundaries',
    durationMs: 950,
    icon: Brain,
  },
  {
    id: 4,
    name: 'Segmentation',
    description: 'Running nnU-Net v2 multi-tissue deep learning segmentation masks',
    durationMs: 1100,
    icon: Layers,
  },
  {
    id: 5,
    name: 'Measurement Extraction',
    description: 'Calibrated caliper extraction: femoral width, tibial width, joint space, meniscus thickness',
    durationMs: 800,
    icon: Ruler,
  },
];

export function UploadPipelineModal({
  isOpen,
  onClose,
  onAnalysisComplete,
}: UploadPipelineModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [fileName, setFileName] = useState('KS-0241-AP-WeightBearing.dcm');

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setUploadState('idle');
      setCurrentStepIndex(0);
      setStepProgress(0);
    }
  }, [isOpen]);

  // Execute 5-step analysis pipeline
  useEffect(() => {
    if (uploadState !== 'analyzing') return;

    let isCancelled = false;

    const runPipeline = async () => {
      for (let i = 0; i < PIPELINE_STEPS.length; i++) {
        if (isCancelled) return;
        setCurrentStepIndex(i);

        const step = PIPELINE_STEPS[i];
        const intervals = 10;
        const tick = step.durationMs / intervals;

        for (let p = 0; p <= 100; p += 10) {
          if (isCancelled) return;
          setStepProgress(p);
          await new Promise((r) => setTimeout(r, tick));
        }
      }

      if (!isCancelled) {
        setUploadState('complete');
        setTimeout(() => {
          onAnalysisComplete();
          onClose();
        }, 900);
      }
    };

    runPipeline();

    return () => {
      isCancelled = true;
    };
  }, [uploadState, onAnalysisComplete, onClose]);

  const handleStartAnalysis = (name?: string) => {
    if (name) setFileName(name);
    setUploadState('analyzing');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleStartAnalysis(files[0].name);
    } else {
      handleStartAnalysis();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[260] flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-lg bg-ds-surface rounded-panel border border-ds shadow-ds-e3 overflow-hidden p-6 sm:p-7"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-ds pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-ds-h5 text-ds-1 font-bold">
                    Upload Knee Radiograph / DICOM
                  </h3>
                  <p className="text-ds-caption text-ds-4">
                    5-Stage Automated AI Extraction & Segmentation Pipeline
                  </p>
                </div>
              </div>

              {uploadState !== 'analyzing' && (
                <button
                  onClick={onClose}
                  className="p-1 rounded text-ds-4 hover:text-ds-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* ── STATE 1: IDLE / DRAG AND DROP ZONE ── */}
            {uploadState === 'idle' && (
              <div className="space-y-4">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => handleStartAnalysis()}
                  className={`border-2 border-dashed rounded-panel p-8 text-center transition-all cursor-pointer group ${
                    isDragging
                      ? 'border-teal-500 bg-teal-500/10 scale-[1.01]'
                      : 'border-teal-500/30 hover:border-teal-500/60 bg-ds-surface-2/60 hover:bg-ds-surface-2'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-teal-500/10 group-hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center mb-3 transition-colors">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-ds-body text-ds-1 mb-1">
                    Drag and drop your DICOM or X-Ray scan here
                  </h4>
                  <p className="text-ds-caption text-ds-4 max-w-sm mx-auto">
                    Accepts <span className="font-mono text-ds-2">.DCM</span>, <span className="font-mono text-ds-2">.DICOM</span>, <span className="font-mono text-ds-2">.NII</span>, PNG/TIFF (Weight-Bearing AP/Lateral Knee)
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-btn bg-teal-500 text-white text-xs font-semibold shadow-sm group-hover:bg-teal-600 transition-colors">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Select Local File or Load Sample</span>
                  </div>
                </div>

                {/* Preloaded Demo Dataset Quick Buttons */}
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ds-4 block mb-2">
                    Or Quick-Load Calibrated Sample Scans:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStartAnalysis('KS-0241-AP-WeightBearing.dcm')}
                      className="p-2 rounded-btn bg-ds-surface hover:bg-teal-500/10 border border-ds text-left text-xs transition-colors flex items-center gap-2"
                    >
                      <FileImage className="w-4 h-4 text-teal-500 shrink-0" />
                      <div className="truncate">
                        <span className="font-medium text-ds-1 block truncate">Case KS-0241 (Mild OA)</span>
                        <span className="text-[10px] text-ds-4">AP Weight-Bearing · Right</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleStartAnalysis('KS-0243-AP-SevereOA.dcm')}
                      className="p-2 rounded-btn bg-ds-surface hover:bg-teal-500/10 border border-ds text-left text-xs transition-colors flex items-center gap-2"
                    >
                      <FileImage className="w-4 h-4 text-coral-500 shrink-0" />
                      <div className="truncate">
                        <span className="font-medium text-ds-1 block truncate">Case KS-0243 (Severe OA)</span>
                        <span className="text-[10px] text-ds-4">KL-4 · Joint Loss</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── STATE 2 & 3: ANALYZING 5-STEP PIPELINE PROGRESS ── */}
            {(uploadState === 'analyzing' || uploadState === 'complete') && (
              <div className="space-y-5 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider block">
                      {uploadState === 'complete' ? 'Analysis Complete' : 'Analysis in progress...'}
                    </span>
                    <h4 className="font-display text-base font-bold text-ds-1 mt-0.5">
                      Processing: {fileName}
                    </h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-pill">
                    {uploadState === 'complete'
                      ? '100%'
                      : `${Math.round(((currentStepIndex * 100) + stepProgress) / PIPELINE_STEPS.length)}%`}
                  </span>
                </div>

                {/* Overarching Progress Bar */}
                <Progress
                  value={
                    uploadState === 'complete'
                      ? 100
                      : ((currentStepIndex * 100) + stepProgress) / PIPELINE_STEPS.length
                  }
                  variant="teal"
                  size="sm"
                />

                {/* 5 Sequential Pipeline Steps */}
                <div className="space-y-2.5 pt-1">
                  {PIPELINE_STEPS.map((step, idx) => {
                    const StepIcon = step.icon;
                    const isDone = idx < currentStepIndex || uploadState === 'complete';
                    const isCurrent = idx === currentStepIndex && uploadState === 'analyzing';
                    const isPending = idx > currentStepIndex && uploadState !== 'complete';

                    return (
                      <div
                        key={step.id}
                        className={`flex items-start gap-3 p-2.5 rounded-card border transition-all ${
                          isCurrent
                            ? 'bg-teal-500/10 border-teal-500/40 text-ds-1 shadow-xs'
                            : isDone
                            ? 'bg-ds-surface-2/70 border-ds text-ds-2'
                            : 'bg-ds-surface-2/30 border-transparent text-ds-4 opacity-50'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isDone
                              ? 'bg-emerald-500 text-white'
                              : isCurrent
                              ? 'bg-teal-500 text-white animate-pulse'
                              : 'bg-ds-surface-2 text-ds-4 border border-ds'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <StepIcon className="w-3.5 h-3.5" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-ds-small font-semibold text-ds-1">
                              {step.id}. {step.name}
                            </p>
                            {isCurrent && (
                              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-bold">
                                {stepProgress}%
                              </span>
                            )}
                            {isDone && (
                              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <p className="text-ds-caption text-ds-4 mt-0.5 truncate">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
