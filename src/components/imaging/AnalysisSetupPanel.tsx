import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Info,
  Shield,
  Clock,
  ScanLine,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AnalysisSetupPanelProps {
  selectedCount: number;
  totalCount: number;
  onStartAnalysis: (analysisType: string) => void;
}

export function AnalysisSetupPanel({
  selectedCount,
  totalCount,
  onStartAnalysis,
}: AnalysisSetupPanelProps) {
  const [analysisType, setAnalysisType] = useState('Full Knee Analysis');
  const [modelPipeline, setModelPipeline] = useState('nnU-Net v2 (Multi-Tissue Segmenter)');

  const canAnalyze = selectedCount > 0;

  return (
    <Card className="flex flex-col h-full" noPad>
      <div className="p-5 border-b border-ds bg-ds-surface-2/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="font-display text-lg font-bold text-ds-1">
              Analysis Setup
            </h2>
          </div>
          <Badge variant="teal" size="sm">
            Ready
          </Badge>
        </div>
        <p className="text-ds-small text-ds-3 mt-1">
          Configure diagnostic parameters for AI anatomical extraction
        </p>
      </div>

      <div className="p-5 space-y-5 flex-1">
        {/* Patient / Case Assignment */}
        <div className="space-y-1.5">
          <label className="text-ds-label uppercase tracking-wider text-ds-4 font-bold">
            Patient / Case
          </label>
          <div className="p-3 rounded-input bg-ds-surface border border-ds flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-ds-1">
                <span>Demo Case KS-0241</span>
              </div>
              <div className="text-[11px] text-ds-4 mt-0.5">
                Age: 62 · Sex: Male · 4 Images
              </div>
            </div>
            <Badge variant="teal" size="xs">
              Demo Case
            </Badge>
          </div>
        </div>

        {/* Selected Images Counter */}
        <div className="space-y-1.5">
          <label className="text-ds-label uppercase tracking-wider text-ds-4 font-bold">
            Imaging
          </label>
          <div className="p-3 rounded-input bg-ds-surface border border-ds flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-ds-small font-semibold text-ds-1">
                {selectedCount} image{selectedCount === 1 ? '' : 's'} selected
              </span>
            </div>
            {selectedCount > 0 ? (
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Validated
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-coral-500 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                0 Selected
              </span>
            )}
          </div>
        </div>

        {/* Analysis Type Select */}
        <div className="space-y-1.5">
          <label htmlFor="analysis-type-select" className="text-ds-label uppercase tracking-wider text-ds-4 font-bold">
            Analysis Type
          </label>
          <div className="relative">
            <select
              id="analysis-type-select"
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="w-full h-10 px-3.5 pr-9 rounded-input bg-ds-surface border border-ds text-ds-small font-semibold text-ds-1 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="Full Knee Analysis">Full Knee Analysis</option>
              <option value="Meniscus Analysis">Meniscus Analysis</option>
              <option value="Anatomical Measurements">Anatomical Measurements</option>
              <option value="Implant Planning">Implant Planning</option>
            </select>
            <ChevronDown className="w-4 h-4 text-ds-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Neural Network Model */}
        <div className="space-y-1.5">
          <label htmlFor="model-pipeline-select" className="text-ds-label uppercase tracking-wider text-ds-4 font-bold">
            AI Segmentation Pipeline
          </label>
          <div className="relative">
            <select
              id="model-pipeline-select"
              value={modelPipeline}
              onChange={(e) => setModelPipeline(e.target.value)}
              className="w-full h-10 px-3.5 pr-9 rounded-input bg-ds-surface border border-ds text-ds-small font-medium text-ds-2 focus:border-teal-500 outline-none appearance-none cursor-pointer"
            >
              <option value="nnU-Net v2 (Multi-Tissue Segmenter)">nnU-Net v2 · 3D Multi-Tissue Resection Model</option>
              <option value="MedSAM-Knee-Enhanced">MedSAM-Knee v1.4 · Zero-Shot Boundary Refiner</option>
              <option value="FastDICOM-Realtime">FastDICOM-Realtime · 150ms Low-Latency Stream</option>
            </select>
            <ChevronDown className="w-4 h-4 text-ds-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Protocol Details Summary */}
        <div className="p-3.5 rounded-panel bg-ds-surface-2/60 border border-ds space-y-2 text-xs">
          <div className="flex items-center justify-between text-ds-3">
            <span>Estimated Inference Time</span>
            <span className="font-mono font-bold text-ds-1">~5.8s</span>
          </div>
          <div className="flex items-center justify-between text-ds-3">
            <span>Calibrated Output Scale</span>
            <span className="font-mono font-bold text-ds-1">0.12–0.15 mm/px</span>
          </div>
          <div className="flex items-center justify-between text-ds-3">
            <span>Clinical Findings Classification</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">Decision Support Mode</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 border-t border-ds bg-ds-surface-2/30 space-y-3">
        <Button
          id="btn-analyze-selected-images"
          variant="accent"
          size="lg"
          fullWidth
          disabled={!canAnalyze}
          onClick={() => canAnalyze && onStartAnalysis(analysisType)}
          leftIcon={<Sparkles className="w-4 h-4" />}
          className="font-bold shadow-ds-e2"
        >
          {canAnalyze ? `Analyze ${selectedCount} Selected Image${selectedCount > 1 ? 's' : ''}` : 'Analyze Selected Images'}
        </Button>

        {!canAnalyze && (
          <p className="text-center text-xs text-coral-500 font-medium">
            Select at least one image to begin.
          </p>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-ds-4 text-center">
          <Shield className="w-3.5 h-3.5 text-teal-500 shrink-0" />
          <span>Demo results — for clinical decision review only.</span>
        </div>
      </div>
    </Card>
  );
}
