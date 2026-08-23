import React from 'react';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';
import { Progress } from '@/components/ui/Skeleton';

/* ─────────────────────────────────────────────
   ConfidenceScore — KneeSight DS
   Displays AI model confidence 0-100
───────────────────────────────────────────── */

interface ConfidenceScoreProps {
  score: number; // 0-100 (or 0.0-1.0, auto-normalised)
  label?: string;
  showBar?: boolean;
  compact?: boolean;
}

function getConfidenceVariant(pct: number): {
  badge: string;
  progressVariant: 'teal' | 'navy' | 'coral';
  text: string;
} {
  if (pct >= 90) return {
    badge:   'bg-teal-50 dark:bg-teal-950/25 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-700/40',
    progressVariant: 'teal',
    text:    'High confidence',
  };
  if (pct >= 75) return {
    badge:   'bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-500 border-teal-200 dark:border-teal-800/40',
    progressVariant: 'teal',
    text:    'Good confidence',
  };
  if (pct >= 60) return {
    badge:   'bg-amber-50 dark:bg-amber-950/25 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700/40',
    progressVariant: 'navy',
    text:    'Moderate confidence',
  };
  return {
    badge:   'bg-coral-50 dark:bg-coral-950/25 text-coral-600 dark:text-coral-400 border-coral-200 dark:border-coral-700/40',
    progressVariant: 'coral',
    text:    'Low confidence — additional review required',
  };
}

export function ConfidenceScore({
  score,
  label = 'AI Confidence',
  showBar = true,
  compact = false,
}: ConfidenceScoreProps) {
  const pct = score > 1 ? score : score * 100;
  const { badge, progressVariant, text } = getConfidenceVariant(pct);

  if (compact) {
    return (
      <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 text-ds-caption font-semibold border rounded-pill', badge)}>
        <Brain className="w-3 h-3" aria-hidden="true" />
        <span className="font-mono">{pct.toFixed(1)}%</span>
      </span>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 text-ds-caption font-semibold border rounded-pill', badge)}>
          <Brain className="w-3 h-3" aria-hidden="true" />
          {label}: <span className="font-mono">{pct.toFixed(1)}%</span>
        </div>
        <span className="text-ds-caption text-ds-4">{text}</span>
      </div>
      {showBar && (
        <Progress value={pct} variant={progressVariant} size="xs" />
      )}
    </div>
  );
}
