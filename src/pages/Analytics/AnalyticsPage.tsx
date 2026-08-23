import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Filter,
  Download,
  FileSpreadsheet,
  Info,
  Layers,
  Users,
  Activity,
  Ruler,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Sparkles,
  PieChart,
  Eye,
  Sliders,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { RESEARCH_COHORT, ResearchSubject } from '@/data/mockResearchCohortData';
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Legend,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
} from 'recharts';

type AgeRangeFilter = 'All' | '18–35' | '36–50' | '51–65' | '66+';
type SexFilter = 'All' | 'Male' | 'Female';
type OAStatusFilter = 'All' | 'OA' | 'Non-OA';
type ModalityFilter = 'All' | 'Weight-Bearing Radiograph' | '3.0T MRI' | 'Volumetric CT';
type StudyGroupFilter = 'All' | 'Cohort A (Longitudinal)' | 'Cohort B (Pre-Op TKA)' | 'Cohort C (Healthy Controls)';

export function AnalyticsPage() {
  const { success } = useToast();

  // Filters State
  const [ageRange, setAgeRange] = useState<AgeRangeFilter>('All');
  const [sex, setSex] = useState<SexFilter>('All');
  const [oaStatus, setOaStatus] = useState<OAStatusFilter>('All');
  const [modality, setModality] = useState<ModalityFilter>('All');
  const [studyGroup, setStudyGroup] = useState<StudyGroupFilter>('All');

  // Legend visibility toggles
  const [hiddenKeys, setHiddenKeys] = useState<Record<string, boolean>>({});

  const toggleLegendKey = (key: string) => {
    setHiddenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reset Filters
  const handleResetFilters = () => {
    setAgeRange('All');
    setSex('All');
    setOaStatus('All');
    setModality('All');
    setStudyGroup('All');
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return RESEARCH_COHORT.filter((p) => {
      // Age range
      if (ageRange === '18–35' && (p.age < 18 || p.age > 35)) return false;
      if (ageRange === '36–50' && (p.age < 36 || p.age > 50)) return false;
      if (ageRange === '51–65' && (p.age < 51 || p.age > 65)) return false;
      if (ageRange === '66+' && p.age < 66) return false;

      // Sex
      if (sex !== 'All' && p.sex !== sex) return false;

      // OA status
      if (oaStatus !== 'All' && p.oaStatus !== oaStatus) return false;

      // Modality
      if (modality !== 'All' && p.imagingType !== modality) return false;

      // Study group
      if (studyGroup !== 'All' && p.studyGroup !== studyGroup) return false;

      return true;
    });
  }, [ageRange, sex, oaStatus, modality, studyGroup]);

  // Statistical Summary Calculations
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { mean: 0, median: 0, min: 0, max: 0, stdDev: 0, count: 0 };
    }

    const thicknesses = filteredData.map((d) => d.meniscusThickness).sort((a, b) => a - b);
    const sum = thicknesses.reduce((acc, val) => acc + val, 0);
    const mean = sum / thicknesses.length;

    const mid = Math.floor(thicknesses.length / 2);
    const median =
      thicknesses.length % 2 !== 0
        ? thicknesses[mid]
        : (thicknesses[mid - 1] + thicknesses[mid]) / 2;

    const min = thicknesses[0];
    const max = thicknesses[thicknesses.length - 1];

    const variance =
      thicknesses.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / thicknesses.length;
    const stdDev = Math.sqrt(variance);

    return {
      mean: Number(mean.toFixed(2)),
      median: Number(median.toFixed(2)),
      min: Number(min.toFixed(2)),
      max: Number(max.toFixed(2)),
      stdDev: Number(stdDev.toFixed(2)),
      count: filteredData.length,
    };
  }, [filteredData]);

  // 1. Meniscus Thickness Distribution Buckets
  const thicknessDistribution = useMemo(() => {
    const bins = [
      { range: '1.5–2.5 mm', min: 1.5, max: 2.5, count: 0, severity: 'Severe Thinning' },
      { range: '2.6–3.5 mm', min: 2.6, max: 3.5, count: 0, severity: 'Moderate Thinning' },
      { range: '3.6–4.5 mm', min: 3.6, max: 4.5, count: 0, severity: 'Borderline' },
      { range: '4.6–5.5 mm', min: 4.6, max: 5.5, count: 0, severity: 'Preserved (Normal)' },
      { range: '5.6–6.5 mm', min: 5.6, max: 6.5, count: 0, severity: 'Robust Thickness' },
    ];

    filteredData.forEach((d) => {
      const b = bins.find((bin) => d.meniscusThickness >= bin.min && d.meniscusThickness <= bin.max);
      if (b) b.count += 1;
    });

    return bins;
  }, [filteredData]);

  // 2. OA vs Non-OA Comparison
  const oaVsNonOaData = useMemo(() => {
    const oaSubjects = filteredData.filter((d) => d.oaStatus === 'OA');
    const nonOaSubjects = filteredData.filter((d) => d.oaStatus === 'Non-OA');

    const oaMean =
      oaSubjects.length > 0
        ? Number((oaSubjects.reduce((a, b) => a + b.meniscusThickness, 0) / oaSubjects.length).toFixed(2))
        : 0;

    const nonOaMean =
      nonOaSubjects.length > 0
        ? Number((nonOaSubjects.reduce((a, b) => a + b.meniscusThickness, 0) / nonOaSubjects.length).toFixed(2))
        : 0;

    return [
      {
        category: 'OA Cohort (KL 1–4)',
        meanThickness: oaMean,
        count: oaSubjects.length,
        color: '#F59E0B',
      },
      {
        category: 'Non-OA Control (KL 0)',
        meanThickness: nonOaMean,
        count: nonOaSubjects.length,
        color: '#10B981',
      },
    ];
  }, [filteredData]);

  // 3. Age vs Meniscus Thickness Scatter
  const ageScatterData = useMemo(() => {
    return filteredData.map((d) => ({
      id: d.id,
      age: d.age,
      thickness: d.meniscusThickness,
      sex: d.sex,
      status: d.oaStatus,
    }));
  }, [filteredData]);

  // 4. Male vs Female Anatomical Comparison
  const sexComparisonData = useMemo(() => {
    const males = filteredData.filter((d) => d.sex === 'Male');
    const females = filteredData.filter((d) => d.sex === 'Female');

    const avg = (arr: ResearchSubject[], key: keyof ResearchSubject) =>
      arr.length > 0
        ? Number((arr.reduce((sum, item) => sum + (Number(item[key]) || 0), 0) / arr.length).toFixed(1))
        : 0;

    return [
      {
        metric: 'Femoral ML (mm)',
        Male: avg(males, 'femoralML'),
        Female: avg(females, 'femoralML'),
      },
      {
        metric: 'Femoral AP (mm)',
        Male: avg(males, 'femoralAP'),
        Female: avg(females, 'femoralAP'),
      },
      {
        metric: 'Tibial ML (mm)',
        Male: avg(males, 'tibialML'),
        Female: avg(females, 'tibialML'),
      },
      {
        metric: 'Meniscus (x10 mm)',
        Male: Number((avg(males, 'meniscusThickness') * 10).toFixed(1)),
        Female: Number((avg(females, 'meniscusThickness') * 10).toFixed(1)),
      },
    ];
  }, [filteredData]);

  // 5. Femoral Measurement Distribution (ML & AP ranges)
  const femoralDistData = useMemo(() => {
    const ranges = [
      { range: '64–68 mm', mlCount: 0, apCount: 0 },
      { range: '69–73 mm', mlCount: 0, apCount: 0 },
      { range: '74–78 mm', mlCount: 0, apCount: 0 },
      { range: '79–83 mm', mlCount: 0, apCount: 0 },
    ];

    filteredData.forEach((d) => {
      if (d.femoralML <= 68) ranges[0].mlCount++;
      else if (d.femoralML <= 73) ranges[1].mlCount++;
      else if (d.femoralML <= 78) ranges[2].mlCount++;
      else ranges[3].mlCount++;

      if (d.femoralAP <= 64) ranges[0].apCount++;
      else if (d.femoralAP <= 68) ranges[1].apCount++;
      else if (d.femoralAP <= 72) ranges[2].apCount++;
      else ranges[3].apCount++;
    });

    return ranges;
  }, [filteredData]);

  // 6. Tibial Measurement Distribution
  const tibialDistData = useMemo(() => {
    const ranges = [
      { range: '62–67 mm', count: 0 },
      { range: '68–73 mm', count: 0 },
      { range: '74–79 mm', count: 0 },
      { range: '80–85 mm', count: 0 },
    ];

    filteredData.forEach((d) => {
      if (d.tibialML <= 67) ranges[0].count++;
      else if (d.tibialML <= 73) ranges[1].count++;
      else if (d.tibialML <= 79) ranges[2].count++;
      else ranges[3].count++;
    });

    return ranges;
  }, [filteredData]);

  // 7. Implant Size Distribution
  const implantDistData = useMemo(() => {
    const sizes = ['Size 3', 'Size 4', 'Size 5', 'Size 6', 'Size 7'];
    return sizes.map((s) => {
      const matches = filteredData.filter((d) => d.recommendedImplantSize === s);
      const avgScore =
        matches.length > 0
          ? Number((matches.reduce((a, b) => a + b.implantMatchScore, 0) / matches.length).toFixed(1))
          : 0;

      return {
        size: s,
        count: matches.length,
        avgMatchScore: avgScore,
      };
    });
  }, [filteredData]);

  // Exports simulation
  const handleExportCSV = () => {
    success('Dataset Exported', `Downloaded ${filteredData.length} records in research CSV format.`);
  };

  const handleExportFigures = () => {
    success('Figures Exported', 'High-resolution visualization charts exported for publication.');
  };

  return (
    <div className="page-content space-y-6 pb-12">
      {/* ── HEADER & ACTIONS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ds pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
                  Research Analytics
                </h1>
                <Badge variant="teal" size="sm">
                  Descriptive analysis
                </Badge>
                <Badge variant="outline" size="sm">
                  Demo dataset
                </Badge>
              </div>
              <p className="text-ds-small text-ds-4 mt-0.5">
                Explore anonymized multi-parametric MSK knee cohort observations and distribution models
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4 text-teal-500" />}
          >
            Export CSV Dataset
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportFigures}
            leftIcon={<FileSpreadsheet className="w-4 h-4 text-ds-3" />}
          >
            Export Figures
          </Button>
        </div>
      </div>

      {/* ── RESEARCH DISCLAIMER BANNER ── */}
      <div className="p-3.5 rounded-panel bg-teal-500/10 border border-teal-500/20 text-teal-900 dark:text-teal-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
          <span>
            <strong>Research Notice:</strong> Research analytics shown here use anonymized demonstration data. Numerical metrics reflect observational distributions within this sample population.
          </span>
        </div>
        <span className="font-mono font-bold text-teal-700 dark:text-teal-300 hidden md:inline">
          N = 248 Total Registry
        </span>
      </div>

      {/* ── MULTI-DIMENSIONAL FILTER BAR ── */}
      <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e1">
        <div className="p-4 border-b border-ds bg-ds-surface-2/60 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-ds-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-teal-500" /> Dynamic Cohort Filter Controls
          </span>
          <Button variant="ghost" size="xs" onClick={handleResetFilters} leftIcon={<RefreshCw className="w-3 h-3" />}>
            Reset Filters
          </Button>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* 1. Age Range */}
          <div>
            <span className="text-[10px] uppercase font-bold text-ds-4 block mb-1.5">Age Range</span>
            <div className="flex flex-wrap gap-1">
              {(['All', '18–35', '36–50', '51–65', '66+'] as AgeRangeFilter[]).map((ar) => (
                <button
                  key={ar}
                  onClick={() => setAgeRange(ar)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    ageRange === ar
                      ? 'bg-teal-500 text-white font-bold shadow-xs'
                      : 'bg-ds-surface-2 text-ds-4 hover:text-ds-2 border border-ds'
                  }`}
                >
                  {ar}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Sex */}
          <div>
            <span className="text-[10px] uppercase font-bold text-ds-4 block mb-1.5">Sex</span>
            <div className="flex gap-1">
              {(['All', 'Male', 'Female'] as SexFilter[]).map((sf) => (
                <button
                  key={sf}
                  onClick={() => setSex(sf)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    sex === sf
                      ? 'bg-teal-500 text-white font-bold shadow-xs'
                      : 'bg-ds-surface-2 text-ds-4 hover:text-ds-2 border border-ds'
                  }`}
                >
                  {sf}
                </button>
              ))}
            </div>
          </div>

          {/* 3. OA Status */}
          <div>
            <span className="text-[10px] uppercase font-bold text-ds-4 block mb-1.5">OA Status</span>
            <div className="flex gap-1">
              {(['All', 'OA', 'Non-OA'] as OAStatusFilter[]).map((oaf) => (
                <button
                  key={oaf}
                  onClick={() => setOaStatus(oaf)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    oaStatus === oaf
                      ? 'bg-teal-500 text-white font-bold shadow-xs'
                      : 'bg-ds-surface-2 text-ds-4 hover:text-ds-2 border border-ds'
                  }`}
                >
                  {oaf}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Modality */}
          <div>
            <span className="text-[10px] uppercase font-bold text-ds-4 block mb-1.5">Imaging Type</span>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value as ModalityFilter)}
              className="w-full h-8 rounded-input px-2 bg-ds-surface border border-ds text-ds-1 text-xs focus:border-teal-500 outline-none cursor-pointer"
            >
              <option value="All">All Modalities</option>
              <option value="Weight-Bearing Radiograph">Weight-Bearing Radiograph</option>
              <option value="3.0T MRI">3.0T MRI</option>
              <option value="Volumetric CT">Volumetric CT</option>
            </select>
          </div>

          {/* 5. Study Group */}
          <div>
            <span className="text-[10px] uppercase font-bold text-ds-4 block mb-1.5">Study Cohort</span>
            <select
              value={studyGroup}
              onChange={(e) => setStudyGroup(e.target.value as StudyGroupFilter)}
              className="w-full h-8 rounded-input px-2 bg-ds-surface border border-ds text-ds-1 text-xs focus:border-teal-500 outline-none cursor-pointer"
            >
              <option value="All">All Cohorts</option>
              <option value="Cohort A (Longitudinal)">Cohort A (Longitudinal)</option>
              <option value="Cohort B (Pre-Op TKA)">Cohort B (Pre-Op TKA)</option>
              <option value="Cohort C (Healthy Controls)">Cohort C (Healthy Controls)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* ── DESCRIPTIVE SUMMARY STATISTICS STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-xs">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">Sample Size (N)</span>
          <span className="font-mono text-2xl font-bold text-teal-600 dark:text-teal-400 mt-1 block">
            {stats.count}
          </span>
          <span className="text-[11px] text-ds-4">{((stats.count / RESEARCH_COHORT.length) * 100).toFixed(0)}% of dataset</span>
        </div>

        <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-xs">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">Mean Thickness</span>
          <span className="font-mono text-2xl font-bold text-ds-1 mt-1 block">
            {stats.mean} <span className="text-xs font-normal text-ds-4">mm</span>
          </span>
          <span className="text-[11px] text-ds-4">Descriptive mean</span>
        </div>

        <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-xs">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">Median Value</span>
          <span className="font-mono text-2xl font-bold text-ds-1 mt-1 block">
            {stats.median} <span className="text-xs font-normal text-ds-4">mm</span>
          </span>
          <span className="text-[11px] text-ds-4">50th percentile</span>
        </div>

        <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-xs">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">Min Thickness</span>
          <span className="font-mono text-2xl font-bold text-coral-600 dark:text-coral-400 mt-1 block">
            {stats.min} <span className="text-xs font-normal text-ds-4">mm</span>
          </span>
          <span className="text-[11px] text-ds-4">Severe degradation</span>
        </div>

        <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-xs">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">Max Thickness</span>
          <span className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {stats.max} <span className="text-xs font-normal text-ds-4">mm</span>
          </span>
          <span className="text-[11px] text-ds-4">Preserved baseline</span>
        </div>

        <div className="p-4 rounded-panel bg-ds-surface border border-ds shadow-xs">
          <span className="text-[10px] text-ds-4 uppercase font-bold tracking-wider block">Std Deviation (σ)</span>
          <span className="font-mono text-2xl font-bold text-ds-1 mt-1 block">
            ±{stats.stdDev} <span className="text-xs font-normal text-ds-4">mm</span>
          </span>
          <span className="text-[11px] text-ds-4">Population variance</span>
        </div>
      </div>

      {/* ── 7 RESEARCH RECHARTS VISUALIZATIONS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ─────────────────────────────────────────────────────────────
            CHART 1: Meniscus Thickness Distribution (6-Col)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader
              action={
                <Badge variant="teal" size="sm">
                  Mean: {stats.mean} mm
                </Badge>
              }
            >
              <CardTitle>1. Meniscus Thickness Distribution</CardTitle>
              <p className="text-ds-caption text-ds-4">
                Categorical distribution of medial horn thickness measurements
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={thicknessDistribution} margin={{ top: 10, right: 10, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis dataKey="range" tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">{d.range}</p>
                            <p className="font-mono text-sm">Count: {d.count} patients</p>
                            <p className="text-[11px] text-slate-300">{d.severity}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} isAnimationActive={true}>
                    {thicknessDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index < 2 ? '#EF4444' : index === 2 ? '#F59E0B' : '#2EC4B6'}
                        fillOpacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CHART 2: OA vs Non-OA Comparison (6-Col)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader
              action={
                <Badge variant="warning" size="sm">
                  Comparative Delta
                </Badge>
              }
            >
              <CardTitle>2. OA vs Non-OA Group Comparison</CardTitle>
              <p className="text-ds-caption text-ds-4">
                Mean meniscus thickness across symptomatic OA and healthy control cohorts
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={oaVsNonOaData} margin={{ top: 10, right: 20, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 6.5]} tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} unit=" mm" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">{d.category}</p>
                            <p className="font-mono text-sm">Mean Thickness: {d.meanThickness} mm</p>
                            <p className="text-[11px] text-slate-300">Sample: {d.count} cases</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="meanThickness" radius={[6, 6, 0, 0]} isAnimationActive={true}>
                    {oaVsNonOaData.map((entry, index) => (
                      <Cell key={`cell-oa-${index}`} fill={entry.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CHART 3: Age vs Meniscus Thickness Scatter (12-Col)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-12 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader
              action={
                <span className="text-xs text-ds-4 font-mono">
                  {ageScatterData.length} Data Points
                </span>
              }
            >
              <CardTitle>3. Age vs Meniscus Thickness Distribution</CardTitle>
              <p className="text-ds-caption text-ds-4">
                Cross-sectional relationship between subject age and measured cartilage thickness
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 15, right: 20, bottom: 10, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis type="number" dataKey="age" name="Age" domain={[18, 90]} tick={{ fontSize: 10.5, fill: '#7A8DAD' }} unit="y" tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="thickness" name="Thickness" domain={[1.5, 6.8]} tick={{ fontSize: 10.5, fill: '#7A8DAD' }} unit=" mm" tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">Case ID: {d.id}</p>
                            <p className="font-mono">Age: {d.age}y · Sex: {d.sex} · Status: {d.status}</p>
                            <p className="font-mono text-sm font-bold text-white">
                              Meniscus: {d.thickness} mm
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter data={ageScatterData} isAnimationActive={true}>
                    {ageScatterData.map((entry, index) => (
                      <Cell
                        key={`cell-scatter-${index}`}
                        fill={entry.status === 'OA' ? '#F59E0B' : '#10B981'}
                        r={4}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>

              <div className="flex items-center justify-between pt-2 border-t border-ds text-xs text-ds-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> OA Cases (n={ageScatterData.filter(d=>d.status==='OA').length})</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Non-OA Controls (n={ageScatterData.filter(d=>d.status==='Non-OA').length})</span>
                </div>
                <span>Hover data points to inspect individual patient observations</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CHART 4: Male vs Female Comparison (6-Col)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>4. Male vs Female Morphometric Comparison</CardTitle>
              <p className="text-ds-caption text-ds-4">
                Average anatomical dimensions categorized by biological sex
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sexComparisonData} margin={{ top: 10, right: 20, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis dataKey="metric" tick={{ fontSize: 10, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">{payload[0]?.payload?.metric}</p>
                            <p className="font-mono text-blue-300">Male: {payload[0]?.value}</p>
                            <p className="font-mono text-teal-300">Female: {payload[1]?.value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    onClick={(e) => toggleLegendKey(e.dataKey as string)}
                    wrapperStyle={{ cursor: 'pointer', fontSize: '11px', paddingTop: '8px' }}
                  />
                  {!hiddenKeys['Male'] && <Bar dataKey="Male" fill="#3B82F6" radius={[4, 4, 0, 0]} />}
                  {!hiddenKeys['Female'] && <Bar dataKey="Female" fill="#2EC4B6" radius={[4, 4, 0, 0]} />}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CHART 5: Femoral Measurement Distribution (6-Col)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>5. Femoral Measurement Distribution</CardTitle>
              <p className="text-ds-caption text-ds-4">
                Mediolateral (ML) vs Anteroposterior (AP) femoral dimension frequencies
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={femoralDistData} margin={{ top: 10, right: 20, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis dataKey="range" tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Legend
                    onClick={(e) => toggleLegendKey(e.dataKey as string)}
                    wrapperStyle={{ cursor: 'pointer', fontSize: '11px', paddingTop: '8px' }}
                  />
                  {!hiddenKeys['mlCount'] && <Bar dataKey="mlCount" name="Femoral ML" fill="#2EC4B6" radius={[4, 4, 0, 0]} />}
                  {!hiddenKeys['apCount'] && <Bar dataKey="apCount" name="Femoral AP" fill="#64748B" radius={[4, 4, 0, 0]} />}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CHART 6: Tibial Measurement Distribution (6-Col)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>6. Tibial Plateau Width Distribution</CardTitle>
              <p className="text-ds-caption text-ds-4">
                Proximal tibial mediolateral width distribution across cohort
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tibialDistData} margin={{ top: 10, right: 20, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" name="Patients" fill="#0EA5E9" radius={[5, 5, 0, 0]} isAnimationActive={true} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CHART 7: Implant Size Distribution (6-Col)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader
              action={
                <Badge variant="teal" size="sm">
                  Sizes 3–7
                </Badge>
              }
            >
              <CardTitle>7. Implant Sizing Distribution & Match Scores</CardTitle>
              <p className="text-ds-caption text-ds-4">
                Automated pre-operative implant size recommendations and average fit accuracy
              </p>
            </CardHeader>

            <CardContent className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={implantDistData} margin={{ top: 10, right: 20, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis dataKey="size" tick={{ fontSize: 11, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10.5, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">{d.size}</p>
                            <p className="font-mono">Count: {d.count} patients</p>
                            <p className="font-mono text-emerald-400">Avg Match Score: {d.avgMatchScore}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" name="Case Count" fill="#2EC4B6" radius={[4, 4, 0, 0]} isAnimationActive={true} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
