import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  User,
  Sun,
  Moon,
  Laptop,
  Bell,
  Sliders,
  Shield,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Layers,
  Ruler,
  Brain,
  Wrench,
  Sparkles,
  WifiOff,
  RefreshCw,
  Trash2,
  Download,
  Key,
  HelpCircle,
  Eye,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { APP_NAME, APP_VERSION, CLINICAL_DISCLAIMER_FULL } from '@/lib/constants';

type SettingsSection =
  | 'profile'
  | 'appearance'
  | 'analysis'
  | 'notifications'
  | 'data-privacy'
  | 'system-feedback'
  | 'application';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast, success, warning, error, info } = useToast();

  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

  // Profile Form State
  const [profileName, setProfileName] = useState('Dr. Sarah Jenkins, MD');
  const [profileRole, setProfileRole] = useState('Attending Orthopedic Surgeon');
  const [profileOrg, setProfileOrg] = useState('Stanford Medicine MSK Center');
  const [profileEmail, setProfileEmail] = useState('sarah.jenkins@stanfordmed.org');

  // Analysis Preferences State
  const [defaultOverlay, setDefaultOverlay] = useState('all');
  const [measurementUnits, setMeasurementUnits] = useState<'metric' | 'imperial'>('metric');
  const [chartDensity, setChartDensity] = useState<'compact' | 'standard' | 'comfortable'>('standard');
  const [autoPreview, setAutoPreview] = useState(true);

  // Notification Preferences State
  const [notifAnalysis, setNotifAnalysis] = useState(true);
  const [notifReview, setNotifReview] = useState(true);
  const [notifReport, setNotifReport] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);

  // Data & Privacy State
  const [hipaaSafe, setHipaaSafe] = useState(true);
  const [preserveMetadata, setPreserveMetadata] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [offlineSimulated, setOfflineSimulated] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    success('Profile Updated', 'Clinician credential details saved successfully.');
  };

  const handleClearCache = () => {
    success('Cache Cleared', '34.2 MB of local DICOM volumetric textures purged from memory.');
  };

  return (
    <div className="page-content space-y-6 pb-16">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ds pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
              Workstation Settings
            </h1>
            <p className="text-ds-small text-ds-4 mt-0.5">
              Personalize imaging overlays, notification triggers, measurement units, and security rules
            </p>
          </div>
        </div>

        <Badge variant="teal" size="sm">
          {APP_NAME} {APP_VERSION}
        </Badge>
      </div>

      {/* ── SETTINGS 2-COLUMN LAYOUT (Nav Sidebar + Content Panel) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Tabs (3-Col) */}
        <div className="lg:col-span-3 space-y-1 bg-ds-surface p-2 rounded-panel border border-ds shadow-xs">
          {[
            { id: 'profile', label: 'Profile & Clinician ID', icon: User },
            { id: 'appearance', label: 'Appearance & Theme', icon: Sun },
            { id: 'analysis', label: 'Analysis Preferences', icon: Sliders },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'system-feedback', label: 'System Feedback & Toasts', icon: Sparkles },
            { id: 'data-privacy', label: 'Data & Privacy (HIPAA)', icon: Shield },
            { id: 'application', label: 'Application & Storage', icon: HardDrive },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as SettingsSection)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-input text-xs font-semibold transition-colors text-left ${
                  isActive
                    ? 'bg-teal-500 text-white shadow-xs'
                    : 'text-ds-3 hover:text-ds-1 hover:bg-ds-surface-2'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Viewport (9-Col) */}
        <div className="lg:col-span-9 space-y-5">
          {/* ─────────────────────────────────────────────────────────────
              SECTION 1: PROFILE
          ───────────────────────────────────────────────────────────── */}
          {activeSection === 'profile' && (
            <Card noPad>
              <CardHeader>
                <CardTitle>Clinician Profile & Institutional Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-ds-3 block mb-1">
                        Full Name & Title
                      </label>
                      <Input
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="e.g. Dr. Sarah Jenkins, MD"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-ds-3 block mb-1">
                        Clinical Role
                      </label>
                      <Input
                        value={profileRole}
                        onChange={(e) => setProfileRole(e.target.value)}
                        placeholder="e.g. Attending Orthopedic Surgeon"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-ds-3 block mb-1">
                        Organization / Hospital
                      </label>
                      <Input
                        value={profileOrg}
                        onChange={(e) => setProfileOrg(e.target.value)}
                        placeholder="e.g. Stanford Medicine MSK Center"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-ds-3 block mb-1">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        placeholder="e.g. clinician@hospital.org"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button variant="accent" size="sm" type="submit" leftIcon={<Check className="w-4 h-4" />}>
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SECTION 2: APPEARANCE
          ───────────────────────────────────────────────────────────── */}
          {activeSection === 'appearance' && (
            <Card noPad>
              <CardHeader>
                <CardTitle>Appearance & Display Theme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-ds-caption text-ds-3">
                  Select your preferred high-contrast clinical theme mode:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Light Mode', value: 'light' as const, icon: Sun, desc: 'High luminance clinic view' },
                    { label: 'Dark Mode', value: 'dark' as const, icon: Moon, desc: 'Radiology reading room standard' },
                    { label: 'System Sync', value: 'system' as const, icon: Laptop, desc: 'Follow OS preferences' },
                  ].map(({ label, value, icon: Icon, desc }) => {
                    const isSelected = theme === value;
                    return (
                      <button
                        key={value}
                        id={`theme-btn-${value}`}
                        onClick={() => setTheme(value as any)}
                        className={`flex flex-col items-start p-4 rounded-panel border text-left transition-all ${
                          isSelected
                            ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300 ring-2 ring-teal-500/20'
                            : 'border-ds bg-ds-surface-2 hover:border-teal-500/40 text-ds-3 hover:text-ds-1'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <Icon className="w-5 h-5 text-teal-500" />
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-500" />}
                        </div>
                        <span className="font-bold text-sm text-ds-1">{label}</span>
                        <span className="text-[11px] text-ds-4 mt-0.5">{desc}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SECTION 3: ANALYSIS PREFERENCES
          ───────────────────────────────────────────────────────────── */}
          {activeSection === 'analysis' && (
            <Card noPad>
              <CardHeader>
                <CardTitle>AI Analysis & Measurement Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Default Overlay */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ds-2 block">
                    Default Segmentation Overlay
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'all', label: 'All Structures (Femur, Tibia, Meniscus)' },
                      { id: 'meniscus', label: 'Meniscus Only' },
                      { id: 'bones', label: 'Bone Contours Only' },
                      { id: 'none', label: 'Raw DICOM (No Overlays)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setDefaultOverlay(opt.id)}
                        className={`p-2.5 rounded-card border text-left transition-all font-medium ${
                          defaultOverlay === opt.id
                            ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold'
                            : 'border-ds bg-ds-surface-2 text-ds-4 hover:text-ds-2'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Measurement Units */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ds-2 block">
                    Measurement System Units
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMeasurementUnits('metric')}
                      className={`px-4 py-2 rounded-card border text-xs font-semibold transition-all ${
                        measurementUnits === 'metric'
                          ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold'
                          : 'border-ds bg-ds-surface-2 text-ds-4'
                      }`}
                    >
                      Metric (Millimeters · mm / Degrees · °)
                    </button>
                    <button
                      onClick={() => setMeasurementUnits('imperial')}
                      className={`px-4 py-2 rounded-card border text-xs font-semibold transition-all ${
                        measurementUnits === 'imperial'
                          ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold'
                          : 'border-ds bg-ds-surface-2 text-ds-4'
                      }`}
                    >
                      Imperial (Inches · in / Degrees · °)
                    </button>
                  </div>
                </div>

                {/* Chart Density */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ds-2 block">
                    Chart Display Density
                  </label>
                  <div className="flex gap-2 text-xs">
                    {(['compact', 'standard', 'comfortable'] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setChartDensity(d)}
                        className={`px-3 py-1.5 rounded-card border capitalize transition-all ${
                          chartDensity === d
                            ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold'
                            : 'border-ds bg-ds-surface-2 text-ds-4'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-Preview Switch */}
                <div className="pt-2 border-t border-ds">
                  <Switch
                    id="setting-autopreview"
                    checked={autoPreview}
                    onChange={setAutoPreview}
                    label="Auto-Preview Recommended Implant Fit"
                    description="Automatically load 3D geometric implant overlay upon AI analysis completion"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SECTION 4: NOTIFICATIONS
          ───────────────────────────────────────────────────────────── */}
          {activeSection === 'notifications' && (
            <Card noPad>
              <CardHeader>
                <CardTitle>Clinical Notification Triggers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Switch
                  id="setting-notif-analysis"
                  checked={notifAnalysis}
                  onChange={setNotifAnalysis}
                  label="Analysis completed"
                  description="Receive instant alerts when multi-modality AI segmentation and morphometrics conclude"
                />

                <Switch
                  id="setting-notif-review"
                  checked={notifReview}
                  onChange={setNotifReview}
                  label="Review required"
                  description="Flag urgent alerts when borderline SNR or high-grade osteoarthritis (KL-4) requires audit"
                />

                <Switch
                  id="setting-notif-report"
                  checked={notifReport}
                  onChange={setNotifReport}
                  label="Report ready"
                  description="Notify when pre-operative surgical templating PDF handoff reports finish compilation"
                />

                <Switch
                  id="setting-notif-updates"
                  checked={notifUpdates}
                  onChange={setNotifUpdates}
                  label="System updates"
                  description="Receive notifications regarding implant library geometry updates and model patches"
                />
              </CardContent>
            </Card>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SECTION 5: SYSTEM FEEDBACK & TOAST PRESET SHOWCASE
          ───────────────────────────────────────────────────────────── */}
          {activeSection === 'system-feedback' && (
            <div className="space-y-5">
              {/* Toast Triggers */}
              <Card noPad>
                <CardHeader>
                  <CardTitle>Toast Notification System Presets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-ds-caption text-ds-3">
                    Trigger accessible system toasts to verify feedback styles:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => success('Analysis completed', 'All morphometric calipers calculated.')}
                      leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    >
                      Trigger Success Toast
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => warning('Image quality requires review', 'Low contrast SNR flag detected on sagittal slice.')}
                      leftIcon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
                    >
                      Trigger Warning Toast
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => error('Unable to complete analysis', 'DICOM corrupted: slice spacing tag missing.')}
                      leftIcon={<XCircle className="w-4 h-4 text-coral-500" />}
                    >
                      Trigger Error Toast
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => info('Implant database updated', 'Persona PS Size 3–7 matrices refreshed.')}
                      leftIcon={<Info className="w-4 h-4 text-blue-500" />}
                    >
                      Trigger Info Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Global System Feedback States Grid */}
              <Card noPad>
                <CardHeader>
                  <CardTitle>Global Component States (Loading, Skeleton, Empty, Error, Offline, Processing)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {/* 1. Loading State */}
                    <div className="p-3.5 rounded-card bg-ds-surface-2 border border-ds flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin shrink-0" />
                      <div>
                        <span className="font-bold text-ds-1 block">Loading State</span>
                        <span className="text-ds-4 text-[11px]">Calibrating pixel space…</span>
                      </div>
                    </div>

                    {/* 2. Skeleton State */}
                    <div className="p-3.5 rounded-card bg-ds-surface-2 border border-ds space-y-1.5">
                      <span className="font-bold text-ds-1 block">Skeleton State</span>
                      <div className="h-2 bg-ds rounded animate-pulse w-3/4" />
                      <div className="h-2 bg-ds rounded animate-pulse w-1/2" />
                    </div>

                    {/* 3. Empty State */}
                    <div className="p-3.5 rounded-card bg-ds-surface-2 border border-ds flex items-center gap-2.5">
                      <Layers className="w-5 h-5 text-ds-4 shrink-0" />
                      <div>
                        <span className="font-bold text-ds-1 block">Empty State</span>
                        <span className="text-ds-4 text-[11px]">No active scan loaded</span>
                      </div>
                    </div>

                    {/* 4. Error State */}
                    <div className="p-3.5 rounded-card bg-coral-500/10 border border-coral-500/30 flex items-center gap-2.5 text-coral-900 dark:text-coral-300">
                      <AlertTriangle className="w-5 h-5 text-coral-500 shrink-0" />
                      <div>
                        <span className="font-bold block">Error Boundary</span>
                        <span className="text-[11px]">Failed to fetch DICOM</span>
                      </div>
                    </div>

                    {/* 5. Success State */}
                    <div className="p-3.5 rounded-card bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-900 dark:text-emerald-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="font-bold block">Success State</span>
                        <span className="text-[11px]">Calipers verified</span>
                      </div>
                    </div>

                    {/* 6. Offline State */}
                    <div className="p-3.5 rounded-card bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-amber-900 dark:text-amber-300">
                      <WifiOff className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <span className="font-bold block">Offline Mode</span>
                        <span className="text-[11px]">Local cache active</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SECTION 6: DATA & PRIVACY
          ───────────────────────────────────────────────────────────── */}
          {activeSection === 'data-privacy' && (
            <Card noPad>
              <CardHeader>
                <CardTitle>Data Security, Privacy & HIPAA Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Switch
                  id="setting-hipaa"
                  checked={hipaaSafe}
                  onChange={setHipaaSafe}
                  label="HIPAA Safe Harbor Anonymization"
                  description="Automatically redact Patient Names, MRNs, and direct identifiers in browser session memory"
                />

                <Switch
                  id="setting-metadata"
                  checked={preserveMetadata}
                  onChange={setPreserveMetadata}
                  label="Preserve Pixel Spacing & Calibration Tags"
                  description="Maintain DICOM header tags (0028,0030) required for sub-millimeter caliper accuracy"
                />

                <Switch
                  id="setting-audit"
                  checked={auditLogging}
                  onChange={setAuditLogging}
                  label="Audit Trail Logging"
                  description="Maintain immutable cryptographic log entries for all clinician sign-offs and reviews"
                />
              </CardContent>
            </Card>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SECTION 7: APPLICATION & STORAGE
          ───────────────────────────────────────────────────────────── */}
          {activeSection === 'application' && (
            <Card noPad>
              <CardHeader>
                <CardTitle>Application Information & Storage Cache</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded bg-ds-surface-2 border border-ds font-mono">
                  <div>
                    <span className="text-[10px] text-ds-4 block font-sans uppercase">Version</span>
                    <span className="font-bold text-ds-1">{APP_VERSION}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ds-4 block font-sans uppercase">Build</span>
                    <span className="text-ds-2">2026.02.22</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ds-4 block font-sans uppercase">Cache Size</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">34.2 MB</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ds-4 block font-sans uppercase">Environment</span>
                    <span className="text-emerald-600 font-bold">Production Workstation</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-ds-4 text-xs">
                    Local volume cache stores pre-rendered 3D surface meshes for instant navigation.
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClearCache}
                    leftIcon={<Trash2 className="w-4 h-4 text-coral-500" />}
                  >
                    Clear Local Cache
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
