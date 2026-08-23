import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BarChart3,
  ScatterChart as ScatterIcon,
  Layers,
  Filter,
  TrendingDown,
  Info,
} from 'lucide-react';
import {
  COHORT_SCATTER_DATA,
  MOCK_MENISCUS_PATIENT,
  ScatterDataPoint,
} from '@/data/mockMeniscusData';
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
  ErrorBar,
} from 'recharts';

type AgeFilter = 'All' | '18–30' | '31–45' | '46–60' | '61–75' | '75+';
type SexFilter = 'All' | 'Male' | 'Female';
type StatusFilter = 'All' | 'OA' | 'Non-OA';
type ChartTab = 'comparison' | 'scatter' | 'distribution';

export function MeniscusComparisonCharts() {
  const [selectedTab, setSelectedTab] = useState<ChartTab>('comparison');
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('All');
  const [sexFilter, setSexFilter] = useState<SexFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  // Filtered scatter points
  const filteredScatter = useMemo(() => {
    return COHORT_SCATTER_DATA.filter((p) => {
      // Age filter
      if (ageFilter === '18–30' && (p.age < 18 || p.age > 30)) return false;
      if (ageFilter === '31–45' && (p.age < 31 || p.age > 45)) return false;
      if (ageFilter === '46–60' && (p.age < 46 || p.age > 60)) return false;
      if (ageFilter === '61–75' && (p.age < 61 || p.age > 75)) return false;
      if (ageFilter === '75+' && p.age < 75) return false;

      // Sex filter
      if (sexFilter !== 'All' && p.sex !== sexFilter) return false;

      // Status filter
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;

      return true;
    });
  }, [ageFilter, sexFilter, statusFilter]);

  // Primary 3-way comparison dataset (Patient: 4.76mm, OA Group: 4.28mm, Non-OA Group: 5.11mm)
  const comparisonData = [
    {
      group: 'Patient (KS-0241)',
      thickness: MOCK_MENISCUS_PATIENT.comparisons.patient,
      color: '#2EC4B6',
      subtext: 'Current MRI Analysis',
      error: 0.12,
    },
    {
      group: 'OA Cohort (n=132)',
      thickness: MOCK_MENISCUS_PATIENT.comparisons.oaGroup,
      color: '#F59E0B',
      subtext: 'KL Grades 1–4',
      error: 0.42,
    },
    {
      group: 'Non-OA Control (n=116)',
      thickness: MOCK_MENISCUS_PATIENT.comparisons.nonOaGroup,
      color: '#10B981',
      subtext: 'Healthy Control Norm',
      error: 0.38,
    },
  ];

  // Distribution histogram buckets
  const distributionData = [
    { range: '2.0–2.8 mm', count: 12, category: 'Severe Thinning' },
    { range: '2.9–3.6 mm', count: 24, category: 'Moderate Thinning' },
    { range: '3.7–4.4 mm', count: 48, category: 'Borderline' },
    { range: '4.5–5.2 mm', count: 72, category: 'Patient Range (4.76mm)', isPatient: true },
    { range: '5.3–6.0 mm', count: 56, category: 'Preserved' },
    { range: '6.1–6.8 mm', count: 18, category: 'Robust Thickness' },
  ];

  return (
    <Card className="flex flex-col" noPad>
      {/* ── CARD HEADER & VIEW TABS ── */}
      <div className="p-5 border-b border-ds flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-ds-surface-2/40">
        <div>
          <h3 className="font-display text-ds-h6 text-ds-1 font-bold">
            Cohort Comparative Analytics
          </h3>
          <p className="text-ds-caption text-ds-4 mt-0.5">
            Benchmarking patient against age/sex matched MSK osteoarthritis registries
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-input bg-ds-surface border border-ds self-start sm:self-auto">
          <button
            onClick={() => setSelectedTab('comparison')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              selectedTab === 'comparison'
                ? 'bg-teal-500 text-white shadow-xs'
                : 'text-ds-4 hover:text-ds-2'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>OA Comparison</span>
          </button>

          <button
            onClick={() => setSelectedTab('scatter')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              selectedTab === 'scatter'
                ? 'bg-teal-500 text-white shadow-xs'
                : 'text-ds-4 hover:text-ds-2'
            }`}
          >
            <ScatterIcon className="w-3.5 h-3.5" />
            <span>Age vs. Thickness</span>
          </button>

          <button
            onClick={() => setSelectedTab('distribution')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              selectedTab === 'distribution'
                ? 'bg-teal-500 text-white shadow-xs'
                : 'text-ds-4 hover:text-ds-2'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Distribution</span>
          </button>
        </div>
      </div>

      {/* ── INTERACTIVE FILTERS BAR ── */}
      <div className="px-5 py-3 border-b border-ds bg-ds-surface-2/20 flex flex-wrap items-center gap-4 text-xs">
        {/* Age filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-ds-4 font-medium">Age:</span>
          <div className="flex items-center gap-1">
            {(['All', '18–30', '31–45', '46–60', '61–75', '75+'] as AgeFilter[]).map((af) => (
              <button
                key={af}
                onClick={() => setAgeFilter(af)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  ageFilter === af
                    ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/40'
                    : 'bg-ds-surface text-ds-4 hover:text-ds-2 border border-ds'
                }`}
              >
                {af}
              </button>
            ))}
          </div>
        </div>

        {/* Sex filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-ds-4 font-medium">Sex:</span>
          <div className="flex items-center gap-1">
            {(['All', 'Male', 'Female'] as SexFilter[]).map((sf) => (
              <button
                key={sf}
                onClick={() => setSexFilter(sf)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  sexFilter === sf
                    ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/40'
                    : 'bg-ds-surface text-ds-4 hover:text-ds-2 border border-ds'
                }`}
              >
                {sf}
              </button>
            ))}
          </div>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-ds-4 font-medium">Status:</span>
          <div className="flex items-center gap-1">
            {(['All', 'OA', 'Non-OA'] as StatusFilter[]).map((stf) => (
              <button
                key={stf}
                onClick={() => setStatusFilter(stf)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === stf
                    ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/40'
                    : 'bg-ds-surface text-ds-4 hover:text-ds-2 border border-ds'
                }`}
              >
                {stf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CHART VIEWPORT ── */}
      <div className="p-5 flex-1 min-h-[310px]">
        {/* TAB 1: 3-WAY GROUP COMPARISON */}
        {selectedTab === 'comparison' && (
          <div className="h-full flex flex-col justify-between">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 20, bottom: 10, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis
                    dataKey="group"
                    tick={{ fontSize: 11, fill: '#7A8DAD', fontFamily: 'Inter' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[0, 6.5]}
                    tick={{ fontSize: 11, fill: '#7A8DAD', fontFamily: 'Inter' }}
                    tickLine={false}
                    axisLine={false}
                    unit=" mm"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">{d.group}</p>
                            <p className="font-mono text-sm font-bold">
                              Thickness: {d.thickness.toFixed(2)} mm
                            </p>
                            <p className="text-[11px] text-slate-300">{d.subtext}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={4.76}
                    stroke="#2EC4B6"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Patient: 4.76 mm',
                      position: 'right',
                      fill: '#2EC4B6',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}
                  />
                  <Bar dataKey="thickness" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={700}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Benchmark Legend */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-ds text-center text-xs">
              <div className="p-2 rounded bg-ds-surface-2">
                <span className="text-[10px] text-ds-4 block uppercase font-bold">Patient</span>
                <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">4.76 mm</span>
              </div>
              <div className="p-2 rounded bg-ds-surface-2">
                <span className="text-[10px] text-ds-4 block uppercase font-bold">OA Cohort</span>
                <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">4.28 mm</span>
              </div>
              <div className="p-2 rounded bg-ds-surface-2">
                <span className="text-[10px] text-ds-4 block uppercase font-bold">Non-OA Norm</span>
                <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">5.11 mm</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AGE VS THICKNESS SCATTER PLOT */}
        {selectedTab === 'scatter' && (
          <div className="h-full flex flex-col justify-between">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 15, right: 20, bottom: 10, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis
                    type="number"
                    dataKey="age"
                    name="Age"
                    domain={[18, 90]}
                    tick={{ fontSize: 11, fill: '#7A8DAD' }}
                    tickLine={false}
                    axisLine={false}
                    unit="y"
                  />
                  <YAxis
                    type="number"
                    dataKey="thickness"
                    name="Thickness"
                    domain={[2.0, 6.5]}
                    tick={{ fontSize: 11, fill: '#7A8DAD' }}
                    tickLine={false}
                    axisLine={false}
                    unit=" mm"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload as ScatterDataPoint;
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">
                              {d.isPatient ? '★ CURRENT PATIENT (KS-0241)' : `Case ${d.id}`}
                            </p>
                            <p className="font-mono">
                              Age: {d.age}y · Sex: {d.sex} · Status: {d.status}
                            </p>
                            <p className="font-mono font-bold text-white">
                              Meniscus Thickness: {d.thickness.toFixed(2)} mm
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {/* Scatter dots */}
                  <Scatter
                    data={filteredScatter}
                    isAnimationActive={true}
                    animationDuration={600}
                  >
                    {filteredScatter.map((entry, index) => (
                      <Cell
                        key={`scatter-${index}`}
                        fill={
                          entry.isPatient
                            ? '#2EC4B6'
                            : entry.status === 'OA'
                            ? '#F59E0B'
                            : '#10B981'
                        }
                        stroke={entry.isPatient ? '#FFFFFF' : 'none'}
                        strokeWidth={entry.isPatient ? 2 : 0}
                        r={entry.isPatient ? 7 : 4}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-ds text-xs text-ds-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400">
                  <span className="w-3 h-3 rounded-full bg-teal-500 border border-white" /> Patient KS-0241 (64y, 4.76mm)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> OA Cases
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Non-OA Controls
                </span>
              </div>
              <span>Filtered Sample Size: {filteredScatter.length}</span>
            </div>
          </div>
        )}

        {/* TAB 3: THICKNESS DISTRIBUTION HISTOGRAM */}
        {selectedTab === 'distribution' && (
          <div className="h-full flex flex-col justify-between">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData} margin={{ top: 15, right: 20, bottom: 10, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,19,43,0.06)" className="dark:stroke-slate-800" />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 10.5, fill: '#7A8DAD' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#7A8DAD' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="p-3 rounded-card bg-navy-900 border border-teal-500/30 text-white text-xs shadow-ds-e3 space-y-1">
                            <p className="font-bold text-teal-300">{d.range}</p>
                            <p className="font-mono">Count: {d.count} patients</p>
                            <p className="text-[11px] text-slate-300">{d.category}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[5, 5, 0, 0]} isAnimationActive={true}>
                    {distributionData.map((entry, index) => (
                      <Cell
                        key={`dist-${index}`}
                        fill={entry.isPatient ? '#2EC4B6' : '#64748B'}
                        fillOpacity={entry.isPatient ? 0.9 : 0.6}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-ds text-xs text-ds-4">
              <span>Patient resides in modal 4.5–5.2 mm bin (n=72)</span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">42nd Percentile</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
