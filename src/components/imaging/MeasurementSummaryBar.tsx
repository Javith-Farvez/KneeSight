import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Ruler,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Activity,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { UploadedKneeImage, INITIAL_DEMO_IMAGES } from '@/data/mockMultiImageData';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface MeasurementSummaryBarProps {
  activeImage?: UploadedKneeImage;
}

export function MeasurementSummaryBar({ activeImage = INITIAL_DEMO_IMAGES[0] }: MeasurementSummaryBarProps) {
  const fw = activeImage?.measurements?.femoralWidth ?? 73.1;
  const tw = activeImage?.measurements?.tibialWidth ?? 71.7;
  const mt = activeImage?.measurements?.meniscusThickness ?? 4.82;
  const mjsw = activeImage?.measurements?.medialJSW ?? 3.42;
  const ljsw = activeImage?.measurements?.lateralJSW ?? 5.18;

  return (
    <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e1">
      <div className="px-5 py-3 border-b border-ds bg-ds-surface-2/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h4 className="font-semibold text-ds-small text-ds-1">
            Clinical Measurement Summary & Calibrated Biomarkers
          </h4>
          <span className="text-[11px] font-mono text-ds-4 hidden sm:inline">
            Case: KS-0241 · Image 0{activeImage?.imageNumber || 1} ({activeImage?.filename})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal" size="sm">
            Calibrated {activeImage?.pixelSpacing || '0.14 mm/px'}
          </Badge>
          <span className="text-xs text-ds-4 hidden md:inline">
            Confidence: {activeImage?.qualityScores?.overall || 95}%
          </span>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-ds text-left">
        {/* Metric 1: Femoral Width */}
        <div className="pt-2 sm:pt-0 sm:px-3 first:pl-0">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">
            Femoral Width
          </span>
          <div className="font-mono text-lg font-bold text-teal-600 dark:text-teal-400 leading-tight mt-0.5">
            <AnimatedCounter value={fw} decimals={1} durationMs={400} suffix=" mm" />
          </div>
          <span className="text-[11px] text-ds-4 block">Ref: 68.0–78.0 mm</span>
        </div>

        {/* Metric 2: Tibial Width */}
        <div className="pt-2 sm:pt-0 sm:px-3">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">
            Tibial Width
          </span>
          <div className="font-mono text-lg font-bold text-ds-1 leading-tight mt-0.5">
            <AnimatedCounter value={tw} decimals={1} durationMs={400} suffix=" mm" />
          </div>
          <span className="text-[11px] text-ds-4 block">Ref: 66.0–76.0 mm</span>
        </div>

        {/* Metric 3: Meniscus Thickness */}
        <div className="pt-2 sm:pt-0 sm:px-3">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">
            Meniscus Thickness
          </span>
          <div className="font-mono text-lg font-bold text-coral-600 dark:text-coral-400 leading-tight mt-0.5">
            <AnimatedCounter value={mt} decimals={2} durationMs={400} suffix=" mm" />
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 block font-medium">
            Mild Thinning
          </span>
        </div>

        {/* Metric 4: Medial Joint Space */}
        <div className="pt-2 sm:pt-0 sm:px-3">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">
            Medial JSW
          </span>
          <div className="font-mono text-lg font-bold text-amber-600 dark:text-amber-400 leading-tight mt-0.5">
            <AnimatedCounter value={mjsw} decimals={2} durationMs={400} suffix=" mm" />
          </div>
          <span className="text-[11px] text-ds-4 block">Narrowed (-28%)</span>
        </div>

        {/* Metric 5: Lateral Joint Space */}
        <div className="pt-2 sm:pt-0 sm:px-3">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">
            Lateral JSW
          </span>
          <div className="font-mono text-lg font-bold text-ds-1 leading-tight mt-0.5">
            <AnimatedCounter value={ljsw} decimals={2} durationMs={400} suffix=" mm" />
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-medium">
            Normal Preservation
          </span>
        </div>

        {/* Metric 6: KL Grade Assessment */}
        <div className="pt-2 sm:pt-0 sm:px-3 last:pr-0">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">
            KL OA Grade
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-mono text-lg font-bold text-amber-600 dark:text-amber-400">
              Grade 2
            </span>
            <Badge variant="warning" size="sm">Mild OA</Badge>
          </div>
          <span className="text-[11px] text-ds-4 block">Definite Osteophytes</span>
        </div>
      </div>
    </Card>
  );
}
