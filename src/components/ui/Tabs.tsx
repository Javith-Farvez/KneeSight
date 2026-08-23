import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Tabs — KneeSight DS
   Variants: underline | pills | segment
───────────────────────────────────────────── */

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'segment';
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, variant = 'underline', className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        variant === 'underline' &&
          'flex gap-0 border-b border-ds',
        variant === 'pills' &&
          'flex gap-1',
        variant === 'segment' &&
          'inline-flex gap-0.5 bg-ds-surface-2 border border-ds rounded-btn p-1',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 text-ds-small font-medium whitespace-nowrap',
              'transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 rounded',
              'disabled:opacity-40 disabled:pointer-events-none',

              /* Underline variant */
              variant === 'underline' && [
                'px-4 py-2.5 -mb-px border-b-2',
                isActive
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-ds-3 hover:text-ds-2 hover:border-ds',
              ],

              /* Pills variant */
              variant === 'pills' && [
                'px-3.5 py-1.5 rounded-pill',
                isActive
                  ? 'bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400'
                  : 'text-ds-3 hover:text-ds-2 hover:bg-ds-surface-2',
              ],

              /* Segment variant */
              variant === 'segment' && [
                'px-3 py-1.5 rounded text-ds-caption',
                isActive
                  ? 'bg-ds-surface text-ds-1 shadow-e1'
                  : 'text-ds-3 hover:text-ds-2',
              ]
            )}
          >
            {tab.icon && <span className="w-4 h-4 flex items-center" aria-hidden="true">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-pill font-semibold text-[10px] leading-none',
                  isActive
                    ? 'bg-teal-500/15 text-teal-600 dark:text-teal-400'
                    : 'bg-ds-surface-2 text-ds-3'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── TabPanel ── */
export interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ tabId, activeTab, children, className }: TabPanelProps) {
  if (tabId !== activeTab) return null;
  return (
    <div
      id={`tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      className={cn('animate-fade-in', className)}
    >
      {children}
    </div>
  );
}

/* ── useTabs hook ── */
export function useTabs(initialTab: string) {
  const [activeTab, setActiveTab] = useState(initialTab);
  return { activeTab, setActiveTab };
}
