import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Eye,
  Ruler,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
  Info,
  Activity,
  Wrench,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Skeleton';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { UploadedKneeImage, INITIAL_DEMO_IMAGES } from '@/data/mockMultiImageData';

interface AIAnalysisPanelProps {
  showOverlays: boolean;
  onToggleOverlays: (val: boolean) => void;
  showMeasurements: boolean;
  onToggleMeasurements: (val: boolean) => void;
  onSelectStructure: (struct: 'all' | 'femur' | 'tibia' | 'meniscus' | null) => void;
  selectedStructure: 'all' | 'femur' | 'tibia' | 'meniscus' | null;
  activeImage?: UploadedKneeImage;
}

export function AIAnalysisPanel({
  showOverlays,
  onToggleOverlays,
  showMeasurements,
  onToggleMeasurements,
  onSelectStructure,
  selectedStructure,
  activeImage = INITIAL_DEMO_IMAGES[0],
}: AIAnalysisPanelProps) {
  const navigate = useNavigate();

  const femurScore = activeImage?.qualityScores?.femur ?? 97;
  const tibiaScore = activeImage?.qualityScores?.tibia ?? 96;
  const meniscusScore = activeImage?.qualityScores?.meniscus ?? 89;

  const femoralWidth = activeImage?.measurements?.femoralWidth ?? 73.1;
  const tibialWidth = activeImage?.measurements?.tibialWidth ?? 71.7;
  const meniscusThickness = activeImage?.measurements?.meniscusThickness ?? 4.82;

  return (
    <Card className="h-full flex flex-col justify-between" noPad>
      {/* ── HEADER ── */}
      <div className="p-5 border-b border-ds bg-ds-surface-2/60">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="font-display text-ds-h6 text-ds-1 font-bold">
              AI-Assisted Demo Analysis
            </h3>
          </div>
          <Badge variant="teal" size="sm" dot>
            Analysis Complete
          </Badge>
        </div>

        <div className="flex items-center justify-between text-ds-caption text-ds-4 mt-2">
          <span>Active Image</span>
          <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">
            Image 0{activeImage?.imageNumber || 1} · {activeImage?.filename}
          </span>
        </div>
      </div>

      {/* ── CONTENT BODY ── */}
      <div className="p-5 space-y-5 flex-1 overflow-y-auto">
        {/* 1. SEGMENTATION QUALITY */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-ds-label font-bold uppercase tracking-wider text-ds-4">
              Segmentation Quality
            </h4>
            <span className="text-[11px] font-mono text-ds-4">Dice Score Metric</span>
          </div>

          <div className="space-y-2.5">
            {/* Femur */}
            <div>
              <div className="flex items-center justify-between text-ds-small mb-1">
                <span className="text-ds-2 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Femur
                </span>
                <span className="font-mono font-bold text-ds-1">
                  <AnimatedCounter value={femurScore} durationMs={450} />%
                </span>
              </div>
              <Progress value={femurScore} variant="teal" size="xs" />
            </div>

            {/* Tibia */}
            <div>
              <div className="flex items-center justify-between text-ds-small mb-1">
                <span className="text-ds-2 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  Tibia
                </span>
                <span className="font-mono font-bold text-ds-1">
                  <AnimatedCounter value={tibiaScore} durationMs={450} />%
                </span>
              </div>
              <Progress value={tibiaScore} variant="teal" size="xs" />
            </div>

            {/* Meniscus */}
            <div>
              <div className="flex items-center justify-between text-ds-small mb-1">
                <span className="text-ds-2 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-coral-500" />
                  Meniscus
                </span>
                <span className="font-mono font-bold text-ds-1">
                  <AnimatedCounter value={meniscusScore} durationMs={450} />%
                </span>
              </div>
              <Progress value={meniscusScore} variant="teal" size="xs" />
            </div>
          </div>
        </div>

        {/* 2. DETECTED STRUCTURES CHECKLIST */}
        <div className="p-3.5 rounded-card bg-ds-surface-2 border border-ds space-y-2">
          <h4 className="text-ds-label font-bold uppercase tracking-wider text-ds-4 mb-2">
            Detected Structures
          </h4>
          <div className="grid grid-cols-1 gap-2 text-ds-small">
            <button
              onClick={() => onSelectStructure(selectedStructure === 'femur' ? null : 'femur')}
              className={`flex items-center justify-between p-1.5 rounded-btn transition-colors text-left group ${
                selectedStructure === 'femur' ? 'bg-teal-500/10 border border-teal-500/30' : 'hover:bg-ds-surface'
              }`}
            >
              <span className="flex items-center gap-2 text-ds-2 group-hover:text-ds-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Femur (Bicondylar landmarks verified)</span>
              </span>
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                0.{femurScore}
              </span>
            </button>

            <button
              onClick={() => onSelectStructure(selectedStructure === 'tibia' ? null : 'tibia')}
              className={`flex items-center justify-between p-1.5 rounded-btn transition-colors text-left group ${
                selectedStructure === 'tibia' ? 'bg-teal-500/10 border border-teal-500/30' : 'hover:bg-ds-surface'
              }`}
            >
              <span className="flex items-center gap-2 text-ds-2 group-hover:text-ds-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Tibia (Plateau base & spines segmented)</span>
              </span>
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                0.{tibiaScore}
              </span>
            </button>

            <button
              onClick={() => onSelectStructure(selectedStructure === 'meniscus' ? null : 'meniscus')}
              className={`flex items-center justify-between p-1.5 rounded-btn transition-colors text-left group ${
                selectedStructure === 'meniscus' ? 'bg-coral-500/10 border border-coral-500/30' : 'hover:bg-ds-surface'
              }`}
            >
              <span className="flex items-center gap-2 text-ds-2 group-hover:text-ds-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Medial Meniscus (Fibrocartilage wedge)</span>
              </span>
              <span className="text-[11px] font-mono text-coral-600 dark:text-coral-400 font-semibold">
                0.{meniscusScore}
              </span>
            </button>
          </div>
        </div>

        {/* 3. EXTRACTED MEASUREMENTS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-ds-label font-bold uppercase tracking-wider text-ds-4">
              Anatomical Measurements
            </h4>
            <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
              Calibrated Calipers
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {/* Femoral Width */}
            <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between">
              <div>
                <p className="text-ds-caption text-ds-4">Femoral Width</p>
                <p className="text-ds-small font-semibold text-ds-1 mt-0.5">
                  Bicondylar trans-epicondylar distance
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-base font-bold text-teal-600 dark:text-teal-400">
                  <AnimatedCounter value={femoralWidth} decimals={1} durationMs={400} suffix=" mm" />
                </span>
                <span className="text-[10px] text-ds-4 block">Normal: 68–78 mm</span>
              </div>
            </div>

            {/* Tibial Width */}
            <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between">
              <div>
                <p className="text-ds-caption text-ds-4">Tibial Width</p>
                <p className="text-ds-small font-semibold text-ds-1 mt-0.5">
                  Max plateau mediolateral span
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                  <AnimatedCounter value={tibialWidth} decimals={1} durationMs={400} suffix=" mm" />
                </span>
                <span className="text-[10px] text-ds-4 block">Normal: 66–76 mm</span>
              </div>
            </div>

            {/* Meniscus Thickness */}
            <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between">
              <div>
                <p className="text-ds-caption text-ds-4">Meniscus Thickness</p>
                <p className="text-ds-small font-semibold text-ds-1 mt-0.5">
                  Medial horn coronal height
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-base font-bold text-coral-600 dark:text-coral-400">
                  <AnimatedCounter value={meniscusThickness} decimals={2} durationMs={400} suffix=" mm" />
                </span>
                <span className="text-[10px] text-ds-4 block">Normal: 4.0–6.0 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER: BUTTONS & DISCLAIMER ── */}
      <div className="p-5 border-t border-ds bg-ds-surface-2/60 space-y-3 shrink-0">
        {/* Layer & Caliper toggles */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            id="review-overlay-btn"
            variant={showOverlays ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onToggleOverlays(!showOverlays)}
            leftIcon={<Layers className="w-4 h-4" />}
            fullWidth
          >
            Review Overlay
          </Button>

          <Button
            id="view-measurements-btn"
            variant={showMeasurements ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onToggleMeasurements(!showMeasurements)}
            leftIcon={<Ruler className="w-4 h-4" />}
            fullWidth
          >
            View Measurements
          </Button>
        </div>

        {/* Workflow Continuation Buttons (Section 15) */}
        <div className="grid grid-cols-1 gap-2 pt-1">
          <Button
            id="btn-review-meniscus-oa"
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => navigate('/meniscus')}
            leftIcon={<Activity className="w-4 h-4 text-coral-500" />}
            rightIcon={<ArrowRight className="w-4 h-4 ml-auto" />}
            className="font-semibold shadow-xs text-left justify-start"
          >
            Review Meniscus / OA Analysis
          </Button>

          <Button
            id="btn-continue-implant-planning"
            variant="accent"
            size="md"
            fullWidth
            onClick={() => navigate('/implant-planning')}
            leftIcon={<Wrench className="w-4 h-4" />}
            rightIcon={<ArrowRight className="w-4 h-4 ml-auto" />}
            className="font-semibold shadow-sm text-left justify-start"
          >
            Continue to Implant Planning
          </Button>
        </div>

        {/* AI Clinical Disclaimer (Section 16 & Prompt Banner) */}
        <div className="flex items-start gap-2 p-2.5 rounded-card bg-ds-surface border border-ds text-[11px] text-ds-4 leading-relaxed">
          <ShieldAlert className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
          <p>
            <strong className="text-ds-2">Demo results — for clinical review.</strong> AI-generated segmentations and measurements are decision-support aids for evaluation.
          </p>
        </div>
      </div>
    </Card>
  );
}
