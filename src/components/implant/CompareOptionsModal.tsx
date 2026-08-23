import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { ImplantOption, MOCK_IMPLANT_OPTIONS, MOCK_IMPLANT_PATIENT } from '@/data/mockImplantPlanningData';

interface CompareOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: ImplantOption;
  onSelectOption: (option: ImplantOption) => void;
}

export function CompareOptionsModal({
  isOpen,
  onClose,
  selectedOption,
  onSelectOption,
}: CompareOptionsModalProps) {
  const patient = MOCK_IMPLANT_PATIENT;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detailed Implant Sizing & Geometric Comparison"
      size="lg"
    >
      <div className="space-y-5">
        <p className="text-ds-small text-ds-3">
          Side-by-side geometric tolerance comparison against patient resected bone envelope (Femur ML: {patient.femoralMeasurements.ml}mm, AP: {patient.femoralMeasurements.ap}mm | Tibia ML: {patient.tibialMeasurements.ml}mm, AP: {patient.tibialMeasurements.ap}mm).
        </p>

        {/* Comparison Table */}
        <div className="border border-ds rounded-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ds bg-ds-surface-2 text-ds-4 font-bold uppercase tracking-wider">
                <th className="p-3">Specification</th>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <th
                    key={opt.id}
                    className={`p-3 text-center ${
                      selectedOption.id === opt.id
                        ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
                        : ''
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-ds-1">{opt.sizeName}</span>
                      <span className="font-mono text-[10px] opacity-80">Rank #{opt.rank}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-ds font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-ds-2 bg-ds-surface-2/40">Overall Match Score</td>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <td key={opt.id} className="p-3 text-center font-bold text-sm">
                    <span className={opt.rank === 1 ? 'text-teal-600 dark:text-teal-400' : opt.rank === 2 ? 'text-amber-600' : 'text-coral-600'}>
                      {opt.matchScore}%
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-sans text-ds-3 bg-ds-surface-2/40">Femoral ML / AP</td>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <td key={opt.id} className="p-3 text-center text-ds-1">
                    {opt.femoralML} / {opt.femoralAP} mm
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-sans text-ds-3 bg-ds-surface-2/40">Tibial ML / AP</td>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <td key={opt.id} className="p-3 text-center text-ds-1">
                    {opt.tibialML} / {opt.tibialAP} mm
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-sans text-ds-3 bg-ds-surface-2/40">Cortical Coverage %</td>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <td key={opt.id} className="p-3 text-center text-ds-1 font-semibold">
                    {opt.coveragePct}%
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-sans text-ds-3 bg-ds-surface-2/40">Cortical Overhang Margin</td>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <td key={opt.id} className="p-3 text-center">
                    <span className={opt.overhangMm > 1 ? 'text-coral-600 dark:text-coral-400 font-bold' : opt.overhangMm < -1 ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
                      {opt.overhangMm > 0 ? `+${opt.overhangMm} mm` : `${opt.overhangMm} mm`}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-sans text-ds-3 bg-ds-surface-2/40">Polyethylene Insert</td>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <td key={opt.id} className="p-3 text-center text-ds-2 text-[11px]">
                    {opt.polyThickness}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-sans text-ds-3 bg-ds-surface-2/40">Action</td>
                {MOCK_IMPLANT_OPTIONS.map((opt) => (
                  <td key={opt.id} className="p-3 text-center">
                    <Button
                      variant={selectedOption.id === opt.id ? 'accent' : 'secondary'}
                      size="xs"
                      onClick={() => {
                        onSelectOption(opt);
                        onClose();
                      }}
                    >
                      {selectedOption.id === opt.id ? 'Active Choice' : 'Select'}
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
