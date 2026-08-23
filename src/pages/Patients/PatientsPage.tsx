import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  Wrench,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MOCK_CASE_LIST, CaseItem } from '@/data/mockCaseManagerData';

type FilterTab = 'all' | 'oa' | 'non-oa' | 'pending' | 'reviewed' | 'implant';

export function PatientsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Filtered cases
  const filteredCases = useMemo(() => {
    return MOCK_CASE_LIST.filter((c) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          c.id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.mrn.toLowerCase().includes(q) ||
          c.studyId.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Filter tabs
      if (activeTab === 'oa' && c.oaGrade === 0) return false;
      if (activeTab === 'non-oa' && c.oaGrade > 0) return false;
      if (activeTab === 'pending' && c.reviewStatus !== 'Pending Review' && c.reviewStatus !== 'Flagged for Audit') return false;
      if (activeTab === 'reviewed' && c.reviewStatus !== 'Reviewed') return false;
      if (activeTab === 'implant' && !c.implantIndicated) return false;

      return true;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="page-content space-y-6 pb-12">
      {/* ── HEADER & ACTIONS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ds pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
                  Clinical Case Management
                </h1>
                <Badge variant="teal" size="sm">
                  {filteredCases.length} Active Cases
                </Badge>
              </div>
              <p className="text-ds-small text-ds-4 mt-0.5">
                Multi-modality imaging intake, AI automated biomarker analysis, and pre-op surgical workflows
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/imaging')}
            leftIcon={<Layers className="w-4 h-4 text-teal-500" />}
          >
            Open Imaging
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => navigate('/reports')}
            leftIcon={<FileText className="w-4 h-4" />}
          >
            Clinical Reports
          </Button>
        </div>
      </div>

      {/* ── FILTER TABS & SEARCH BAR ── */}
      <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e1">
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-ds-surface-2/40">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            {[
              { key: 'all', label: 'All Cases' },
              { key: 'oa', label: 'OA Diagnosed' },
              { key: 'non-oa', label: 'Non-OA Control' },
              { key: 'pending', label: 'Pending Review' },
              { key: 'reviewed', label: 'Reviewed' },
              { key: 'implant', label: 'Implant Planning' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as FilterTab)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'bg-teal-500 text-white shadow-xs'
                    : 'bg-ds-surface text-ds-4 hover:text-ds-2 border border-ds'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, name, MRN, study…"
              leftIcon={<Search className="w-4 h-4 text-ds-4" />}
            />
          </div>
        </div>

        {/* ── CASE MANAGEMENT TABLE (9 Required Columns) ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-ds bg-ds-surface-2 text-ds-4 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-3">Age</th>
                <th className="py-3 px-3">Sex</th>
                <th className="py-3 px-3">Study</th>
                <th className="py-3 px-3">OA Status</th>
                <th className="py-3 px-3">Analysis</th>
                <th className="py-3 px-3">Implant Planning</th>
                <th className="py-3 px-3">Review Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-3 text-right"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-ds font-sans">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-ds-4">
                    No cases match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/patients/${c.id}`)}
                    className="hover:bg-ds-surface-2/70 transition-colors cursor-pointer group"
                  >
                    {/* 1. Case ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-600 dark:text-teal-400 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                          {c.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <span className="group-hover:underline">{c.id}</span>
                          <span className="block text-[11px] font-sans font-medium text-ds-1">
                            {c.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Age */}
                    <td className="py-3.5 px-3 font-mono text-ds-2 whitespace-nowrap">
                      {c.age}y
                    </td>

                    {/* 3. Sex */}
                    <td className="py-3.5 px-3 text-ds-3 whitespace-nowrap">
                      {c.sex}
                    </td>

                    {/* 4. Study */}
                    <td className="py-3.5 px-3 font-mono text-ds-3 whitespace-nowrap">
                      <div>
                        <span>{c.studyId}</span>
                        <span className="block text-[10px] text-ds-4">{c.affectedKnee} Knee</span>
                      </div>
                    </td>

                    {/* 5. OA Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <Badge
                        variant={
                          c.oaGrade >= 3
                            ? 'danger'
                            : c.oaGrade >= 2
                            ? 'warning'
                            : c.oaGrade === 1
                            ? 'info'
                            : 'success'
                        }
                        size="sm"
                      >
                        {c.oaStatus}
                      </Badge>
                    </td>

                    {/* 6. Analysis */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-ds-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-medium">{c.analysisStatus}</span>
                      </div>
                    </td>

                    {/* 7. Implant Planning */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {c.implantIndicated ? (
                        <div className="flex items-center gap-1.5 font-mono text-teal-600 dark:text-teal-400 font-semibold">
                          <Wrench className="w-3.5 h-3.5" />
                          <span>{c.implantPlanning}</span>
                        </div>
                      ) : (
                        <span className="text-ds-4 italic">Not Indicated</span>
                      )}
                    </td>

                    {/* 8. Review Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <Badge
                        variant={
                          c.reviewStatus === 'Reviewed'
                            ? 'success'
                            : c.reviewStatus === 'Flagged for Audit'
                            ? 'danger'
                            : 'warning'
                        }
                        size="sm"
                        dot
                      >
                        {c.reviewStatus}
                      </Badge>
                    </td>

                    {/* 9. Updated */}
                    <td className="py-3.5 px-4 text-ds-4 whitespace-nowrap font-mono text-[11px]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{c.updated}</span>
                      </div>
                    </td>

                    {/* Quick Chevron */}
                    <td className="py-3.5 px-3 text-right">
                      <ChevronRight className="w-4 h-4 text-ds-4 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all inline-block" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
