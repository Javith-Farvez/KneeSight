import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  FileCheck2,
  Cpu,
  Brain,
  Layers,
  Ruler,
  FileSpreadsheet,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UploadedKneeImage } from '@/data/mockMultiImageData';

interface AIProcessingScreenProps {
  images: UploadedKneeImage[];
  onViewResults: () => void;
  onReset: () => void;
}

interface StepInfo {
  id: number;
  label: string;
  durationMs: number;
  icon: React.ElementType;
}

const STEPS: StepInfo[] = [
  { id: 1, label: 'Image validation', durationMs: 700, icon: FileCheck2 },
  { id: 2, label: 'Image preprocessing', durationMs: 900, icon: Cpu },
  { id: 3, label: 'Femur detection', durationMs: 900, icon: Brain },
  { id: 4, label: 'Tibia segmentation', durationMs: 900, icon: Layers },
  { id: 5, label: 'Meniscus detection', durationMs: 1100, icon: Layers },
  { id: 6, label: 'Anatomical measurements', durationMs: 1000, icon: Ruler },
  { id: 7, label: 'Analysis generation', durationMs: 600, icon: FileSpreadsheet },
];

export function AIProcessingScreen({
  images,
  onViewResults,
  onReset,
}: AIProcessingScreenProps) {
  const selectedImages = images.filter((img) => img.selected);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeImage = selectedImages[currentImageIndex] || selectedImages[0];

  useEffect(() => {
    let isCancelled = false;

    const runSequence = async () => {
      for (let s = 0; s < STEPS.length; s++) {
        if (isCancelled) return;
        setCurrentStepIndex(s);
        await new Promise((res) => setTimeout(res, STEPS[s].durationMs));
        if (isCancelled) return;
        setCompletedSteps((prev) => [...prev, s]);
      }
      setIsCompleted(true);
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Visual overlay triggers based on current step
  const showFemur = currentStepIndex >= 2;
  const showTibia = currentStepIndex >= 3;
  const showMeniscus = currentStepIndex >= 4;
  const showMeasurements = currentStepIndex >= 5;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AI-Assisted Multi-Image Diagnostic Inference</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ds-1 tracking-tight">
          {isCompleted ? 'Analysis Complete' : 'AI-Assisted Analysis'}
        </h1>
        <p className="text-ds-small text-ds-3">
          {isCompleted
            ? `${selectedImages.length} image${selectedImages.length === 1 ? '' : 's'} processed successfully`
            : `Processing 1 of ${selectedImages.length} images: ${activeImage?.filename || 'Knee Scan'}`}
        </p>

        {/* Global Progress Bar */}
        <div className="w-full max-w-md mx-auto h-2 bg-ds-surface-2 rounded-full overflow-hidden border border-ds mt-3">
          <motion.div
            className="h-full bg-teal-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{
              width: isCompleted
                ? '100%'
                : `${Math.round(((completedSteps.length + (currentStepIndex >= 0 ? 0.6 : 0)) / STEPS.length) * 100)}%`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 pt-1"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AI-Assisted Analysis Ready
            </span>
          </motion.div>
        )}
      </div>

      {/* Main Split Grid: Live Medical Scanning Viewer (Left) + Stepper Progress (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Medical Processing Frame (7 cols) */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-panel bg-navy-950 border border-ds overflow-hidden shadow-ds-e3 flex items-center justify-center select-none">
            {/* Background Medical Radiograph */}
            <img
              src={activeImage?.previewUrl || '/src/assets/hero-knee.jpg'}
              alt="Medical Scan"
              className="w-full h-full object-cover opacity-85"
            />

            {/* Single Scanning Pass Line Animation (Runs once across the frame) */}
            {!isCompleted && (
              <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 4.5, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_12px_rgba(46,196,182,0.8)] pointer-events-none z-30"
              />
            )}

            {/* Live SVG Progressive Outlines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Femur Outline (Teal) */}
              {showFemur && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M 120 40 C 130 140, 140 210, 160 250 C 175 270, 210 275, 235 260 C 255 245, 265 245, 285 260 C 310 275, 345 270, 360 250 C 380 210, 390 140, 400 40 Z"
                    fill="rgba(46, 196, 182, 0.16)"
                    stroke="#2EC4B6"
                    strokeWidth="2"
                  />
                  <circle cx="185" cy="265" r="3.5" fill="#2EC4B6" />
                  <circle cx="335" cy="265" r="3.5" fill="#2EC4B6" />
                </motion.g>
              )}

              {/* Tibia Outline (Neutral) */}
              {showTibia && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M 145 295 C 190 292, 235 285, 260 272 C 285 285, 330 292, 375 295 C 365 370, 350 440, 335 480 L 185 480 C 170 440, 155 370, 145 295 Z"
                    fill="rgba(203, 213, 225, 0.16)"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                  />
                </motion.g>
              )}

              {/* Meniscus Highlight (Coral) */}
              {showMeniscus && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <path
                    d="M 160 268 C 175 266, 195 268, 205 274 C 195 284, 175 286, 160 284 C 152 280, 152 272, 160 268 Z"
                    fill="rgba(255, 107, 107, 0.22)"
                    stroke="#FF6B6B"
                    strokeWidth="2"
                  />
                </motion.g>
              )}

              {/* Caliper Measurement Markers */}
              {showMeasurements && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Femoral line */}
                  <motion.line
                    x1="135"
                    y1="225"
                    x2="385"
                    y2="225"
                    stroke="#2EC4B6"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <circle cx="135" cy="225" r="3.5" fill="#2EC4B6" />
                  <circle cx="385" cy="225" r="3.5" fill="#2EC4B6" />
                </motion.g>
              )}
            </svg>

            {/* Bottom HUD info */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-30 font-mono text-[11px] text-slate-300 bg-navy-950/80 backdrop-blur-sm p-2 rounded-input border border-navy-800">
              <span className="text-teal-400 font-bold">{activeImage?.filename}</span>
              <span>{activeImage?.pixelSpacing || '0.14 mm/px'}</span>
              <span>{activeImage?.modality}</span>
            </div>
          </div>
        </div>

        {/* Right: Step-by-Step Execution Sequence (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-panel bg-ds-surface border border-ds shadow-ds-e1 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-ds">
              <span className="text-ds-label uppercase tracking-wider text-ds-4 font-bold">
                Pipeline Execution
              </span>
              <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                {completedSteps.length} / {STEPS.length} Steps
              </span>
            </div>

            {/* Steps list */}
            <div className="space-y-2.5">
              {STEPS.map((step, idx) => {
                const isStepCompleted = completedSteps.includes(idx);
                const isCurrent = currentStepIndex === idx && !isCompleted;
                const isPending = idx > currentStepIndex && !isCompleted;
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-2 rounded-input transition-all duration-180 ${
                      isCurrent
                        ? 'bg-teal-500/10 border border-teal-500/30'
                        : isStepCompleted
                        ? 'text-ds-1'
                        : 'text-ds-4 opacity-60'
                    }`}
                  >
                    {/* Status marker */}
                    <div className="shrink-0">
                      {isStepCompleted ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-ds-3 flex items-center justify-center text-transparent">
                          <Circle className="w-2 h-2" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate flex items-center justify-between">
                        <span className={isCurrent ? 'text-teal-700 dark:text-teal-300 font-bold' : ''}>
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="font-mono text-[10px] text-teal-500 font-semibold">
                            Processing…
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons upon completion */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 pt-2"
            >
              <Button
                id="btn-view-analysis-results"
                variant="accent"
                size="lg"
                fullWidth
                onClick={onViewResults}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold shadow-ds-e2"
              >
                View Analysis
              </Button>

              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={onReset}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                className="text-ds-3"
              >
                Analyze Another Case
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
