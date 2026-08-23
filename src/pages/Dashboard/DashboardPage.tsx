import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Activity,
  Ruler,
  Wrench,
  TrendingUp,
  TrendingDown,
  UploadCloud,
  Search,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight,
  Sparkles,
  Server,
  Layers,
  ScanLine,
  Cpu,
  HelpCircle,
  FileSpreadsheet,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { NewAnalysisModal } from '@/components/medical/NewAnalysisModal';
import { useAuth } from '@/hooks/useAuth';
import {
  MOCK_RECENT_ANALYSES,
  MENISCUS_DISTRIBUTION_DATA,
  OA_COMPARISON_METRICS,
  MOCK_IMPLANT_CASES,
  AI_SYSTEM_NODES,
  RecentAnalysisItem,
} from '@/data/mockWorkstationData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

/* ── Animation variants ── */
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
  },
};

type DistributionFilter = 'All' | 'OA' | 'Non-OA' | 'Male' | 'Female';
type AnalysisStatusFilter = 'All' | 'Review Required' | 'Completed' | 'Flagged';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newAnalysisOpen, setNewAnalysisOpen] = useState(false);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
  const [distFilter, setDistFilter] = useState<DistributionFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AnalysisStatusFilter>('All');
  const [selectedCaseModal, setSelectedCaseModal] = useState<RecentAnalysisItem | null>(null);

  // Greeting personalized for Dr. Sharma or logged-in clinician
  const clinicianName = user?.name ? user.name : 'Dr. Sharma';

  // Filtered recent analyses for Section A
  const filteredAnalyses = useMemo(() => {
    return MOCK_RECENT_ANALYSES.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.oaStatus.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || item.analysisStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Compute distribution data key based on filter
  const distributionData = useMemo(() => {
    return MENISCUS_DISTRIBUTION_DATA.map((bin) => {
      let count = bin.countAll;
      if (distFilter === 'OA') count = bin.countOA;
      else if (distFilter === 'Non-OA') count = bin.countNonOA;
      else if (distFilter === 'Male') count = bin.countMale;
      else if (distFilter === 'Female') count = bin.countFemale;

      return {
        ...bin,
        displayCount: count,
      };
    });
  }, [distFilter]);

  // Simulate skeleton reload
  const handleSimulateRefresh = () => {
    setIsLoadingSkeleton(true);
    setTimeout(() => setIsLoadingSkeleton(false), 600);
  };

  return (
    <div className="page-content space-y-6 pb-12">
      {/* ── TOP HEADER & WORKSTATION TITLE ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ds pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
              Good morning, {clinicianName}
            </h1>
            <Badge variant="teal" size="sm" dot>
              Workstation Online
            </Badge>
          </div>
          <p className="text-xs text-ds-3 font-medium mt-1">
            Clinical Imaging Overview · AI Diagnostic Pipeline Active
          </p>
        </div>

        {/* Top Actions: Upload Imaging / New Analysis */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSimulateRefresh}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoadingSkeleton ? 'animate-spin' : ''}`} />}
            title="Simulate workstation data refresh"
          >
            Refresh Feed
          </Button>

          <Button
            id="dashboard-new-analysis-btn"
            variant="accent"
            size="sm"
            onClick={() => navigate('/imaging/new')}
            leftIcon={<UploadCloud className="w-4 h-4" />}
            className="shadow-sm font-semibold"
          >
            Upload Imaging / New Analysis
          </Button>
        </div>
      </div>

      {/* ── KPI CARDS ROW (4 Cards with animated numbers & hover elevation) ── */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {/* Card 1: Total Cases */}
        <motion.div variants={itemVariant}>
          <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-ds-e1 hover:shadow-ds-e2 hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ds-4">
                Total Cases
              </span>
              <div className="w-8 h-8 rounded-input bg-teal-500/10 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl font-bold font-mono text-ds-1 leading-none tracking-tight">
              {isLoadingSkeleton ? (
                <div className="h-7 w-20 bg-ds-surface-2 rounded animate-pulse" />
              ) : (
                <AnimatedCounter value={248} durationMs={800} />
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 text-ds-caption">
              <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[11px]">
                <TrendingUp className="w-3 h-3" /> +14.2%
              </span>
              <span className="text-ds-4 text-[11px]">vs previous 30 days</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: OA Cases */}
        <motion.div variants={itemVariant}>
          <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-ds-e1 hover:shadow-ds-e2 hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ds-4">
                OA Cases
              </span>
              <div className="w-8 h-8 rounded-input bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl font-bold font-mono text-ds-1 leading-none tracking-tight">
              {isLoadingSkeleton ? (
                <div className="h-7 w-20 bg-ds-surface-2 rounded animate-pulse" />
              ) : (
                <AnimatedCounter value={132} durationMs={850} />
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 text-ds-caption">
              <span className="inline-flex items-center gap-0.5 font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded text-[11px]">
                53.2%
              </span>
              <span className="text-ds-4 text-[11px]">of patient cohort</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Mean Meniscus Thickness */}
        <motion.div variants={itemVariant}>
          <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-ds-e1 hover:shadow-ds-e2 hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ds-4">
                Mean Meniscus Thickness
              </span>
              <div className="w-8 h-8 rounded-input bg-teal-500/10 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Ruler className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl font-bold font-mono text-ds-1 leading-none tracking-tight">
              {isLoadingSkeleton ? (
                <div className="h-7 w-24 bg-ds-surface-2 rounded animate-pulse" />
              ) : (
                <AnimatedCounter value={4.76} decimals={2} suffix=" mm" durationMs={900} />
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 text-ds-caption">
              <span className="inline-flex items-center gap-0.5 font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded text-[11px]">
                ±0.42 mm
              </span>
              <span className="text-ds-4 text-[11px]">95% CI</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Implant Assessments */}
        <motion.div variants={itemVariant}>
          <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-ds-e1 hover:shadow-ds-e2 hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ds-4">
                Implant Assessments
              </span>
              <div className="w-8 h-8 rounded-input bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Wrench className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl font-bold font-mono text-ds-1 leading-none tracking-tight">
              {isLoadingSkeleton ? (
                <div className="h-7 w-20 bg-ds-surface-2 rounded animate-pulse" />
              ) : (
                <AnimatedCounter value={86} durationMs={950} />
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 text-ds-caption">
              <span className="inline-flex items-center gap-0.5 font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded text-[11px]">
                18 Pending
              </span>
              <span className="text-ds-4 text-[11px]">surgical signoffs</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── MAIN CONTENT: 12-COLUMN RESPONSIVE GRID ── */}
      <div className="grid grid-cols-12 gap-6">
        {/* ────────────────────────────────────────────────────────────
            SECTION A: Recent Analyses (12-col on mobile, 12 on lg or 7)
        ──────────────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-7 flex flex-col">
          <Card className="flex-1 flex flex-col" noPad>
            <div className="p-5 border-b border-ds flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-ds-h6 text-ds-1 font-bold">
                    Section A: Recent Clinical Analyses
                  </h3>
                  <Badge variant="teal" size="sm">
                    {filteredAnalyses.length} Cases
                  </Badge>
                </div>
                <p className="text-ds-caption text-ds-4 mt-0.5">
                  Automated joint space, OA grading, and meniscus integrity assessment
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-input bg-ds-surface-2 border border-ds self-start sm:self-auto">
                {(['All', 'Review Required', 'Completed', 'Flagged'] as AnalysisStatusFilter[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      statusFilter === tab
                        ? 'bg-ds-surface text-teal-600 dark:text-teal-400 shadow-xs font-semibold'
                        : 'text-ds-4 hover:text-ds-2'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Search */}
            <div className="px-5 py-2.5 border-b border-ds bg-ds-surface-2/40 flex items-center gap-2">
              <Search className="w-4 h-4 text-ds-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by Patient ID (e.g. KS-0241), name, or diagnosis…"
                className="w-full bg-transparent text-ds-small text-ds-1 placeholder:text-ds-4 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-ds-4 hover:text-ds-1 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-ds-small border-collapse">
                <thead>
                  <tr className="border-b border-ds bg-ds-surface-2/70 text-ds-4 font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Patient ID</th>
                    <th className="py-3 px-3">Age / Sex</th>
                    <th className="py-3 px-3">OA Status</th>
                    <th className="py-3 px-3">Meniscus Thickness</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Last Updated</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-ds">
                  {isLoadingSkeleton ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="py-3.5 px-4"><div className="h-4 w-16 bg-ds-surface-2 rounded" /></td>
                        <td className="py-3.5 px-3"><div className="h-4 w-12 bg-ds-surface-2 rounded" /></td>
                        <td className="py-3.5 px-3"><div className="h-4 w-24 bg-ds-surface-2 rounded" /></td>
                        <td className="py-3.5 px-3"><div className="h-4 w-16 bg-ds-surface-2 rounded" /></td>
                        <td className="py-3.5 px-3"><div className="h-4 w-20 bg-ds-surface-2 rounded" /></td>
                        <td className="py-3.5 px-3"><div className="h-4 w-14 bg-ds-surface-2 rounded" /></td>
                        <td className="py-3.5 px-4 text-right"><div className="h-4 w-10 bg-ds-surface-2 rounded ml-auto" /></td>
                      </tr>
                    ))
                  ) : filteredAnalyses.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-ds-3">
                        <div className="max-w-xs mx-auto space-y-2">
                          <p className="font-semibold text-ds-2">No matching patient analyses found</p>
                          <p className="text-ds-caption text-ds-4">
                            Try adjusting your search criteria or clear status filters.
                          </p>
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => {
                              setSearchQuery('');
                              setStatusFilter('All');
                            }}
                          >
                            Reset filters
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAnalyses.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-ds-surface-2/70 transition-colors duration-150 group cursor-pointer"
                        onClick={() => setSelectedCaseModal(item)}
                      >
                        {/* ID & Name */}
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-teal-600 dark:text-teal-400 group-hover:underline">
                            {item.id}
                          </div>
                          <div className="text-[11px] text-ds-4 truncate max-w-[110px]">
                            {item.patientName}
                          </div>
                        </td>

                        {/* Age & Sex */}
                        <td className="py-3.5 px-3 whitespace-nowrap text-ds-2">
                          {item.age}y <span className="text-ds-4">·</span> {item.sex[0]}
                        </td>

                        {/* OA Status */}
                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                              item.oaGrade >= 3
                                ? 'bg-coral-500/10 text-coral-600 dark:text-coral-400 border border-coral-500/20'
                                : item.oaGrade >= 1
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {item.oaStatus}
                          </span>
                        </td>

                        {/* Meniscus Thickness */}
                        <td className="py-3.5 px-3">
                          <div className="font-mono font-semibold text-ds-1">
                            {item.meniscusThickness.toFixed(2)} mm
                          </div>
                          <div className="text-[10px] text-ds-4">{item.meniscusStatus}</div>
                        </td>

                        {/* Analysis Status */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <Badge
                            variant={
                              item.analysisStatus === 'Completed'
                                ? 'success'
                                : item.analysisStatus === 'Review Required'
                                ? 'warning'
                                : item.analysisStatus === 'Flagged'
                                ? 'coral'
                                : 'info'
                            }
                            size="sm"
                            dot
                          >
                            {item.analysisStatus}
                          </Badge>
                        </td>

                        {/* Last Updated */}
                        <td className="py-3.5 px-3 text-[11px] text-ds-4 whitespace-nowrap">
                          {item.lastUpdated}
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={item.oaGrade >= 2 ? '/imaging' : '/meniscus'}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors p-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-ds bg-ds-surface-2/40 flex items-center justify-between text-ds-caption text-ds-4">
              <span>Showing {filteredAnalyses.length} of {MOCK_RECENT_ANALYSES.length} recent cases</span>
              <Link
                to="/imaging"
                className="font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                Open Full Imaging Workspace →
              </Link>
            </div>
          </Card>
        </div>

        {/* ────────────────────────────────────────────────────────────
            SECTION B: Meniscus Thickness Distribution (12-col mobile, 5 lg)
        ──────────────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-5 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader
              action={
                <Badge variant="teal" size="sm">
                  Mean: 4.76 mm
                </Badge>
              }
            >
              <CardTitle>Section B: Meniscus Thickness Distribution</CardTitle>
              <p className="text-ds-caption text-ds-4 mt-0.5">
                Cohort histogram with anatomical reference threshold
              </p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Interactive Category Filters */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                <span className="text-xs text-ds-4 font-medium mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filters:
                </span>
                {(['All', 'OA', 'Non-OA', 'Male', 'Female'] as DistributionFilter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setDistFilter(f)}
                    className={`px-2.5 py-1 rounded-btn text-xs font-semibold transition-all ${
                      distFilter === f
                        ? 'bg-teal-500 text-white shadow-xs'
                        : 'bg-ds-surface-2 text-ds-3 border border-ds hover:text-ds-1'
                    }`}
                  >
                    {f === 'All' ? 'All Cohort (248)' : f}
                  </button>
                ))}
              </div>

              {/* Recharts Chart with animated entrance */}
              <div className="flex-1 min-h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={distributionData}
                    margin={{ top: 12, right: 8, bottom: 4, left: -22 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(11,19,43,0.06)"
                      className="dark:stroke-slate-800"
                    />
                    <XAxis
                      dataKey="binRange"
                      tick={{ fontSize: 10, fill: '#7A8DAD', fontFamily: 'Inter' }}
                      interval={1}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#7A8DAD', fontFamily: 'Inter' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const isThin = data.thickness < 3.5;
                          return (
                            <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                              <p className="font-bold text-teal-300">{data.binRange}</p>
                              <p className="text-ds-1 font-mono">
                                Count: <span className="font-bold text-white">{data.displayCount} cases</span>
                              </p>
                              <p className="text-[11px] text-slate-300">
                                {isThin
                                  ? '⚠️ Severe Fibrocartilage Thinning'
                                  : '✅ Normal Anatomical Range'}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      x="4.6–5.0 mm"
                      stroke="#2EC4B6"
                      strokeDasharray="3 3"
                      label={{
                        value: 'Mean (4.76mm)',
                        position: 'top',
                        fill: '#2EC4B6',
                        fontSize: 10,
                        fontWeight: 'bold',
                      }}
                    />
                    <Bar
                      dataKey="displayCount"
                      name="Cases"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={true}
                      animationDuration={800}
                    >
                      {distributionData.map((entry, index) => {
                        const isSevere = entry.thickness < 3.0;
                        const isBorderline = entry.thickness >= 3.0 && entry.thickness < 4.0;
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              isSevere
                                ? '#EF4444'
                                : isBorderline
                                ? '#F59E0B'
                                : '#2EC4B6'
                            }
                            fillOpacity={0.85}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend Summary */}
              <div className="mt-3 pt-3 border-t border-ds flex items-center justify-between text-xs text-ds-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal (≥4.0mm)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Borderline (3.0-3.9mm)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-coral-500" /> Severe (&lt;3.0mm)
                  </span>
                </div>
                <Link to="/meniscus" className="text-teal-600 dark:text-teal-400 hover:underline">
                  Analyze MRI →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ────────────────────────────────────────────────────────────
            SECTION C: OA Comparison (Compare OA vs Non-OA group) (col 12 / lg 6)
        ──────────────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-6 flex flex-col">
          <Card className="flex-1">
            <CardHeader
              action={
                <Badge variant="warning" size="sm">
                  132 OA vs 116 Non-OA
                </Badge>
              }
            >
              <CardTitle>Section C: OA Cohort Comparison</CardTitle>
              <p className="text-ds-caption text-ds-4 mt-0.5">
                Quantitative differential analysis across primary MSK biomarkers
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center pb-2 border-b border-ds">
                <div className="p-2.5 rounded-card bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    OA Group (n=132)
                  </span>
                  <span className="text-ds-small font-medium text-ds-1">KL Grades 1 to 4</span>
                </div>
                <div className="p-2.5 rounded-card bg-teal-500/10 border border-teal-500/20">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                    Non-OA Control (n=116)
                  </span>
                  <span className="text-ds-small font-medium text-ds-1">KL Grade 0</span>
                </div>
              </div>

              {/* Comparative metric bars */}
              <div className="space-y-3.5">
                {OA_COMPARISON_METRICS.map((m) => (
                  <div key={m.metric} className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-ds-small font-semibold text-ds-1">{m.metric}</span>
                      <span className="font-mono text-xs font-bold text-coral-600 dark:text-coral-400 bg-coral-500/10 px-1.5 py-0.5 rounded">
                        {m.difference}
                      </span>
                    </div>

                    {/* Dual comparison value meters */}
                    <div className="grid grid-cols-2 gap-3 mb-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between text-amber-700 dark:text-amber-400">
                        <span>OA: <strong>{m.oaGroup} {m.unit}</strong></span>
                      </div>
                      <div className="flex items-center justify-between text-teal-700 dark:text-teal-400">
                        <span>Control: <strong>{m.nonOaGroup} {m.unit}</strong></span>
                      </div>
                    </div>

                    <p className="text-[11px] text-ds-4 italic">
                      {m.clinicalSignificance}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ────────────────────────────────────────────────────────────
            SECTION D: Recent Implant Planning (col 12 / lg 6)
        ──────────────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-6 flex flex-col">
          <Card className="flex-1 flex flex-col" noPad>
            <div className="p-5 border-b border-ds flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-ds-h6 text-ds-1 font-bold">
                    Section D: Recent Implant Planning
                  </h3>
                  <Badge variant="info" size="sm">
                    {MOCK_IMPLANT_CASES.length} Pre-Op
                  </Badge>
                </div>
                <p className="text-ds-caption text-ds-4 mt-0.5">
                  Femoral/tibial measurements & automated multi-vendor template matches
                </p>
              </div>

              <Link to="/implant-planning">
                <Button variant="ghost" size="xs" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                  Open Planner
                </Button>
              </Link>
            </div>

            <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[460px]">
              {MOCK_IMPLANT_CASES.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 rounded-panel bg-ds-surface-2 border border-ds hover:border-teal-500/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                          {plan.patientId}
                        </span>
                        <span className="font-semibold text-ds-small text-ds-1">
                          {plan.patientName} ({plan.age}y)
                        </span>
                        <span className="text-xs text-ds-4">· {plan.knee} Knee</span>
                      </div>
                      <p className="text-xs text-ds-3 font-medium mt-0.5">
                        {plan.recommendedImplant}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded block">
                        {plan.matchPercentage}% Match
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider mt-1 inline-block ${
                          plan.reviewStatus === 'Approved'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : plan.reviewStatus === 'Pending Review'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-coral-600 dark:text-coral-400'
                        }`}
                      >
                        {plan.reviewStatus}
                      </span>
                    </div>
                  </div>

                  {/* Measurements grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-card bg-ds-surface border border-ds text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-ds-4 uppercase block">Femoral AP/ML</span>
                      <span className="text-ds-1 font-semibold">{plan.femoralAP} / {plan.femoralML} mm</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ds-4 uppercase block">Tibial Base</span>
                      <span className="text-ds-1 font-semibold">{plan.tibialWidth} mm (Sl: {plan.tibialSlope}°)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ds-4 uppercase block">Resection Cut</span>
                      <span className="text-ds-1 font-semibold">{plan.tibialResection} mm @ {plan.femoralCutAngle}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-ds bg-ds-surface-2/40 flex items-center justify-between text-xs text-ds-4">
              <span>Automated 3D Sizing: Zimmer Biomet, Stryker, DePuy</span>
              <Link to="/implant-planning" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                Review Resections →
              </Link>
            </div>
          </Card>
        </div>

        {/* ────────────────────────────────────────────────────────────
            SECTION E: AI System Status (12-col full width)
        ──────────────────────────────────────────────────────────── */}
        <div className="col-span-12">
          <Card>
            <CardHeader
              action={
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    Cluster Status: HEALTHY
                  </span>
                </div>
              }
            >
              <CardTitle>Section E: AI Inference & System Engine Status</CardTitle>
              <p className="text-ds-caption text-ds-4 mt-0.5">
                Real-time health of clinical computer vision models and templating pipelines
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {AI_SYSTEM_NODES.map((node) => (
                  <div
                    key={node.name}
                    className="p-4 rounded-card bg-ds-surface-2 border border-ds flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-ds-small text-ds-1">{node.name}</h4>
                        <Badge
                          variant={
                            node.status === 'Operational'
                              ? 'success'
                              : node.status === 'Processing'
                              ? 'info'
                              : 'warning'
                          }
                          size="sm"
                          dot
                        >
                          {node.status}
                        </Badge>
                      </div>

                      <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium mb-1.5">
                        {node.category}
                      </p>

                      <p className="text-ds-caption text-ds-3 line-clamp-2">
                        {node.detail}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-ds flex items-center justify-between text-[11px] font-mono text-ds-4">
                      <span>Latency: <strong className="text-ds-2">{node.latency}</strong></span>
                      <span>{node.throughput}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── NEW ANALYSIS / UPLOAD MODAL ── */}
      <NewAnalysisModal
        isOpen={newAnalysisOpen}
        onClose={() => setNewAnalysisOpen(false)}
      />

      {/* ── CASE QUICK INSPECT MODAL (Triggered on table row click) ── */}
      {selectedCaseModal && (
        <div
          className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-ds-surface rounded-panel border border-ds shadow-ds-e3 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-ds pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-teal-600 dark:text-teal-400">
                    {selectedCaseModal.id}
                  </span>
                  <Badge
                    variant={selectedCaseModal.oaGrade >= 3 ? 'coral' : 'teal'}
                    size="sm"
                  >
                    {selectedCaseModal.oaStatus}
                  </Badge>
                </div>
                <h3 className="font-display text-ds-h5 text-ds-1 mt-1 font-bold">
                  {selectedCaseModal.patientName}
                </h3>
                <p className="text-ds-caption text-ds-4">
                  {selectedCaseModal.age} years old · {selectedCaseModal.sex} · {selectedCaseModal.knee} Knee
                </p>
              </div>
              <button
                onClick={() => setSelectedCaseModal(null)}
                className="p-1 rounded text-ds-4 hover:text-ds-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-ds-small font-mono">
              <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                <span className="text-[10px] text-ds-4 uppercase block">Meniscus Thickness</span>
                <span className="text-base font-bold text-ds-1">
                  {selectedCaseModal.meniscusThickness.toFixed(2)} mm
                </span>
                <span className="text-xs text-ds-3 block mt-0.5">
                  {selectedCaseModal.meniscusStatus}
                </span>
              </div>

              <div className="p-3 rounded-card bg-ds-surface-2 border border-ds">
                <span className="text-[10px] text-ds-4 uppercase block">AI Confidence Score</span>
                <span className="text-base font-bold text-teal-600 dark:text-teal-400">
                  {selectedCaseModal.confidence}%
                </span>
                <span className="text-xs text-ds-3 block mt-0.5">
                  Verified with Spatial Grounding
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-ds">
              <Button variant="ghost" onClick={() => setSelectedCaseModal(null)}>
                Close
              </Button>
              <Link to="/imaging">
                <Button variant="accent" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Open Radiograph Viewer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
