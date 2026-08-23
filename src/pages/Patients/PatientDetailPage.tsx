import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Calendar,
  Layers,
  Brain,
  Ruler,
  Wrench,
  ShieldCheck,
  FileText,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Activity,
  Printer,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_CASE_LIST, CaseItem } from '@/data/mockCaseManagerData';
import { useToast } from '@/hooks/useToast';
import heroKneeImg from '@/assets/hero-knee.jpg';
import aiAnalysisPanelImg from '@/assets/ai-analysis-panel.jpg';

type DetailTab =
  | 'overview'
  | 'imaging'
  | 'ai-analysis'
  | 'meniscus'
  | 'measurements'
  | 'implant'
  | 'review'
  | 'reports';

const TIMELINE_STAGES = [
  { id: 1, name: 'Upload', icon: Upload, desc: 'DICOM Ingestion' },
  { id: 2, name: 'AI Analysis', icon: Brain, desc: 'Biomarker Extraction' },
  { id: 3, name: 'Measurements', icon: Ruler, desc: 'Calibrated Morphometrics' },
  { id: 4, name: 'Clinical Review', icon: ShieldCheck, desc: 'Specialist Sign-Off' },
  { id: 5, name: 'Implant Planning', icon: Wrench, desc: 'Sizing & Resection' },
  { id: 6, name: 'Report', icon: FileText, desc: 'Clinical Handoff' },
];

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { success, info } = useToast();
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  // Find case by ID (fallback to KS-0241)
  const currentCase: CaseItem =
    MOCK_CASE_LIST.find((c) => c.id.toLowerCase() === id?.toLowerCase()) || MOCK_CASE_LIST[0];

  const handleSignOff = () => {
    success('Case Signed Off', `Clinical verification confirmed for case ${currentCase.id}.`);
  };

  return (
    <div className="page-content space-y-6 pb-12">
      {/* ── TOP BACK NAVIGATION & HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ds pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/patients')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            All Cases
          </Button>

          <div className="h-4 w-[1px] bg-ds" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
                Case {currentCase.id}: {currentCase.name}
              </h1>
              <Badge variant="teal" size="sm">
                {currentCase.mrn}
              </Badge>
              <Badge
                variant={currentCase.oaGrade >= 3 ? 'danger' : currentCase.oaGrade >= 2 ? 'warning' : 'success'}
                size="sm"
              >
                {currentCase.oaStatus}
              </Badge>
            </div>
            <p className="text-ds-small text-ds-4 mt-0.5 font-mono">
              {currentCase.age}y {currentCase.sex} · Study: {currentCase.studyId} ({currentCase.studyDate}) · {currentCase.affectedKnee} Knee
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/imaging')}
            leftIcon={<Layers className="w-4 h-4 text-teal-500" />}
          >
            Open in Viewer
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => navigate(`/reports?id=${currentCase.id}`)}
            leftIcon={<FileText className="w-4 h-4" />}
          >
            View Clinical Report
          </Button>
        </div>
      </div>

      {/* ── CASE TIMELINE: ANIMATED PROGRESS STATES ── */}
      <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e1">
        <div className="p-4 border-b border-ds bg-ds-surface-2/60 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-ds-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-500" /> Case Processing Timeline
          </span>
          <span className="font-mono text-xs text-ds-4">
            Current Stage: <strong className="text-teal-600 dark:text-teal-400">Stage {currentCase.currentStage} of 6</strong>
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {TIMELINE_STAGES.map((stage, idx) => {
              const isCompleted = stage.id <= currentCase.currentStage;
              const isCurrent = stage.id === currentCase.currentStage;
              const StageIcon = stage.icon;

              return (
                <div
                  key={stage.id}
                  className={`p-3 rounded-card border transition-all relative ${
                    isCurrent
                      ? 'bg-teal-500/10 border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                      : isCompleted
                      ? 'bg-ds-surface-2 border-emerald-500/30'
                      : 'bg-ds-surface-2/40 border-ds opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-ds-surface text-ds-4 border border-ds'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stage.id}
                    </div>

                    {isCurrent && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                      </span>
                    )}
                  </div>

                  <span className="font-display text-xs font-bold text-ds-1 block truncate">
                    {stage.name}
                  </span>
                  <span className="text-[10px] text-ds-4 block truncate mt-0.5">
                    {stage.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* ── 8 TAB NAVIGATION STRIP ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-ds text-xs">
        {[
          { key: 'overview', label: 'Patient Overview', icon: User },
          { key: 'imaging', label: 'Imaging Studies', icon: Layers },
          { key: 'ai-analysis', label: 'AI Analysis', icon: Brain },
          { key: 'meniscus', label: 'Meniscus Analysis', icon: Activity },
          { key: 'measurements', label: 'Measurements', icon: Ruler },
          { key: 'implant', label: 'Implant Planning', icon: Wrench },
          { key: 'review', label: 'Clinical Review', icon: ShieldCheck },
          { key: 'reports', label: 'Reports', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as DetailTab)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t font-semibold whitespace-nowrap transition-colors border-b-2 ${
                isActive
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-500/10'
                  : 'border-transparent text-ds-4 hover:text-ds-1 hover:bg-ds-surface-2'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB CONTENT AREAS ── */}
      <div className="space-y-5">
        {/* TAB 1: PATIENT OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <Card className="lg:col-span-6" noPad>
              <CardHeader>
                <CardTitle>Demographic & Clinical History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-card bg-ds-surface-2 border border-ds">
                  <div>
                    <span className="text-ds-4 text-[10px] uppercase font-bold block">Full Name</span>
                    <span className="font-semibold text-ds-1 text-sm">{currentCase.name}</span>
                  </div>
                  <div>
                    <span className="text-ds-4 text-[10px] uppercase font-bold block">Date of Birth</span>
                    <span className="font-mono text-ds-1">{currentCase.dob} ({currentCase.age}y)</span>
                  </div>
                  <div>
                    <span className="text-ds-4 text-[10px] uppercase font-bold block">MRN</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{currentCase.mrn}</span>
                  </div>
                  <div>
                    <span className="text-ds-4 text-[10px] uppercase font-bold block">BMI</span>
                    <span className="font-mono text-ds-1">{currentCase.bmi} kg/m²</span>
                  </div>
                </div>

                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds space-y-1.5">
                  <span className="text-ds-4 text-[10px] uppercase font-bold block">Chief Complaint</span>
                  <p className="text-ds-2 leading-relaxed">{currentCase.primarySymptom}</p>
                </div>

                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds space-y-1">
                  <span className="text-ds-4 text-[10px] uppercase font-bold block">Attending Clinician</span>
                  <p className="text-ds-1 font-semibold">{currentCase.attendingPhysician}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-6" noPad>
              <CardHeader>
                <CardTitle>Functional Scores & Severity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                    <span className="text-[10px] text-ds-4 uppercase font-bold block">VAS Pain</span>
                    <span className="font-mono text-2xl font-bold text-coral-600 dark:text-coral-400 block mt-1">
                      {currentCase.vasPainScore} / 10
                    </span>
                  </div>

                  <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                    <span className="text-[10px] text-ds-4 uppercase font-bold block">WOMAC Score</span>
                    <span className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400 block mt-1">
                      {currentCase.womacScore} / 96
                    </span>
                  </div>

                  <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                    <span className="text-[10px] text-ds-4 uppercase font-bold block">KSS Score</span>
                    <span className="font-mono text-2xl font-bold text-teal-600 dark:text-teal-400 block mt-1">
                      {currentCase.kssScore} / 100
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-card bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Clinical Impression: {currentCase.oaStatus}</span>
                  </div>
                  <p className="text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
                    {currentCase.clinicalNotes}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: IMAGING STUDIES */}
        {activeTab === 'imaging' && (
          <Card noPad>
            <CardHeader
              action={
                <Button variant="accent" size="sm" onClick={() => navigate('/imaging')}>
                  Open in Interactive Viewer
                </Button>
              }
            >
              <CardTitle>DICOM Imaging Series ({currentCase.studyId})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative rounded-card border border-ds overflow-hidden bg-black aspect-video flex items-center justify-center">
                  <img src={heroKneeImg} alt="Weight bearing X-ray" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/80 text-white font-mono text-[10px]">
                    Series 1 · Weight-Bearing AP View
                  </div>
                </div>

                <div className="relative rounded-card border border-ds overflow-hidden bg-black aspect-video flex items-center justify-center">
                  <img src={aiAnalysisPanelImg} alt="AI Segmentation" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/80 text-teal-300 font-mono text-[10px]">
                    Series 2 · 3.0T Sagittal PDFS with Segmentation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: AI ANALYSIS */}
        {activeTab === 'ai-analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <Card className="lg:col-span-7" noPad>
              <CardHeader>
                <CardTitle>AI Biomarker Classification Engine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between">
                  <span className="font-semibold text-ds-1">Kellgren-Lawrence Grade</span>
                  <Badge variant={currentCase.oaGrade >= 3 ? 'danger' : 'warning'}>
                    Grade {currentCase.oaGrade} ({currentCase.oaStatus.split(' ')[0]})
                  </Badge>
                </div>
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between">
                  <span className="font-semibold text-ds-1">Joint Space Narrowing</span>
                  <span className="font-mono text-ds-2">Medial {currentCase.medialJSW} mm · Lateral {currentCase.lateralJSW} mm</span>
                </div>
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between">
                  <span className="font-semibold text-ds-1">Osteophyte Presence</span>
                  <span className="text-amber-600 font-medium">Definite Marginal & Tibial Spine</span>
                </div>
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds flex items-center justify-between">
                  <span className="font-semibold text-ds-1">Model Inference Confidence</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{currentCase.analysisConfidence}%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5" noPad>
              <CardHeader>
                <CardTitle>Safety & Diagnostic Rule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-ds-3">
                <div className="p-3 rounded-card bg-teal-500/10 border border-teal-500/20 text-teal-900 dark:text-teal-200">
                  <p className="font-bold mb-1">AI-assisted OA-related pattern detected</p>
                  <p className="text-[11px] text-teal-800 dark:text-teal-300">
                    Automated deep neural network findings provide clinical decision support. Requires clinical review before diagnostic confirmation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: MENISCUS ANALYSIS */}
        {activeTab === 'meniscus' && (
          <Card noPad>
            <CardHeader
              action={
                <Button variant="accent" size="sm" onClick={() => navigate('/meniscus')}>
                  Open Meniscus Workspace
                </Button>
              }
            >
              <CardTitle>Meniscus Regional Morphometrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                  <span className="text-[10px] text-ds-4 uppercase font-bold block">Anterior Horn</span>
                  <span className="text-xl font-bold text-ds-1 mt-1 block">{currentCase.meniscusAnterior} mm</span>
                </div>
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                  <span className="text-[10px] text-ds-4 uppercase font-bold block">Central Body</span>
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400 mt-1 block">{currentCase.meniscusCentral} mm</span>
                </div>
                <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                  <span className="text-[10px] text-ds-4 uppercase font-bold block">Posterior Horn</span>
                  <span className="text-xl font-bold text-coral-600 dark:text-coral-400 mt-1 block">{currentCase.meniscusPosterior} mm</span>
                </div>
                <div className="p-3 rounded-card bg-teal-500/10 border border-teal-500/30">
                  <span className="text-[10px] text-teal-800 dark:text-teal-300 uppercase font-bold block">Average</span>
                  <span className="text-xl font-bold text-teal-700 dark:text-teal-300 mt-1 block">{currentCase.meniscusAverage} mm</span>
                </div>
              </div>

              <div className="p-3 rounded-card bg-ds-surface-2 border border-ds text-xs">
                <span className="text-ds-4 text-[10px] uppercase font-bold block mb-1">Tear Morphology</span>
                <p className="text-ds-1 font-semibold">{currentCase.meniscusTearType}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 5: MEASUREMENTS */}
        {activeTab === 'measurements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono">
            <Card noPad>
              <CardHeader>
                <CardTitle>Distal Femur Resection Geometry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex justify-between p-2.5 rounded bg-ds-surface-2 border border-ds">
                  <span className="text-ds-4 font-sans">Mediolateral (ML):</span>
                  <span className="font-bold text-ds-1">{currentCase.femoralML} mm</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-ds-surface-2 border border-ds">
                  <span className="text-ds-4 font-sans">Anteroposterior (AP):</span>
                  <span className="font-bold text-ds-1">{currentCase.femoralAP} mm</span>
                </div>
              </CardContent>
            </Card>

            <Card noPad>
              <CardHeader>
                <CardTitle>Proximal Tibia Resection Geometry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex justify-between p-2.5 rounded bg-ds-surface-2 border border-ds">
                  <span className="text-ds-4 font-sans">Mediolateral (ML):</span>
                  <span className="font-bold text-ds-1">{currentCase.tibialML} mm</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-ds-surface-2 border border-ds">
                  <span className="text-ds-4 font-sans">Anteroposterior (AP):</span>
                  <span className="font-bold text-ds-1">{currentCase.tibialAP} mm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 6: IMPLANT PLANNING */}
        {activeTab === 'implant' && (
          <Card noPad>
            <CardHeader
              action={
                <Button variant="accent" size="sm" onClick={() => navigate('/implant-planning')}>
                  Open Implant Planning
                </Button>
              }
            >
              <CardTitle>Implant Fit Sizing Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-card bg-teal-500/10 border border-teal-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-300 block">Top Sizing Suggestion</span>
                  <span className="font-display text-lg font-bold text-ds-1">{currentCase.implantPlanning}</span>
                </div>
                <Badge variant="teal" size="md">
                  Ranked Recommendation
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 7: CLINICAL REVIEW */}
        {activeTab === 'review' && (
          <Card noPad>
            <CardHeader>
              <CardTitle>Attending Clinician Review & Sign-Off</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-3 rounded-card bg-ds-surface-2 border border-ds space-y-1">
                <span className="text-ds-4 text-[10px] uppercase font-bold block">Attending Reviewer</span>
                <p className="font-semibold text-ds-1">{currentCase.attendingPhysician}</p>
                <p className="text-ds-4 text-[11px]">Last verified: {currentCase.updated}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="accent" onClick={handleSignOff} leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                  Confirm Clinical Sign-Off
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 8: REPORTS */}
        {activeTab === 'reports' && (
          <Card noPad>
            <CardHeader
              action={
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => navigate(`/reports?id=${currentCase.id}`)}
                  leftIcon={<FileText className="w-4 h-4" />}
                >
                  Open Full Printable Report
                </Button>
              }
            >
              <CardTitle>Clinical Reports & Handoff</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <p className="text-ds-3">
                Pre-operative surgical templating and radiological assessment report available for case {currentCase.id}.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
