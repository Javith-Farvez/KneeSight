import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, ScanLine, Brain, AlertTriangle, CheckCircle2, Info,
  Download, Plus, Trash2, ChevronRight, Settings, Eye, MoreVertical,
  Filter, Search, Star, Clipboard, RefreshCw
} from 'lucide-react';

import { Button, IconButton } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge, StatusIndicator } from '@/components/ui/Badge';
import { Input, Select, Checkbox } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Tabs, TabPanel, useTabs } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Modal';
import {
  Skeleton, SkeletonCard, SkeletonRow, SkeletonText,
  Progress, EmptyState, ErrorState, Tooltip, Dropdown
} from '@/components/ui/Skeleton';
import { DataTable } from '@/components/ui/DataTable';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

/* ── Section wrapper ── */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-ds-surface-2 border-t border-ds" />
        <h2 className="text-ds-label uppercase tracking-widest text-ds-3 whitespace-nowrap font-semibold">{title}</h2>
        <div className="h-px flex-1 bg-ds-surface-2 border-t border-ds" />
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <p className="text-ds-caption font-mono text-ds-4 mb-3">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ── Demo patient data for DataTable ── */
const tableData = [
  { id: 'PT-10492', name: 'Eleanor Vance', age: 64, knee: 'Right', kl: 'Grade 3', status: 'Pre-Op Planning' },
  { id: 'PT-20914', name: 'Marcus Brody',  age: 58, knee: 'Left',  kl: 'Grade 2', status: 'Conservative Mgmt.' },
  { id: 'PT-39108', name: 'Sophia Chen',   age: 71, knee: 'Right', kl: 'Grade 4', status: 'Pre-Op Planning' },
  { id: 'PT-48201', name: 'David Kowalski',age: 49, knee: 'Left',  kl: 'Grade 1', status: 'Under Review' },
];

const klVariantMap: Record<string, 'success' | 'teal' | 'warning' | 'coral' | 'danger'> = {
  'Grade 0': 'success', 'Grade 1': 'teal', 'Grade 2': 'warning', 'Grade 3': 'coral', 'Grade 4': 'danger',
};

export function DesignSystemPage() {
  const modal = useDisclosure();
  const drawer = useDisclosure();
  const { success, warning, error, info } = useToast();
  const { activeTab, setActiveTab } = useTabs('buttons');

  const [switchVal, setSwitchVal] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [checkVal, setCheckVal] = useState(false);
  const [progress, setProgress] = useState(68);

  const tabs = [
    { id: 'buttons', label: 'Buttons & Icons' },
    { id: 'inputs',  label: 'Inputs & Controls' },
    { id: 'data',    label: 'Data Display' },
    { id: 'overlay', label: 'Overlays' },
    { id: 'feedback',label: 'Feedback' },
    { id: 'typography', label: 'Typography' },
    { id: 'tokens',  label: 'Tokens' },
  ];

  const navTabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs',  label: 'Inputs' },
    { id: 'data',    label: 'Data' },
    { id: 'overlay', label: 'Overlays' },
    { id: 'feedback',label: 'Feedback' },
    { id: 'typography', label: 'Type' },
    { id: 'tokens',  label: 'Tokens' },
  ];

  return (
    <div className="min-h-screen bg-ds-bg">
      {/* Page header */}
      <div className="bg-ds-surface border-b border-ds sticky top-0 z-10">
        <div className="page-content py-0">
          <div className="flex items-center justify-between py-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Activity className="w-4 h-4 text-teal-500" />
                <span className="text-ds-caption font-mono text-ds-3">KneeSight AI</span>
                <span className="text-ds-4">/</span>
                <span className="text-ds-caption font-mono text-teal-500">design-system</span>
              </div>
              <h1 className="font-display text-ds-h4 text-ds-1">Component Showcase</h1>
            </div>
            <Badge variant="teal" size="md">v1.0 · Phase 1</Badge>
          </div>
          <Tabs tabs={navTabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />
        </div>
      </div>

      <div className="page-content space-y-14 pt-10 pb-20">

        {/* ────────────────────── BUTTONS ────────────────────── */}
        <TabPanel tabId="buttons" activeTab={activeTab}>
          <Section title="Buttons" id="buttons">
            <Row label="variant=primary | secondary | accent | ghost | danger">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent (Teal)</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </Row>

            <Row label="size=xs | sm | md | lg">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Row>

            <Row label="With icons">
              <Button leftIcon={<Download className="w-4 h-4" />}>Download Report</Button>
              <Button variant="accent" leftIcon={<Brain className="w-4 h-4" />}>Run AI Analysis</Button>
              <Button variant="secondary" rightIcon={<ChevronRight className="w-4 h-4" />}>Continue</Button>
              <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>Delete Case</Button>
            </Row>

            <Row label="loading state">
              <Button loading>Processing…</Button>
              <Button variant="accent" loading>Analyzing</Button>
              <Button variant="secondary" loading>Loading</Button>
            </Row>

            <Row label="disabled state">
              <Button disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
              <Button variant="accent" disabled>Disabled Accent</Button>
            </Row>

            <Row label="IconButton">
              <IconButton icon={<Settings className="w-4 h-4" />} label="Settings" variant="ghost" />
              <IconButton icon={<Plus className="w-4 h-4" />} label="Add patient" variant="secondary" />
              <IconButton icon={<RefreshCw className="w-4 h-4" />} label="Refresh" variant="ghost" size="lg" />
              <IconButton icon={<Eye className="w-4 h-4" />} label="View" variant="secondary" size="sm" />
            </Row>
          </Section>
        </TabPanel>

        {/* ────────────────────── INPUTS ────────────────────── */}
        <TabPanel tabId="inputs" activeTab={activeTab}>
          <Section title="Inputs & Controls" id="inputs">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Default" placeholder="Enter value…" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
              <Input label="With left icon" placeholder="Search patients…" leftIcon={<Search className="w-4 h-4" />} />
              <Input label="Success state" inputState="success" successText="MRN verified successfully." value="MRN-894-0129" readOnly />
              <Input label="Error state" inputState="error" errorText="Required field — please enter patient MRN." value="" />
              <Input label="Loading state" inputState="loading" value="Validating…" readOnly />
              <Input label="Disabled" disabled placeholder="Not editable" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-5">
              <Select
                label="Affected Knee"
                options={[
                  { value: 'right', label: 'Right Knee' },
                  { value: 'left', label: 'Left Knee' },
                  { value: 'bilateral', label: 'Bilateral' },
                ]}
                placeholder="Select laterality…"
                fullWidth
              />
              <Select
                label="KL Grade Filter"
                options={[0,1,2,3,4].map((g) => ({ value: String(g), label: `Grade ${g}` }))}
                placeholder="All grades"
                fullWidth
              />
            </div>

            <Row label="Checkboxes">
              <Checkbox label="Include post-operative cases" description="Show patients with completed TKA/UKA procedures" checked={checkVal} onChange={(e) => setCheckVal(e.target.checked)} />
            </Row>

            <Row label="Switches — size=md | sm">
              <Switch checked={switchVal} onChange={setSwitchVal} label="AI Analysis Notifications" description="Receive alerts for completed assessments" />
              <Switch checked={!switchVal} onChange={(v) => setSwitchVal(!v)} label="Compact Mode" size="sm" />
              <Switch checked={false} onChange={() => {}} label="Disabled Switch" disabled />
            </Row>
          </Section>
        </TabPanel>

        {/* ────────────────────── DATA ────────────────────── */}
        <TabPanel tabId="data" activeTab={activeTab}>
          <Section title="Badges & Status" id="badges">
            <Row label="variant=default | teal | navy | coral | success | warning | danger | info | outline">
              <Badge>Default</Badge>
              <Badge variant="teal">Teal</Badge>
              <Badge variant="navy">Navy</Badge>
              <Badge variant="coral">Coral</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </Row>

            <Row label="With dot indicator">
              <Badge variant="success" dot>Operational</Badge>
              <Badge variant="teal" dot>AI Processing</Badge>
              <Badge variant="warning" dot>Pending Review</Badge>
              <Badge variant="danger" dot>Flagged</Badge>
            </Row>

            <Row label="size=md">
              <Badge variant="teal" size="md" dot>AI-Assisted Analysis</Badge>
              <Badge variant="warning" size="md" dot>For Clinical Review</Badge>
              <Badge variant="success" size="md">Surgeon Approved</Badge>
            </Row>

            <Row label="StatusIndicator">
              <StatusIndicator status="operational" />
              <StatusIndicator status="processing" label="AI Engine Running" />
              <StatusIndicator status="degraded" label="High Load" />
              <StatusIndicator status="down" label="Offline" />
              <StatusIndicator status="pending" label="Queue" />
            </Row>
          </Section>

          <Section title="Cards" id="cards">
            <div className="grid sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader subtitle="Default elevation-1 card">
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ds-small text-ds-3">Standard container for clinical data panels, patient summaries, and analysis results.</p>
                </CardContent>
                <CardFooter>
                  <span className="text-ds-caption text-ds-4">Last updated 2m ago</span>
                  <Button variant="ghost" size="xs">View</Button>
                </CardFooter>
              </Card>

              <Card variant="flat">
                <CardHeader>
                  <CardTitle>Flat Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ds-small text-ds-3">Used for nested or secondary containers within a surface.</p>
                </CardContent>
              </Card>

              <Card variant="ai-panel" tealTop>
                <CardHeader action={<Badge variant="teal" dot>AI-Assisted</Badge>}>
                  <CardTitle>AI Analysis Panel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ds-small text-ds-3">Teal border highlights AI-generated outputs. Always shown with a clinical disclaimer.</p>
                  <div className="mt-3 pt-3 border-t border-teal-500/20">
                    <p className="text-ds-caption text-ds-4 teal-rule-left">For Clinical Review Only — Not a standalone diagnosis.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section title="Tabs" id="tabs">
            <div className="space-y-6">
              <div>
                <p className="text-ds-caption font-mono text-ds-4 mb-3">variant=underline</p>
                <Tabs
                  tabs={[
                    { id: 'overview', label: 'Overview', count: 4 },
                    { id: 'scans',    label: 'Imaging', icon: <ScanLine className="w-3.5 h-3.5" /> },
                    { id: 'history',  label: 'History' },
                    { id: 'disabled', label: 'Archived', disabled: true },
                  ]}
                  activeTab="overview"
                  onChange={() => {}}
                  variant="underline"
                />
              </div>
              <div>
                <p className="text-ds-caption font-mono text-ds-4 mb-3">variant=pills</p>
                <Tabs
                  tabs={[
                    { id: 'a', label: 'All Cases' },
                    { id: 'b', label: 'Pre-Op', count: 2 },
                    { id: 'c', label: 'Conservative' },
                  ]}
                  activeTab="b"
                  onChange={() => {}}
                  variant="pills"
                />
              </div>
              <div>
                <p className="text-ds-caption font-mono text-ds-4 mb-3">variant=segment</p>
                <Tabs
                  tabs={[
                    { id: 'x', label: 'Grid' },
                    { id: 'y', label: 'List' },
                    { id: 'z', label: 'Table' },
                  ]}
                  activeTab="x"
                  onChange={() => {}}
                  variant="segment"
                />
              </div>
            </div>
          </Section>

          <Section title="DataTable" id="datatable">
            <DataTable
              data={tableData}
              keyExtractor={(r) => r.id}
              columns={[
                { key: 'id',     header: 'Patient ID',  width: '110px', render: (r) => <span className="font-mono text-ds-caption text-ds-3">{r.id}</span> },
                { key: 'name',   header: 'Name',        render: (r) => <span className="font-medium text-ds-1">{r.name}</span> },
                { key: 'age',    header: 'Age',         align: 'center', sortable: true, width: '70px' },
                { key: 'knee',   header: 'Affected Knee', width: '120px' },
                { key: 'kl',     header: 'KL Grade',    render: (r) => <Badge variant={klVariantMap[r.kl] ?? 'default'}>{r.kl}</Badge> },
                {
                  key: 'status', header: 'Status',
                  render: (r) => (
                    <Badge variant={r.status === 'Pre-Op Planning' ? 'warning' : r.status === 'Under Review' ? 'info' : 'teal'} dot>
                      {r.status}
                    </Badge>
                  )
                },
                {
                  key: 'actions', header: '', width: '48px', align: 'right',
                  render: () => (
                    <Dropdown
                      trigger={<IconButton icon={<MoreVertical className="w-4 h-4" />} label="Actions" size="xs" />}
                      items={[
                        { label: 'View Patient', icon: <Eye className="w-3.5 h-3.5" /> },
                        { label: 'Edit Plan', icon: <Clipboard className="w-3.5 h-3.5" /> },
                        { divider: true } as {divider: true; label: string},
                        { label: 'Remove Case', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true },
                      ]}
                    />
                  )
                },
              ]}
            />

            <div className="mt-4">
              <p className="text-ds-caption font-mono text-ds-4 mb-3">loading state</p>
              <DataTable data={[]} columns={[{ key:'a', header:'Col A' }, { key:'b', header:'Col B' }, { key:'c', header:'Col C' }]} keyExtractor={(_, i) => String(i)} loading loadingRows={3} />
            </div>
          </Section>
        </TabPanel>

        {/* ────────────────────── OVERLAYS ────────────────────── */}
        <TabPanel tabId="overlay" activeTab={activeTab}>
          <Section title="Modal" id="modal">
            <Row>
              <Button onClick={modal.open} leftIcon={<Plus className="w-4 h-4" />}>Open Modal</Button>
            </Row>
            <Modal
              isOpen={modal.isOpen}
              onClose={modal.close}
              title="Add Clinical Note"
              description="AI-assisted note template — for clinical review before saving."
              size="md"
              footer={
                <>
                  <Button variant="ghost" onClick={modal.close}>Cancel</Button>
                  <Button variant="accent" onClick={modal.close}>Save Note</Button>
                </>
              }
            >
              <div className="space-y-4">
                <Input label="Patient MRN" value="MRN-894-0129" readOnly />
                <Input label="Note Title" placeholder="e.g. Pre-operative assessment…" />
                <div>
                  <label className="text-ds-label uppercase tracking-wider text-ds-2 font-semibold block mb-1.5">Clinical Observation</label>
                  <textarea
                    className="w-full h-24 rounded-input border border-ds bg-ds-surface text-ds-small text-ds-1 px-3 py-2 outline-none resize-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-[180ms] placeholder:text-ds-4"
                    placeholder="Enter clinical observation…"
                  />
                </div>
                <div className="teal-rule-left text-ds-caption text-ds-3">
                  AI-Assisted Draft — Verify all clinical data before committing to patient record.
                </div>
              </div>
            </Modal>
          </Section>

          <Section title="Drawer" id="drawer">
            <Row>
              <Button variant="secondary" onClick={drawer.open} rightIcon={<ChevronRight className="w-4 h-4" />}>Open Drawer</Button>
            </Row>
            <Drawer
              isOpen={drawer.isOpen}
              onClose={drawer.close}
              title="Patient Filter Panel"
              description="Narrow patient cohort by clinical criteria"
              side="right"
              width="w-80"
              footer={
                <div className="flex gap-2 w-full">
                  <Button variant="ghost" fullWidth onClick={drawer.close}>Clear</Button>
                  <Button variant="accent" fullWidth onClick={drawer.close}>Apply</Button>
                </div>
              }
            >
              <div className="space-y-5">
                <Select label="KL Grade" options={[0,1,2,3,4].map((g) => ({ value: String(g), label: `Grade ${g}` }))} placeholder="All grades" fullWidth />
                <Select label="Status" options={['Pre-Op Planning','Under Review','Conservative Management'].map((s) => ({ value: s, label: s }))} placeholder="All statuses" fullWidth />
                <Switch checked={true} onChange={() => {}} label="AI-Assessed Only" description="Show only AI-processed scans" />
                <Switch checked={false} onChange={() => {}} label="Implant Plan Ready" />
              </div>
            </Drawer>
          </Section>

          <Section title="Tooltip" id="tooltip">
            <Row label="Hover to reveal tooltip">
              <Tooltip content="Kellgren-Lawrence Grade 3 — Moderate OA">
                <Badge variant="coral">KL Grade 3</Badge>
              </Tooltip>
              <Tooltip content="AI Confidence: 94.2% — High reliability" side="bottom">
                <Button variant="secondary" size="sm">AI Score</Button>
              </Tooltip>
              <Tooltip content="Export to surgical planning suite" side="right">
                <IconButton icon={<Download className="w-4 h-4" />} label="Export" variant="ghost" />
              </Tooltip>
            </Row>
          </Section>

          <Section title="Dropdown" id="dropdown">
            <Row>
              <Dropdown
                trigger={<Button variant="secondary" rightIcon={<MoreVertical className="w-4 h-4" />}>Actions</Button>}
                items={[
                  { label: 'View Full Report', icon: <Eye className="w-3.5 h-3.5" /> },
                  { label: 'Download PDF', icon: <Download className="w-3.5 h-3.5" /> },
                  { label: 'Add to Queue', icon: <Plus className="w-3.5 h-3.5" /> },
                  { divider: true } as { divider: true; label: string },
                  { label: 'Archive Case', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true },
                ]}
                align="left"
              />
            </Row>
          </Section>
        </TabPanel>

        {/* ────────────────────── FEEDBACK ────────────────────── */}
        <TabPanel tabId="feedback" activeTab={activeTab}>
          <Section title="Toast Notifications" id="toasts">
            <Row>
              <Button variant="accent" size="sm" leftIcon={<CheckCircle2 className="w-4 h-4" />} onClick={() => success('Analysis Complete', 'KL Grade assessment processed with 94.2% confidence.')}>Success Toast</Button>
              <Button variant="secondary" size="sm" leftIcon={<AlertTriangle className="w-4 h-4" />} onClick={() => warning('Clinical Review Required', 'Implant plan requires surgeon sign-off before export.')}>Warning Toast</Button>
              <Button variant="danger" size="sm" leftIcon={<AlertTriangle className="w-4 h-4" />} onClick={() => error('Processing Failed', 'DICOM file could not be parsed — check image format.')}>Error Toast</Button>
              <Button variant="ghost" size="sm" leftIcon={<Info className="w-4 h-4" />} onClick={() => info('AI Engine Update', 'Model v2.1 is now available for OA grading.')}>Info Toast</Button>
            </Row>
          </Section>

          <Section title="Progress" id="progress">
            <div className="space-y-4 max-w-md">
              <Progress value={progress} label="AI Analysis Progress" showValue variant="teal" size="sm" />
              <Progress value={34} label="Report Generation" showValue variant="navy" size="md" />
              <Progress value={progress} label="Coral variant" variant="coral" size="xs" />
              <Progress label="Indeterminate (AI Processing…)" variant="teal" size="sm" />
              <div className="flex gap-3">
                <Button size="xs" variant="secondary" onClick={() => setProgress(Math.max(0, progress - 10))}>−10%</Button>
                <Button size="xs" variant="accent" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
              </div>
            </div>
          </Section>

          <Section title="Skeleton / Loading States" id="skeleton">
            <div className="grid sm:grid-cols-2 gap-4">
              <SkeletonCard />
              <SkeletonCard lines={3} />
            </div>
            <div className="mt-4 rounded-card border border-ds overflow-hidden bg-ds-surface">
              {[1,2,3].map((i) => <SkeletonRow key={i} />)}
            </div>
            <div className="mt-4 max-w-sm">
              <p className="text-ds-caption font-mono text-ds-4 mb-3">SkeletonText</p>
              <SkeletonText lines={4} />
            </div>
          </Section>

          <Section title="Empty & Error States" id="states">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <EmptyState
                  icon={<ScanLine className="w-5 h-5" />}
                  title="No Scans Found"
                  description="Upload a DICOM or radiographic image to begin AI-assisted analysis."
                  action={<Button variant="accent" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Upload Image</Button>}
                />
              </Card>
              <Card>
                <ErrorState
                  title="Analysis Failed"
                  description="The AI model encountered an error processing this scan. Please retry or contact support."
                  action={<Button variant="secondary" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />}>Retry Analysis</Button>}
                />
              </Card>
            </div>
          </Section>
        </TabPanel>

        {/* ────────────────────── TYPOGRAPHY ────────────────────── */}
        <TabPanel tabId="typography" activeTab={activeTab}>
          <Section title="Typography Scale" id="typography">
            <Card>
              <div className="space-y-5 divide-y divide-ds">
                {[
                  { tag: 'h1', cls: 'font-display text-ds-h1', label: 'DM Serif Display · H1 · 61px', text: 'Knee Analysis Report' },
                  { tag: 'h2', cls: 'font-display text-ds-h2', label: 'DM Serif Display · H2 · 49px', text: 'Osteoarthritis Grading' },
                  { tag: 'h3', cls: 'font-display text-ds-h3', label: 'DM Serif Display · H3 · 39px', text: 'Medial Meniscus Assessment' },
                  { tag: 'h4', cls: 'text-ds-h4 font-semibold', label: 'Inter Semibold · H4 · 31px', text: 'Anatomical Measurements' },
                  { tag: 'h5', cls: 'text-ds-h5 font-semibold', label: 'Inter Semibold · H5 · 25px', text: 'Implant Templating Suggestions' },
                  { tag: 'h6', cls: 'text-ds-h6 font-semibold', label: 'Inter Semibold · H6 · 20px', text: 'Patient Case Summary' },
                  { tag: 'p',  cls: 'text-ds-body',   label: 'Inter Regular · Body · 16px',   text: 'This assessment was generated by a prototype AI model. All findings must be independently verified by a licensed radiologist or orthopedic surgeon before clinical use.' },
                  { tag: 'p',  cls: 'text-ds-small',  label: 'Inter Regular · Small · 14px',  text: 'Medial joint space narrowing: 1.8mm (Normal: 4.0–5.5mm) · Posterior tibial slope: 8.5°' },
                  { tag: 'p',  cls: 'text-ds-caption', label: 'Inter Regular · Caption · 12px', text: 'Last updated 14 Feb 2026 · AI confidence: 94.2% · For clinical research evaluation only.' },
                  { tag: 'p',  cls: 'font-mono text-ds-body',   label: 'IBM Plex Mono · Body · Clinical data', text: '94.2% confidence · KL Grade 3 · JSW 1.8mm · MAD −7.8mm' },
                  { tag: 'p',  cls: 'font-mono text-ds-small',  label: 'IBM Plex Mono · Small · Measurements',  text: 'TFA: 2.1° · Posterior slope: 8.5° · Insall-Salvati: 0.98' },
                ].map(({ tag: Tag, cls, label, text }, i) => (
                  <div key={i} className="pt-5 first:pt-0">
                    <p className="text-ds-caption font-mono text-ds-4 mb-2">{label}</p>
                    {React.createElement(Tag as keyof JSX.IntrinsicElements, { className: cn(cls, 'text-ds-1') }, text)}
                  </div>
                ))}
              </div>
            </Card>
          </Section>
        </TabPanel>

        {/* ────────────────────── TOKENS ────────────────────── */}
        <TabPanel tabId="tokens" activeTab={activeTab}>
          <Section title="Color Palette" id="colors">
            <div className="space-y-5">
              {[
                { name: 'Navy (Primary)',  shades: [50,100,200,300,400,500,600,700,800,900,950], prefix: 'bg-navy-' },
                { name: 'Teal (Medical)', shades: [50,100,200,300,400,500,600,700,800,900,950], prefix: 'bg-teal-' },
                { name: 'Coral (Accent)', shades: [50,100,200,300,400,500,600,700,800,900,950], prefix: 'bg-coral-' },
              ].map(({ name, shades, prefix }) => (
                <div key={name}>
                  <p className="text-ds-caption font-mono text-ds-3 mb-2">{name}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {shades.map((s) => (
                      <Tooltip key={s} content={`${prefix.replace('bg-','').replace('-','')} ${s}`}>
                        <div className={cn('w-9 h-9 rounded-input border border-white/10', `${prefix}${s}`)} />
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Spacing & Border Radius" id="spacing">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-ds-caption font-mono text-ds-4 mb-4">8-point grid</p>
                <div className="space-y-2">
                  {[
                    { label: 'micro (4px)', w: 'w-1' },
                    { label: 'xs (8px)',    w: 'w-2' },
                    { label: 'sm (16px)',   w: 'w-4' },
                    { label: 'md (24px)',   w: 'w-6' },
                    { label: 'lg (32px)',   w: 'w-8' },
                    { label: 'xl (48px)',   w: 'w-12' },
                    { label: '2xl (64px)',  w: 'w-16' },
                    { label: 'section (80px)', w: 'w-20' },
                    { label: 'major (96px)',   w: 'w-24' },
                  ].map(({ label, w }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={cn('h-2 bg-teal-500 rounded-full', w)} />
                      <span className="text-ds-caption font-mono text-ds-4">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-ds-caption font-mono text-ds-4 mb-4">Border radius tokens</p>
                <div className="space-y-3">
                  {[
                    { label: 'input (8px)',  cls: 'rounded-input' },
                    { label: 'btn (12px)',   cls: 'rounded-btn'   },
                    { label: 'card (16px)',  cls: 'rounded-card'  },
                    { label: 'panel (20px)', cls: 'rounded-panel' },
                    { label: 'hero (24px)',  cls: 'rounded-hero'  },
                    { label: 'pill (999px)', cls: 'rounded-pill'  },
                  ].map(({ label, cls }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={cn('w-14 h-7 bg-navy-100 dark:bg-navy-800 border border-ds', cls)} />
                      <span className="text-ds-caption font-mono text-ds-4">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Elevation Shadows" id="shadows">
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { label: 'E1 (subtle)', cls: 'shadow-e1 dark:shadow-e1-dark' },
                { label: 'E2 (raised)',  cls: 'shadow-e2 dark:shadow-e2-dark' },
                { label: 'E3 (floating)',cls: 'shadow-e3 dark:shadow-e3-dark' },
              ].map(({ label, cls }) => (
                <div key={label} className={cn('bg-ds-surface rounded-card border border-ds p-6 text-center', cls)}>
                  <p className="text-ds-small font-medium text-ds-1">{label}</p>
                  <p className="text-ds-caption font-mono text-ds-4 mt-1">{cls.split(' ')[0].replace('shadow-', '0 ')}</p>
                </div>
              ))}
            </div>
          </Section>
        </TabPanel>
      </div>
    </div>
  );
}
