import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/* ─────────────────────────────────────────────
   Button — KneeSight DS
   Variants: primary | secondary | accent | ghost | danger | icon
   Sizes: xs | sm | md | lg
───────────────────────────────────────────── */

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'icon';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center font-sans font-medium select-none ' +
  'transition-all duration-[150ms] ease-[cubic-bezier(.2,.8,.2,1)] ' +
  'hover:-translate-y-[1px] active:scale-[0.98] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ' +
  'disabled:opacity-50 disabled:pointer-events-none disabled:transform-none ' +
  'rounded-btn cursor-pointer';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-navy-800 text-white hover:bg-navy-700 active:bg-navy-900 ' +
    'shadow-e1 hover:shadow-e2 ' +
    'focus-visible:ring-teal-500 ' +
    'dark:bg-navy-700 dark:hover:bg-navy-600',
  secondary:
    'bg-ds-surface border border-ds text-ds-1 ' +
    'hover:bg-ds-surface-2 hover:border-teal-500/40 ' +
    'shadow-e1 hover:shadow-e2 ' +
    'focus-visible:ring-teal-500 ' +
    'dark:bg-surface-dark-2 dark:border-border-dark dark:hover:border-teal-500/40',
  accent:
    'bg-teal-500 text-white hover:bg-teal-400 active:bg-teal-600 ' +
    'shadow-e1 hover:shadow-teal-glow ' +
    'focus-visible:ring-teal-300',
  ghost:
    'bg-transparent text-ds-2 hover:bg-ds-surface-2 hover:text-ds-1 ' +
    'focus-visible:ring-teal-500',
  danger:
    'bg-coral-500 text-white hover:bg-coral-400 active:bg-coral-600 ' +
    'shadow-e1 hover:shadow-coral-glow ' +
    'focus-visible:ring-coral-300',
  icon:
    'bg-transparent text-ds-3 hover:bg-ds-surface-2 hover:text-ds-1 ' +
    'focus-visible:ring-teal-500',
};

const sizes: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5',
  sm: 'h-8 px-3.5 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-[0.9375rem] gap-2.5',
};

const iconSizes: Record<ButtonSize, string> = {
  xs: 'h-7 w-7',
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIcon = variant === 'icon' && !children;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          isIcon ? iconSizes[size] : sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="shrink-0 flex items-center" aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children && <span className="truncate">{children}</span>}
        {!loading && rightIcon && (
          <span className="shrink-0 flex items-center" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

/* ── IconButton convenience wrapper ── */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: 'ghost' | 'secondary';
  size?: ButtonSize;
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'ghost', size = 'md', loading = false, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        title={label}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          iconSizes[size],
          'rounded-btn',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          <span className="flex items-center justify-center" aria-hidden="true">{icon}</span>
        )}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
