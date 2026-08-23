import React from 'react';
import { cn } from '@/lib/utils';
import { KellgrenLawrenceGradeLevel } from '@/types';
import { KL_GRADE_DEFINITIONS } from '@/lib/constants';

/* ── DS colour map per KL grade ── */
const gradeDS: Record<KellgrenLawrenceGradeLevel, {
  badge: string;   // pill badge
  panel: string;   // panel bg + border
  text:  string;   // main colour text
  bar:   string;   // progress bar fill
}> = {
  0: {
    badge: 'bg-teal-50 dark:bg-teal-950/25 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-700/40',
    panel: 'bg-teal-50 dark:bg-teal-950/15 border-teal-200 dark:border-teal-700/40',
    text:  'text-teal-700 dark:text-teal-400',
    bar:   'bg-teal-500',
  },
  1: {
    badge: 'bg-teal-50 dark:bg-teal-950/25 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-700/40',
    panel: 'bg-teal-50 dark:bg-teal-950/15 border-teal-200 dark:border-teal-700/40',
    text:  'text-teal-700 dark:text-teal-400',
    bar:   'bg-teal-400',
  },
  2: {
    badge: 'bg-amber-50 dark:bg-amber-950/25 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700/40',
    panel: 'bg-amber-50 dark:bg-amber-950/15 border-amber-200 dark:border-amber-700/40',
    text:  'text-amber-700 dark:text-amber-400',
    bar:   'bg-amber-400',
  },
  3: {
    badge: 'bg-coral-50 dark:bg-coral-950/25 text-coral-600 dark:text-coral-400 border-coral-200 dark:border-coral-700/40',
    panel: 'bg-coral-50 dark:bg-coral-950/15 border-coral-200 dark:border-coral-700/40',
    text:  'text-coral-600 dark:text-coral-400',
    bar:   'bg-coral-500',
  },
  4: {
    badge: 'bg-coral-100 dark:bg-coral-950/35 text-coral-700 dark:text-coral-300 border-coral-300 dark:border-coral-700/60',
    panel: 'bg-coral-100 dark:bg-coral-950/25 border-coral-300 dark:border-coral-700/60',
    text:  'text-coral-700 dark:text-coral-300',
    bar:   'bg-coral-600',
  },
};

interface KellgrenLawrenceGradeProps {
  grade: KellgrenLawrenceGradeLevel;
  confidence?: number;
  compact?: boolean;
  showDefinition?: boolean;
}

export function KellgrenLawrenceGrade({
  grade,
  confidence,
  compact = false,
  showDefinition = false,
}: KellgrenLawrenceGradeProps) {
  const ds = gradeDS[grade];
  const definition = KL_GRADE_DEFINITIONS[grade];

  /* Compact pill — used in tables and patient cards */
  if (compact) {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-pill text-ds-caption font-semibold border',
          ds.badge
        )}
        title={definition.title}
      >
        KL&thinsp;{grade}
      </span>
    );
  }

  /* Full panel — used in analysis modules */
  return (
    <div className={cn('rounded-card border p-5', ds.panel)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-ds-label uppercase tracking-widest text-ds-3 mb-1">Kellgren-Lawrence Grade</p>
          <p className={cn('text-ds-h6 font-semibold', ds.text)}>{definition.title}</p>
        </div>
        {/* Grade number badge */}
        <div className={cn(
          'w-11 h-11 rounded-card flex items-center justify-center shrink-0',
          'font-display text-ds-h4 border-2',
          ds.badge
        )}>
          {grade}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-pill bg-black/10 dark:bg-white/10 overflow-hidden mb-3">
        <div
          className={cn('h-full rounded-pill transition-all duration-[300ms] ease-[cubic-bezier(.2,.8,.2,1)]', ds.bar)}
          style={{ width: `${(grade / 4) * 100}%` }}
        />
      </div>

      {showDefinition && (
        <p className={cn('text-ds-small leading-relaxed opacity-75', ds.text)}>{definition.desc}</p>
      )}

      {confidence !== undefined && (
        <div className="mt-3 pt-3 border-t border-current/10 flex items-center justify-between">
          <p className="text-ds-caption text-ds-3">AI Confidence</p>
          <p className={cn('font-mono text-ds-small font-semibold', ds.text)}>{confidence.toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
