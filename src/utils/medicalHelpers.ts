import { KellgrenLawrenceGradeLevel, RiskLevel } from '../types';

export function getKLGradeColor(grade: KellgrenLawrenceGradeLevel): {
  bg: string;
  text: string;
  border: string;
  badge: string;
} {
  switch (grade) {
    case 0:
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/50',
        badge: 'bg-emerald-500 text-white'
      };
    case 1:
      return {
        bg: 'bg-teal-50 dark:bg-teal-950/30',
        text: 'text-teal-700 dark:text-teal-400',
        border: 'border-teal-200 dark:border-teal-800/50',
        badge: 'bg-teal-500 text-white'
      };
    case 2:
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/50',
        badge: 'bg-amber-500 text-white'
      };
    case 3:
      return {
        bg: 'bg-orange-50 dark:bg-orange-950/30',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800/50',
        badge: 'bg-orange-500 text-white'
      };
    case 4:
    default:
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/30',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800/50',
        badge: 'bg-rose-500 text-white'
      };
  }
}

export function getRiskLevelFromKL(grade: KellgrenLawrenceGradeLevel): RiskLevel {
  if (grade <= 1) return 'Low';
  if (grade === 2) return 'Moderate';
  if (grade === 3) return 'Elevated';
  return 'High';
}

export function getConfidenceBadgeColor(confidence: number): string {
  const norm = confidence > 1 ? confidence : confidence * 100;
  if (norm >= 90) return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60';
  if (norm >= 75) return 'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60';
  if (norm >= 60) return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60';
  return 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60';
}
