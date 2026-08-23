import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Columns,
  Save,
  FileDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { ImplantOption } from '@/data/mockImplantPlanningData';

interface ImplantActionBarProps {
  selectedOption: ImplantOption;
  onOpenCompare: () => void;
  onOpenExport: () => void;
}

export function ImplantActionBar({
  selectedOption,
  onOpenCompare,
  onOpenExport,
}: ImplantActionBarProps) {
  const { success } = useToast();

  const handleSaveDraft = () => {
    success(
      'Planning Draft Saved',
      `Surgical plan draft locked with ${selectedOption.sizeName} (${selectedOption.matchScore}% match).`
    );
  };

  return (
    <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e2">
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Summary Note */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display text-ds-small font-bold text-ds-1">
                Active Selection: {selectedOption.sizeName}
              </h4>
              <Badge variant="teal" size="sm">
                {selectedOption.matchScore}% Match
              </Badge>
            </div>
            <p className="text-ds-caption text-ds-4 mt-0.5">
              {selectedOption.suggestedTag} · {selectedOption.systemName}
            </p>
          </div>
        </div>

        {/* Right: The 3 Required Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap self-end sm:self-auto">
          <Button
            id="compare-options-btn"
            variant="secondary"
            size="md"
            onClick={onOpenCompare}
            leftIcon={<Columns className="w-4 h-4 text-teal-500" />}
            className="font-medium"
          >
            Compare Options
          </Button>

          <Button
            id="save-planning-draft-btn"
            variant="secondary"
            size="md"
            onClick={handleSaveDraft}
            leftIcon={<Save className="w-4 h-4 text-ds-3" />}
            className="font-medium"
          >
            Save Planning Draft
          </Button>

          <Button
            id="export-planning-report-btn"
            variant="accent"
            size="md"
            onClick={onOpenExport}
            leftIcon={<FileDown className="w-4 h-4" />}
            className="font-semibold shadow-sm"
          >
            Export Planning Report
          </Button>
        </div>
      </div>
    </Card>
  );
}
