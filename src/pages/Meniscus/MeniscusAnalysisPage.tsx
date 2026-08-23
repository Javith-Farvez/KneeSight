import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Ruler,
  Brain,
  Calendar,
  User,
  Activity,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MeniscusImageViewer } from '@/components/meniscus/MeniscusImageViewer';
import { MeniscusMeasurementCard } from '@/components/meniscus/MeniscusMeasurementCard';
import { MeniscusComparisonCharts } from '@/components/meniscus/MeniscusComparisonCharts';
import { ClinicalReviewBar } from '@/components/meniscus/ClinicalReviewBar';
import { MOCK_MENISCUS_PATIENT } from '@/data/mockMeniscusData';

export function MeniscusAnalysisPage() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [opacity, setOpacity] = useState(80);

  const patient = MOCK_MENISCUS_PATIENT;

  return (
    <div className="page-content space-y-6 pb-12">
      {/* ── HEADER WITH CLINICAL PATIENT METADATA ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-ds pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
                  Medial Meniscus & OA Assessment
                </h1>
                <Badge variant="teal" size="sm">
                  {patient.id}
                </Badge>
              </div>
              <p className="text-ds-small text-ds-4 mt-0.5">
                Automated multi-planar MRI fibrocartilage segmentation & morphometric cohort analytics
              </p>
            </div>
          </div>
        </div>

        {/* Patient Metadata Strip */}
        <div className="flex items-center gap-3 p-2 rounded-card bg-ds-surface-2 border border-ds text-xs flex-wrap self-start lg:self-auto font-mono">
          <div className="flex items-center gap-1.5 px-2">
            <User className="w-3.5 h-3.5 text-ds-4" />
            <span className="font-semibold text-ds-1">{patient.name}</span>
            <span className="text-ds-4">({patient.age}y {patient.sex})</span>
          </div>
          <span className="text-ds-4 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 px-2 text-ds-3">
            <span className="text-ds-4">Study:</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">{patient.studyId}</span>
          </div>
          <span className="text-ds-4 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 px-2 text-ds-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>{patient.analysisDate}</span>
          </div>
        </div>
      </div>

      {/* ── TOP SECTION: IMAGE VIEWER (LEFT 7-COL) + REGIONAL MEASUREMENT CARD (RIGHT 5-COL) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: MRI Image Viewer */}
        <div className="lg:col-span-7 flex flex-col">
          <MeniscusImageViewer
            showOverlay={showOverlay}
            onToggleOverlay={setShowOverlay}
            showMeasurements={showMeasurements}
            onToggleMeasurements={setShowMeasurements}
            opacity={opacity}
            onOpacityChange={setOpacity}
          />
        </div>

        {/* Right: Regional Measurements & AI Assessment */}
        <div className="lg:col-span-5 flex flex-col">
          <MeniscusMeasurementCard />
        </div>
      </div>

      {/* ── MIDDLE SECTION: COHORT COMPARISON CHARTS & FILTERS (12-COL) ── */}
      <MeniscusComparisonCharts />

      {/* ── BOTTOM SECTION: CLINICAL REVIEW & WORKFLOW ACTIONS ── */}
      <ClinicalReviewBar />
    </div>
  );
}
