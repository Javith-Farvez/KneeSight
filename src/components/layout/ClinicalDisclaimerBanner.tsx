import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { CLINICAL_DISCLAIMER_SHORT } from '@/lib/constants';

export function ClinicalDisclaimerBanner() {
  return (
    <div
      id="clinical-disclaimer-banner"
      className="w-full bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-800/30 px-4 py-1.5"
      role="banner"
      aria-label="Clinical safety notice"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
        <p className="text-ds-caption text-amber-700 dark:text-amber-300 font-medium text-center">
          <span className="hidden sm:inline">{CLINICAL_DISCLAIMER_SHORT}</span>
          <span className="sm:hidden">AI Prototype · Decision Support Only · Not for Clinical Diagnosis</span>
        </p>
      </div>
    </div>
  );
}
