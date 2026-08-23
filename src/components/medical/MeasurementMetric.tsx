import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

/* ─────────────────────────────────────────────
   MeasurementMetric — KneeSight DS
   Displays clinical numerical measurements with normal range indicators
   Uses IBM Plex Mono for values (font-mono / data-value)
───────────────────────────────────────────── */

interface MeasurementMetricProps {
  label: string;
  value: number;
  unit: string;
  normalMin?: number;
  normalMax?: number;
  decimals?: number;
  compact?: boolean;
}

export function MeasurementMetric({
  label,
  value,
  unit,
  normalMin,
  normalMax,
  decimals = 1,
  compact = false,
}: MeasurementMetricProps) {
  const hasRange   = normalMin !== undefined && normalMax !== undefined;
  const isLow      = normalMin !== undefined && value < normalMin;
  const isHigh     = normalMax !== undefined && value > normalMax;
  const isOutOfRange = isLow || isHigh;

  const TrendIcon = isHigh ? TrendingUp : isLow ? TrendingDown : Minus;

  const colors = isOutOfRange
    ? {
        panel:  'bg-coral-50 dark:bg-coral-950/15 border-coral-200 dark:border-coral-700/40',
        value:  'text-coral-600 dark:text-coral-400',
        icon:   'text-coral-500',
        range:  'text-coral-400 dark:text-coral-500',
      }
    : {
        panel:  'bg-teal-50 dark:bg-teal-950/15 border-teal-200 dark:border-teal-700/40',
        value:  'text-teal-700 dark:text-teal-400',
        icon:   'text-teal-500',
        range:  'text-teal-500/60 dark:text-teal-600',
      };

  /* Compact row — for tables or list items */
  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="text-ds-caption text-ds-3 truncate">{label}</span>
        <span className={cn('font-mono text-ds-caption font-semibold shrink-0', colors.value)}>
          {value.toFixed(decimals)}{' '}
          <span className="opacity-60 font-normal">{unit}</span>
        </span>
      </div>
    );
  }

  /* Full metric panel */
  return (
    <div className={cn('rounded-card border p-4', colors.panel)}>
      <p className="text-ds-caption text-ds-3 mb-2">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <span className={cn('font-mono leading-none', colors.value)}>
            <span className="text-ds-h5 font-semibold">{value.toFixed(decimals)}</span>
            <span className="text-ds-small font-normal ml-1 opacity-70">{unit}</span>
          </span>
        </div>
        <TrendIcon className={cn('w-4 h-4 shrink-0', colors.icon)} aria-hidden="true" />
      </div>
      {hasRange && (
        <p className={cn('text-ds-caption mt-2 font-mono', colors.range)}>
          Normal: {normalMin}–{normalMax} {unit}
        </p>
      )}
    </div>
  );
}
