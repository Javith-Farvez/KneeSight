import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

/* ─────────────────────────────────────────────
   Input — KneeSight DS
   States: default | hover | focus | success | error | disabled | loading
───────────────────────────────────────────── */

export type InputState = 'default' | 'success' | 'error' | 'loading';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  inputState?: InputState;
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const stateClasses: Record<InputState, string> = {
  default:
    'border-ds bg-ds-surface text-ds-1 placeholder:text-ds-4 ' +
    'hover:border-teal-500/50 ' +
    'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
  success:
    'border-emerald-400 bg-ds-surface text-ds-1 ' +
    'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
  error:
    'border-coral-400 bg-ds-surface text-ds-1 ' +
    'focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20',
  loading:
    'border-ds bg-ds-surface-2 text-ds-1 placeholder:text-ds-4',
};

const inputSizes = {
  sm: 'h-8 text-ds-small',
  md: 'h-9 text-ds-small',
  lg: 'h-11 text-ds-body',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      successText,
      leftIcon,
      rightElement,
      inputState: stateProp,
      inputSize = 'md',
      fullWidth = false,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const state: InputState = disabled ? 'default' : errorText ? 'error' : stateProp ?? 'default';
    const hasHelper = errorText || successText || helperText;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : '')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-ds-label uppercase tracking-wider text-ds-2 font-semibold"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center text-ds-3 pointer-events-none" aria-hidden="true">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full rounded-input border outline-none transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
              'px-3',
              inputSizes[inputSize],
              stateClasses[state],
              leftIcon && 'pl-9',
              (rightElement || state === 'success' || state === 'error' || state === 'loading') && 'pr-9',
              disabled && 'opacity-50 cursor-not-allowed bg-ds-surface-2',
              className
            )}
            {...props}
          />
          <div className="absolute right-3 flex items-center pointer-events-none">
            {state === 'loading' && <Loader2 className="w-4 h-4 text-ds-3 animate-spin" />}
            {state === 'success' && !rightElement && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            {state === 'error' && !rightElement && <AlertCircle className="w-4 h-4 text-coral-500" />}
            {rightElement && state === 'default' && <span className="text-ds-3">{rightElement}</span>}
          </div>
        </div>
        {hasHelper && (
          <p
            className={cn(
              'text-ds-caption',
              errorText ? 'text-coral-500 dark:text-coral-400' :
              successText ? 'text-emerald-600 dark:text-emerald-400' :
              'text-ds-3'
            )}
          >
            {errorText ?? successText ?? helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* ── Select ── */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, options, placeholder, fullWidth = false, className, id, ...props }, ref) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={selectId} className="text-ds-label uppercase tracking-wider text-ds-2 font-semibold">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-9 rounded-input border border-ds bg-ds-surface text-ds-1 text-ds-small px-3',
            'outline-none cursor-pointer appearance-none',
            'hover:border-teal-500/50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
            'transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            fullWidth && 'w-full',
            className
          )}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A8DAD' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {helperText && <p className="text-ds-caption text-ds-3">{helperText}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

/* ── Checkbox ── */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const checkId = id || (label ? `chk-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    return (
      <label htmlFor={checkId} className="flex items-start gap-2.5 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          id={checkId}
          className={cn(
            'mt-0.5 h-4 w-4 rounded border border-ds bg-ds-surface cursor-pointer',
            'text-teal-500 accent-teal-500',
            'focus-visible:ring-2 focus-visible:ring-teal-500/30',
            'transition-all duration-[180ms]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div>
            {label && (
              <p className="text-ds-small font-medium text-ds-1 group-hover:text-ds-1 transition-colors">
                {label}
              </p>
            )}
            {description && (
              <p className="text-ds-caption text-ds-3 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
