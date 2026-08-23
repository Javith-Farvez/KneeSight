import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  User,
  Calendar,
  Layers,
  Sparkles,
  ShieldAlert,
  Columns,
  Save,
  FileDown,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImplantComparisonViewer } from '@/components/implant/ImplantComparisonViewer';
import { RankedImplantCards } from '@/components/implant/RankedImplantCards';
import { AnatomicalMeasurementCard } from '@/components/implant/AnatomicalMeasurementCard';
import { CompareOptionsModal } from '@/components/implant/CompareOptionsModal';
import { ExportReportModal } from '@/components/implant/ExportReportModal';
import { ImplantActionBar } from '@/components/implant/ImplantActionBar';
import {
  MOCK_IMPLANT_PATIENT,
  MOCK_IMPLANT_OPTIONS,
  ImplantOption,
} from '@/data/mockImplantPlanningData';

export function ImplantPlanningPage() {
  const [selectedOption, setSelectedOption] = useState<ImplantOption>(MOCK_IMPLANT_OPTIONS[0]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const patient = MOCK_IMPLANT_PATIENT;

  return (
    <div className="page-content space-y-6 pb-12">
      {/* ── WORKSPACE HEADER WITH PATIENT SUMMARY ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-ds pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
                Patient-Specific Implant Planning
              </h1>
              <p className="text-ds-small text-ds-4 mt-0.5">
                Anatomical measurements and ranked implant-fit suggestions
              </p>
            </div>
          </div>
        </div>

        {/* Patient Summary Header Strip */}
        <div className="flex items-center gap-3 p-2 rounded-card bg-ds-surface-2 border border-ds text-xs flex-wrap self-start lg:self-auto font-mono">
          <div className="flex items-center gap-1.5 px-2">
            <User className="w-3.5 h-3.5 text-ds-4" />
            <span className="font-semibold text-ds-1">Patient ID: {patient.id}</span>
            <span className="text-ds-4">(Age: {patient.age})</span>
          </div>
          <span className="text-ds-4 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 px-2 text-ds-3">
            <span className="text-ds-4">Study:</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">{patient.studyId}</span>
          </div>
          <span className="text-ds-4 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 px-2 text-ds-4">
            <Badge variant="teal" size="sm">
              {patient.affectedSide}
            </Badge>
          </div>
        </div>
      </div>

      {/* ── TOP WORKSPACE ROW: GEOMETRIC VIEWER (7-COL) + MEASUREMENT CARD (5-COL) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Translucent Geometric Overlay Comparison Viewer */}
        <div className="lg:col-span-7 flex flex-col">
          <ImplantComparisonViewer
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
            allOptions={MOCK_IMPLANT_OPTIONS}
          />
        </div>

        {/* Right: Anatomical Bone Morphometrics Card */}
        <div className="lg:col-span-5 flex flex-col">
          <AnatomicalMeasurementCard />
        </div>
      </div>

      {/* ── MIDDLE ROW: 3 RANKED RECOMMENDATION CARDS (12-COL) ── */}
      <RankedImplantCards
        options={MOCK_IMPLANT_OPTIONS}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />

      {/* ── BOTTOM ROW: WORKFLOW ACTION BAR & BUTTONS ── */}
      <ImplantActionBar
        selectedOption={selectedOption}
        onOpenCompare={() => setCompareModalOpen(true)}
        onOpenExport={() => setExportModalOpen(true)}
      />

      {/* ── MODALS ── */}
      <CompareOptionsModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />

      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        selectedOption={selectedOption}
      />
    </div>
  );
}
