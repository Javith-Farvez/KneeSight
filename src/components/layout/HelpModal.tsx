import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  HelpCircle,
  Keyboard,
  FileQuestion,
  ShieldAlert,
  ExternalLink,
  BookOpen,
  Activity,
  Layers,
  ScanLine
} from 'lucide-react';
import { APP_NAME, APP_VERSION } from '@/lib/constants';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clinical Help & Documentation"
      size="lg"
    >
      <div className="space-y-6">
        {/* Banner */}
        <div className="flex items-start gap-3 p-3.5 rounded-card bg-teal-500/10 border border-teal-500/20">
          <div className="w-8 h-8 rounded-btn bg-teal-500 text-white flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-ds-small text-ds-1">{APP_NAME} Prototype</h4>
              <Badge variant="teal" size="sm">{APP_VERSION}</Badge>
            </div>
            <p className="text-ds-caption text-ds-3 mt-0.5">
              AI-assisted Musculoskeletal Decision Support System designed for radiographic and MRI knee evaluation.
            </p>
          </div>
        </div>

        {/* Shortcuts */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Keyboard className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h5 className="font-semibold text-ds-small text-ds-1">Keyboard Navigation Shortcuts</h5>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ds-caption">
            <div className="flex items-center justify-between p-2 rounded-input bg-ds-surface-2 border border-ds">
              <span className="text-ds-2">Open Global Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-ds-surface border border-ds font-mono font-bold text-ds-1">⌘ / Ctrl + K</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-input bg-ds-surface-2 border border-ds">
              <span className="text-ds-2">Toggle Dark / Light Theme</span>
              <kbd className="px-1.5 py-0.5 rounded bg-ds-surface border border-ds font-mono font-bold text-ds-1">Alt + T</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-input bg-ds-surface-2 border border-ds">
              <span className="text-ds-2">Toggle Sidebar</span>
              <kbd className="px-1.5 py-0.5 rounded bg-ds-surface border border-ds font-mono font-bold text-ds-1">⌘ / Ctrl + B</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-input bg-ds-surface-2 border border-ds">
              <span className="text-ds-2">Focus Main Content</span>
              <kbd className="px-1.5 py-0.5 rounded bg-ds-surface border border-ds font-mono font-bold text-ds-1">Tab</kbd>
            </div>
          </div>
        </div>

        {/* Modules summary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h5 className="font-semibold text-ds-small text-ds-1">Clinical Module Overview</h5>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-card border border-ds bg-ds-surface flex items-start gap-3">
              <ScanLine className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-ds-small font-medium text-ds-1">Image Analysis (X-Ray & Kellgren-Lawrence Grading)</p>
                <p className="text-ds-caption text-ds-4">Automated joint space width measurement, osteophyte mapping, and KL grade 0–4 stratification.</p>
              </div>
            </div>
            <div className="p-3 rounded-card border border-ds bg-ds-surface flex items-start gap-3">
              <Layers className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-ds-small font-medium text-ds-1">Meniscus & Osteoarthritis MRI Assessment</p>
                <p className="text-ds-caption text-ds-4">Multi-planar MRI tear morphology detection (Grade 0–3) and anterior/posterior horn segmentation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="flex items-start gap-2.5 p-3 rounded-card bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-ds-caption">
            <strong>Investigational Software Prototype:</strong> KneeSight AI is intended for investigational and clinical evaluation purposes only. Final diagnostic decisions remain the sole responsibility of the attending physician.
          </p>
        </div>
      </div>
    </Modal>
  );
}
