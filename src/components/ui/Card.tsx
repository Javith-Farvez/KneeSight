import React from 'react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Card — KneeSight DS
   Variants: default | flat | outline | elevated | ai-panel
───────────────────────────────────────────── */

export type CardVariant = 'default' | 'flat' | 'outline' | 'elevated' | 'ai-panel';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  noPad?: boolean;
  tealTop?: boolean;   /* teal hairline top accent — for AI result cards */
}

const cardVariants: Record<CardVariant, string> = {
  default:
    'bg-ds-surface border border-ds shadow-ds-e1 ' +
    'hover:-translate-y-[2px] hover:border-teal-500/35 hover:shadow-ds-e2 ' +
    'transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
  flat:
    'bg-ds-surface-2 border border-ds-2 ' +
    'hover:border-teal-500/30 transition-all duration-[180ms]',
  outline:
    'bg-transparent border border-ds ' +
    'hover:border-teal-500/40 transition-all duration-[180ms]',
  elevated:
    'bg-ds-surface border border-ds shadow-ds-e2 ' +
    'hover:-translate-y-[2px] hover:shadow-ds-e3 ' +
    'transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
  'ai-panel':
    'bg-ds-surface border border-teal-500/30 shadow-ds-e1 ' +
    'hover:-translate-y-[2px] hover:border-teal-500/60 hover:shadow-ds-e2 ' +
    'transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
};

export function Card({ variant = 'default', noPad = false, tealTop = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card overflow-hidden',
        cardVariants[variant],
        !noPad && 'p-6',
        tealTop && 'border-t-2 border-t-teal-500',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Card sub-components ── */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
  subtitle?: string;
}

export function CardHeader({ action, subtitle, className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-5', className)} {...props}>
      <div className="min-w-0 flex-1">
        {children}
        {subtitle && <p className="text-ds-small text-ds-3 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-ds-h6 font-semibold text-ds-1 tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 pt-4 mt-4 border-t border-ds',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
