import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  FileText,
  Download,
  CheckCircle2,
  Printer,
  Sparkles,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { ImplantOption, MOCK_IMPLANT_PATIENT } from '@/data/mockImplantPlanningData';
import { useToast } from '@/hooks/useToast';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: ImplantOption;
}

export function ExportReportModal({
  isOpen,
  onClose,
  selectedOption,
}: ExportReportModalProps) {
  const { success } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const patient = MOCK_IMPLANT_PATIENT;

  const handleDownloadPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      success('Pre-Op Plan Exported', 'Surgical templating report PDF has been generated.');
      onClose();
    }, 750);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Pre-Operative Surgical Plan Report"
      size="md"
    >
      <div className="space-y-4">
        {/* Printable Report Preview Card */}
        <div className="p-4 rounded-panel bg-ds-surface-2 border border-ds space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-ds pb-2.5">
            <div>
              <span className="font-display text-base font-bold text-ds-1 block">
                KneeSight AI · Pre-Operative Templating Plan
              </span>
              <span className="text-[11px] text-ds-4 font-mono">
                Case ID: {patient.id} · Study: {patient.studyId}
              </span>
            </div>
            <Badge variant="teal" size="sm">
              Draft v1.4
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-ds-4 block text-[10px] uppercase font-bold">Patient</span>
              <span className="font-semibold text-ds-1">{patient.name} ({patient.age}y {patient.gender})</span>
            </div>
            <div>
              <span className="text-ds-4 block text-[10px] uppercase font-bold">Target Procedure</span>
              <span className="font-semibold text-ds-1">{patient.surgeryType} ({patient.affectedSide})</span>
            </div>
          </div>

          <div className="p-3 rounded-card bg-ds-surface border border-ds space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-ds-3 font-sans">Suggested Implant:</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">{selectedOption.sizeName} ({selectedOption.matchScore}% Match)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ds-3 font-sans">System:</span>
              <span className="text-ds-1">{selectedOption.systemName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ds-3 font-sans">Distal Femoral Cut:</span>
              <span className="text-ds-1">{selectedOption.resectionDepth} mm @ {selectedOption.valgusAngle}° Valgus</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ds-3 font-sans">Proximal Tibial Cut:</span>
              <span className="text-ds-1">{patient.tibialMeasurements.proximalResectionMm} mm @ {patient.tibialMeasurements.posteriorSlopeDeg}° Slope</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ds-3 font-sans">Polyethylene Insert:</span>
              <span className="text-ds-1">{selectedOption.polyThickness}</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300">
            <strong>Clinical Notice:</strong> Subject to intra-operative ligament balancing and surgeon validation.
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-2 border-t border-ds">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="accent"
            loading={isExporting}
            onClick={handleDownloadPDF}
            leftIcon={<Download className="w-4 h-4" />}
          >
            {isExporting ? 'Generating PDF…' : 'Download Surgical PDF'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
