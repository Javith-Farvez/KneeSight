import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Ruler,
  Brain,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { MOCK_MENISCUS_PATIENT } from '@/data/mockMeniscusData';

export function MeniscusMeasurementCard() {
  const { measurements, confidence, quality, assessment, recommendation, percentileOverall, percentileOA } =
    MOCK_MENISCUS_PATIENT;

  return (
    <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e1">
      {/* Header */}
      <div className="p-5 border-b border-ds bg-ds-surface-2/60">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <h3 className="font-display text-ds-h6 text-ds-1 font-bold">
              Meniscus Regional Thickness
            </h3>
          </div>
          <Badge variant="teal" size="sm" dot>
            Calibrated
          </Badge>
        </div>
        <p className="text-ds-caption text-ds-4">
          Sub-millimeter calibrated MRI morphometric measurements
        </p>
      </div>

      <div className="p-5 space-y-4">
        {/* ── 4 PRIMARY MEASUREMENTS (IBM Plex Mono font-mono) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Anterior */}
          <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
            <span className="text-[10px] uppercase font-bold text-ds-4 tracking-wider block">
              Anterior Horn
            </span>
            <div className="font-mono text-xl font-bold text-ds-1 mt-0.5 leading-tight">
              {measurements.anterior.toFixed(2)}{' '}
              <span className="text-xs font-normal text-ds-4">mm</span>
            </div>
            <span className="text-[10px] text-ds-4 block mt-1">Normal: 4.5–5.5 mm</span>
          </div>

          {/* Central */}
          <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
            <span className="text-[10px] uppercase font-bold text-ds-4 tracking-wider block">
              Central Body
            </span>
            <div className="font-mono text-xl font-bold text-teal-600 dark:text-teal-400 mt-0.5 leading-tight">
              {measurements.central.toFixed(2)}{' '}
              <span className="text-xs font-normal text-ds-4">mm</span>
            </div>
            <span className="text-[10px] text-ds-4 block mt-1">Normal: 4.8–6.0 mm</span>
          </div>

          {/* Posterior */}
          <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
            <span className="text-[10px] uppercase font-bold text-ds-4 tracking-wider block">
              Posterior Horn
            </span>
            <div className="font-mono text-xl font-bold text-coral-600 dark:text-coral-400 mt-0.5 leading-tight">
              {measurements.posterior.toFixed(2)}{' '}
              <span className="text-xs font-normal text-ds-4">mm</span>
            </div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium block mt-1">
              Mild Thinning
            </span>
          </div>

          {/* Average */}
          <div className="p-3 rounded-card bg-teal-500/10 border border-teal-500/30">
            <span className="text-[10px] uppercase font-bold text-teal-800 dark:text-teal-300 tracking-wider block">
              Average Thickness
            </span>
            <div className="font-mono text-xl font-bold text-teal-700 dark:text-teal-300 mt-0.5 leading-tight">
              {measurements.average.toFixed(2)}{' '}
              <span className="text-xs font-normal opacity-70">mm</span>
            </div>
            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold block mt-1">
              Cohort Mean
            </span>
          </div>
        </div>

        {/* ── COHORT PERCENTILE RANKING ── */}
        <div className="p-3.5 rounded-card bg-ds-surface-2 border border-ds flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <div>
              <span className="font-semibold text-ds-1 block">Cohort Percentile Standing</span>
              <span className="text-ds-4 text-[11px]">
                {percentileOverall}th percentile across all age-matched controls · {percentileOA}th percentile in OA cohort
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs shrink-0 self-end sm:self-auto">
            <span className="px-2 py-1 rounded bg-ds-surface border border-ds font-bold text-teal-600 dark:text-teal-400">
              P{percentileOverall}
            </span>
          </div>
        </div>

        {/* ── AI ASSESSMENT PATTERN NOTIFICATION (Strict Safety Language) ── */}
        <div className="p-4 rounded-card bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-1.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-bold text-ds-small text-ds-1">
              {assessment}
            </span>
          </div>
          <p className="text-ds-caption text-amber-800 dark:text-amber-300 leading-relaxed pl-6">
            Posterior horn signal irregularity and subchondral plate contact identified. <strong>{recommendation}</strong> Final radiological confirmation required prior to surgical templating.
          </p>
          <div className="pt-1 pl-6 flex items-center gap-3 text-[11px] font-mono text-amber-700 dark:text-amber-400">
            <span>Inference Quality: <strong>{quality}</strong></span>
            <span>·</span>
            <span>Model Confidence: <strong>{confidence}%</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
}
