import React from 'react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Badge — KneeSight DS
   Variants: default | teal | navy | coral | success | warning | danger | info | outline
   Sizes: sm | md
───────────────────────────────────────────── */

export type BadgeVariant =
  | 'default' | 'teal' | 'navy' | 'coral'
  | 'success' | 'warning' | 'danger' | 'info' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default:
    'bg-surface-light text-text-secondary border-border dark:bg-surface-dark-2 dark:text-text-dark-secondary dark:border-border-dark',
  teal:
    'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-700/40',
  navy:
    'bg-navy-50 text-navy-700 border-navy-200 dark:bg-navy-900/30 dark:text-navy-300 dark:border-navy-700/40',
  coral:
    'bg-coral-50 text-coral-700 border-coral-200 dark:bg-coral-950/30 dark:text-coral-400 dark:border-coral-700/40',
  success:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-700/40',
  warning:
    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-700/40',
  danger:
    'bg-coral-50 text-coral-600 border-coral-200 dark:bg-coral-950/30 dark:text-coral-400 dark:border-coral-700/40',
  info:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-700/40',
  outline:
    'bg-transparent text-ds-2 border-ds',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-text-tertiary',
  teal: 'bg-teal-500',
  navy: 'bg-navy-600',
  coral: 'bg-coral-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-coral-500',
  info: 'bg-blue-500',
  outline: 'bg-text-tertiary',
};

export function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border rounded-pill whitespace-nowrap',
        size === 'xs' ? 'px-1.5 py-0.2 text-[10px]' : size === 'sm' ? 'px-2 py-0.5 text-ds-caption' : 'px-2.5 py-1 text-ds-small',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

/* ── StatusIndicator ── */
export type StatusType = 'operational' | 'degraded' | 'down' | 'pending' | 'processing';

const statusConfig: Record<StatusType, { dot: string; label: string; badge: BadgeVariant }> = {
  operational: { dot: 'bg-emerald-500', label: 'Operational', badge: 'success' },
  degraded:    { dot: 'bg-amber-500',   label: 'Degraded',    badge: 'warning' },
  down:        { dot: 'bg-coral-500',   label: 'Offline',     badge: 'danger' },
  pending:     { dot: 'bg-text-tertiary', label: 'Pending',   badge: 'default' },
  processing:  { dot: 'bg-teal-500 animate-pulse', label: 'Processing', badge: 'teal' },
};

export function StatusIndicator({ status, label }: { status: StatusType; label?: string }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.badge} dot size="sm">
      <span className={cn('w-1.5 h-1.5 rounded-full mr-0.5 hidden', config.dot)} />
      {label ?? config.label}
    </Badge>
  );
}
