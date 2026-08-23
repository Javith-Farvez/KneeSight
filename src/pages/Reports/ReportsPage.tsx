import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Printer,
  FileDown,
  ArrowLeft,
  Share2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Building,
  User,
  Calendar,
  Layers,
  Ruler,
  Brain,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import { MOCK_CASE_LIST, CaseItem } from '@/data/mockCaseManagerData';

export function ReportsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success } = useToast();

  const caseIdParam = searchParams.get('id') || 'KS-0241';
  const [selectedCaseId, setSelectedCaseId] = useState(caseIdParam);

  const currentCase: CaseItem =
    MOCK_CASE_LIST.find((c) => c.id.toLowerCase() === selectedCaseId.toLowerCase()) ||
    MOCK_CASE_LIST[0];

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    success(
      'PDF Generated',
      `Clinical report for ${currentCase.name} (${currentCase.id}) exported successfully.`
    );
  };

  return (
    <div className="page-content space-y-6 pb-16">
      {/* ── TOOLBAR (Hidden during print) ── */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ds pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/patients/${currentCase.id}`)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Case
          </Button>

          <div className="h-4 w-[1px] bg-ds" />

          {/* Case switcher dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-ds-4 uppercase">Select Case:</span>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="h-8 rounded-input px-2.5 bg-ds-surface border border-ds text-ds-1 text-xs font-mono font-bold focus:border-teal-500 outline-none cursor-pointer"
            >
              {MOCK_CASE_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.name} ({c.oaStatus})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportPDF}
            leftIcon={<FileDown className="w-4 h-4 text-teal-500" />}
          >
            Export PDF
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Report
          </Button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          POLISHED CLINICAL-STYLE REPORT DOCUMENT PREVIEW
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-navy-950 text-slate-900 dark:text-slate-100 rounded-panel border border-ds shadow-ds-e3 p-6 sm:p-10 font-sans space-y-7 print:border-none print:shadow-none print:p-0 print:m-0">
        {/* ── 1. REPORT CLINICAL HEADER ── */}
        <div className="border-b-2 border-teal-500 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold text-xl tracking-tight shrink-0 shadow-md">
              KS
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                KneeSight AI™ Clinical Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Department of Musculoskeletal Radiology & Orthopedic Surgery
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
            <div>REPORT ID: <strong className="text-slate-800 dark:text-slate-200">REP-2026-0241</strong></div>
            <div>DATE: {currentCase.studyDate}</div>
            <div>VER: 2.1 (AI-Assisted)</div>
          </div>
        </div>

        {/* ── 2. CASE INFORMATION ── */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> 1. Case Information
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Patient Name</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{currentCase.name}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Case ID / MRN</span>
              <span className="font-mono text-slate-900 dark:text-slate-100">{currentCase.id} ({currentCase.mrn})</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Age / Sex / DOB</span>
              <span className="text-slate-900 dark:text-slate-100">{currentCase.age}y / {currentCase.sex} ({currentCase.dob})</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Attending Clinician</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">{currentCase.attendingPhysician}</span>
            </div>
          </div>
        </div>

        {/* ── 3. IMAGING SUMMARY ── */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> 2. Imaging Summary & Acquisition
          </h3>

          <div className="p-3.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Study ID</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{currentCase.studyId}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Examination</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">{currentCase.affectedKnee} Knee AP/Sagittal MR</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Inference Quality</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Calibrated (99.2% SNR)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. DETECTED STRUCTURES & OA BIOMARKERS ── */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5" /> 3. Detected Structures & OA Biomarkers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Kellgren-Lawrence Grade:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{currentCase.oaStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Medial Joint Space Width:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{currentCase.medialJSW} mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Lateral Joint Space Width:</span>
                <span className="font-mono text-slate-900 dark:text-slate-100">{currentCase.lateralJSW} mm</span>
              </div>
            </div>

            <div className="p-3.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Femur Segmentation:</span>
                <span className="text-emerald-600 font-bold">✓ Delineated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Tibia Segmentation:</span>
                <span className="text-emerald-600 font-bold">✓ Delineated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Model Confidence:</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{currentCase.analysisConfidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. ANATOMICAL MEASUREMENTS ── */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5" /> 4. Calibrated Anatomical Measurements
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block font-sans">Femoral ML</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{currentCase.femoralML} mm</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block font-sans">Femoral AP</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{currentCase.femoralAP} mm</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block font-sans">Tibial ML</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{currentCase.tibialML} mm</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block font-sans">Tibial AP</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{currentCase.tibialAP} mm</span>
            </div>
          </div>
        </div>

        {/* ── 6. MENISCUS REGIONAL ANALYSIS ── */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> 5. Medial Meniscus Regional Thickness
          </h3>

          <div className="p-3.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs space-y-2.5">
            <div className="grid grid-cols-4 gap-2 font-mono text-center">
              <div className="p-2 rounded bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Ant. Horn</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{currentCase.meniscusAnterior} mm</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Central</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{currentCase.meniscusCentral} mm</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Post. Horn</span>
                <span className="font-bold text-coral-600 dark:text-coral-400">{currentCase.meniscusPosterior} mm</span>
              </div>
              <div className="p-2 rounded bg-teal-500/10 border border-teal-500/30">
                <span className="text-[10px] text-teal-700 dark:text-teal-300 block font-sans uppercase font-bold">Average</span>
                <span className="font-bold text-teal-700 dark:text-teal-300">{currentCase.meniscusAverage} mm</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
              <strong>Morphology Note:</strong> {currentCase.meniscusTearType}
            </p>
          </div>
        </div>

        {/* ── 7. IMPLANT PLANNING SUGGESTIONS ── */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" /> 6. Pre-Operative Implant Planning Suggestions
          </h3>

          <div className="p-3.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Top Ranked Recommendation</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{currentCase.implantPlanning}</span>
              </div>
              <span className="px-2 py-1 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold font-mono">
                Suggested Match
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Rank 1: Size 5 (96% anatomical match) · Rank 2: Size 4 (91% match) · Rank 3: Size 6 (84% match).
            </p>
          </div>
        </div>

        {/* ── 8. CLINICAL REVIEW NOTES & SIGN-OFF ── */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> 7. Clinical Review Notes & Attending Sign-Off
          </h3>

          <div className="p-4 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs space-y-3">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{currentCase.clinicalNotes}"
            </p>

            <div className="pt-3 border-t border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              <div>Verified By: <strong>{currentCase.attendingPhysician}</strong></div>
              <div>Timestamp: {currentCase.studyDate} 09:42 EST</div>
            </div>
          </div>
        </div>

        {/* ── 9. MANDATORY AI DISCLAIMER ── */}
        <div className="p-3.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Decision Support Disclaimer</span>
          </div>
          <p className="leading-relaxed text-amber-800 dark:text-amber-300">
            AI-generated findings are intended for clinical decision support and do not replace independent clinical judgment. This document is a clinical demonstration prototype report and not a certified medical record.
          </p>
        </div>
      </div>
    </div>
  );
}
