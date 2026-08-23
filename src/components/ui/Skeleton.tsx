import React from 'react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Skeleton — KneeSight DS
───────────────────────────────────────────── */

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded bg-ds-surface-2 animate-skeleton',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonCard({ lines = 2 }: { lines?: number }) {
  return (
    <div className="p-6 rounded-card border border-ds bg-ds-surface shadow-ds-e1 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-16 rounded-pill" />
      </div>
      <Skeleton className="h-8 w-28" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-3"
            style={{ width: `${i === lines - 1 ? 55 : 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3.5 px-5">
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="h-3 w-56" />
      </div>
      <Skeleton className="h-5 w-20 rounded-pill" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3.5"
          style={{ width: `${i === lines - 1 ? 60 : 100}%` }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Progress — KneeSight DS
───────────────────────────────────────────── */

export interface ProgressProps {
  value?: number; // 0-100, undefined = indeterminate
  label?: string;
  showValue?: boolean;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'teal' | 'coral' | 'navy' | 'neutral';
}

const progressColors = {
  teal:    'bg-teal-500',
  coral:   'bg-coral-500',
  navy:    'bg-navy-600',
  neutral: 'bg-text-tertiary',
};

const progressSizes = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
};

export function Progress({ value, label, showValue = false, size = 'sm', variant = 'teal' }: ProgressProps) {
  const isIndeterminate = value === undefined;
  return (
    <div>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-ds-caption text-ds-2">{label}</span>}
          {showValue && !isIndeterminate && (
            <span className="text-ds-caption font-mono text-ds-2">{value}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-pill bg-ds-surface-2 overflow-hidden',
          progressSizes[size]
        )}
        role="progressbar"
        aria-valuenow={!isIndeterminate ? value : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {isIndeterminate ? (
          <div className={cn('h-full rounded-pill w-1/3 animate-progress-indeterminate', progressColors[variant])} />
        ) : (
          <div
            className={cn('h-full rounded-pill transition-all duration-[300ms] ease-[cubic-bezier(.2,.8,.2,1)]', progressColors[variant])}
            style={{ width: `${Math.min(100, Math.max(0, value ?? 0))}%` }}
          />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EmptyState — KneeSight DS
───────────────────────────────────────────── */

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
      {icon && (
        <div className="w-12 h-12 rounded-panel bg-ds-surface-2 border border-ds flex items-center justify-center text-ds-3 mb-1">
          {icon}
        </div>
      )}
      <h3 className="text-ds-h6 font-semibold text-ds-1">{title}</h3>
      {description && (
        <p className="text-ds-small text-ds-3 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ErrorState — KneeSight DS
───────────────────────────────────────────── */

export interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
      <div className="w-12 h-12 rounded-panel bg-coral-50 dark:bg-coral-950/20 border border-coral-200 dark:border-coral-800/40 flex items-center justify-center mb-1">
        <span className="text-coral-500 text-xl font-bold">!</span>
      </div>
      <h3 className="text-ds-h6 font-semibold text-ds-1">{title}</h3>
      {description && <p className="text-ds-small text-ds-3 max-w-xs">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tooltip — KneeSight DS (CSS-only, accessible)
───────────────────────────────────────────── */

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const positions = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-flex group">
      {children}
      <div
        role="tooltip"
        className={cn(
          'absolute z-[500] pointer-events-none',
          'px-2.5 py-1.5 rounded-input',
          'bg-navy-800 text-white text-ds-caption font-medium whitespace-nowrap',
          'shadow-ds-e2',
          'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100',
          'transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
          positions[side]
        )}
      >
        {content}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Dropdown — KneeSight DS
───────────────────────────────────────────── */

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

export function Dropdown({ trigger, items, align = 'right' }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-flex">
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className={cn(
            'absolute top-full mt-1.5 z-[100] min-w-[180px]',
            'bg-ds-surface border border-ds rounded-card shadow-ds-e2',
            'animate-slide-down py-1',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          role="menu"
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="h-px bg-ds-surface-2 border-t border-ds my-1" />
            ) : (
              <button
                key={i}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); setOpen(false); }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 text-ds-small text-left',
                  'transition-colors duration-[120ms]',
                  item.danger
                    ? 'text-coral-600 hover:bg-coral-50 dark:text-coral-400 dark:hover:bg-coral-950/20'
                    : 'text-ds-2 hover:bg-ds-surface-2 hover:text-ds-1',
                  item.disabled && 'opacity-40 pointer-events-none'
                )}
              >
                {item.icon && <span className="w-4 h-4 flex items-center shrink-0 text-ds-3" aria-hidden="true">{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
