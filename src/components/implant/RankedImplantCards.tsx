import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react';
import { ImplantOption } from '@/data/mockImplantPlanningData';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface RankedImplantCardsProps {
  options: ImplantOption[];
  selectedOption: ImplantOption;
  onSelectOption: (option: ImplantOption) => void;
}

export function RankedImplantCards({
  options,
  selectedOption,
  onSelectOption,
}: RankedImplantCardsProps) {
  const getStatusBadge = (status: 'Excellent' | 'Good' | 'Review') => {
    if (status === 'Excellent') {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Excellent
        </span>
      );
    }
    if (status === 'Good') {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Good
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-coral-500/10 text-coral-600 dark:text-coral-400 border border-coral-500/20">
        Review
      </span>
    );
  };

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-ds-h6 text-ds-1 font-bold">
            Ranked Implant Recommendations
          </h3>
          <p className="text-ds-caption text-ds-4 mt-0.5">
            Parametric multi-criteria fit analysis · Ranked recommendation hierarchy
          </p>
        </div>
        <Badge variant="teal" size="sm">
          3 Sizing Candidates
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {options.map((option) => {
          const isSelected = selectedOption.id === option.id;

          return (
            <div
              key={option.id}
              onClick={() => onSelectOption(option)}
              className={`relative rounded-panel p-5 border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-ds-surface border-teal-500 ring-2 ring-teal-500/20 shadow-ds-e2'
                  : 'bg-ds-surface-2/70 hover:bg-ds-surface border-ds hover:border-teal-500/40 shadow-xs'
              }`}
            >
              {/* Top Row: Rank & Match Score */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        option.rank === 1
                          ? 'bg-teal-500 text-white shadow-xs'
                          : 'bg-ds-surface border border-ds text-ds-3'
                      }`}
                    >
                      #{option.rank}
                    </span>
                    <span className="font-display text-base font-bold text-ds-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {option.sizeName}
                    </span>
                  </div>

                  <div className="font-mono text-right">
                    <span
                      className={`text-lg font-bold ${
                        option.rank === 1
                          ? 'text-teal-600 dark:text-teal-400'
                          : option.rank === 2
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-coral-600 dark:text-coral-400'
                      }`}
                    >
                      {option.matchScore}%
                    </span>
                    <span className="text-[10px] text-ds-4 block leading-none">
                      {option.rank === 1 ? 'Anatomical Match' : 'Match'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-ds-4 font-medium mb-3 truncate">
                  {option.systemName}
                </p>

                {/* 4 Fit Parameters Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-card bg-ds-surface-2/60 border border-ds text-xs mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-ds-4 text-[11px]">Femoral Fit</span>
                    {getStatusBadge(option.femoralFit)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ds-4 text-[11px]">Tibial Fit</span>
                    {getStatusBadge(option.tibialFit)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ds-4 text-[11px]">Coverage</span>
                    {getStatusBadge(option.coverageStatus)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ds-4 text-[11px]">Alignment</span>
                    {getStatusBadge(option.alignmentStatus)}
                  </div>
                </div>

                {/* Surgeon Notes */}
                <p className="text-ds-caption text-ds-3 line-clamp-2 leading-relaxed">
                  {option.surgeonNotes}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-ds flex items-center justify-between text-xs">
                <span
                  className={`text-[11px] font-semibold ${
                    option.rank === 1
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-ds-4'
                  }`}
                >
                  {option.rank === 1 ? 'Suggested match' : 'Ranked recommendation'}
                </span>

                <button
                  type="button"
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
                      : 'text-ds-4 group-hover:text-ds-1'
                  }`}
                >
                  <span>{isSelected ? 'Active Model' : 'Select'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
