import React from 'react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Switch — KneeSight DS
───────────────────────────────────────────── */

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  size?: 'sm' | 'md';
}

export function Switch({ checked, onChange, label, description, disabled, id, size = 'md' }: SwitchProps) {
  const switchId = id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const trackSm = 'w-8 h-4';
  const trackMd = 'w-10 h-5';
  const thumbSm = 'w-3 h-3';
  const thumbMd = 'w-3.5 h-3.5';
  const translateSm = 'translate-x-4';
  const translateMd = 'translate-x-5';

  return (
    <label
      htmlFor={switchId}
      className={cn(
        'flex items-start gap-3 cursor-pointer group',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      {/* Track */}
      <div className="relative shrink-0 mt-0.5">
        <input
          id={switchId}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
        />
        <div
          onClick={() => !disabled && onChange(!checked)}
          className={cn(
            'rounded-pill transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)] cursor-pointer relative',
            size === 'sm' ? trackSm : trackMd,
            checked
              ? 'bg-teal-500'
              : 'bg-border dark:bg-border-dark-2'
          )}
        >
          <div
            className={cn(
              'absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
              size === 'sm' ? thumbSm : thumbMd,
              checked ? (size === 'sm' ? translateSm : translateMd) : 'translate-x-0'
            )}
          />
        </div>
      </div>

      {/* Label */}
      {(label || description) && (
        <div>
          {label && (
            <p className="text-ds-small font-medium text-ds-1 transition-colors">
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
