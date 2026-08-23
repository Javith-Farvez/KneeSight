import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Ruler, Activity, Bone, Info, CheckCircle2 } from 'lucide-react';
import { MOCK_IMPLANT_PATIENT } from '@/data/mockImplantPlanningData';

export function AnatomicalMeasurementCard() {
  const { femoralMeasurements, tibialMeasurements } = MOCK_IMPLANT_PATIENT;

  return (
    <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e1 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="p-5 border-b border-ds bg-ds-surface-2/60">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <h3 className="font-display text-ds-h6 text-ds-1 font-bold">
              Patient Bone Morphometrics
            </h3>
          </div>
          <Badge variant="teal" size="sm">
            Calibrated 3D MR
          </Badge>
        </div>
        <p className="text-ds-caption text-ds-4">
          Resected boundary dimensions extracted from volumetric imaging
        </p>
      </div>

      <div className="p-5 space-y-4 flex-1">
        {/* ── FEMORAL MEASUREMENTS ── */}
        <div className="p-4 rounded-card bg-ds-surface-2 border border-ds space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <Bone className="w-3.5 h-3.5" /> Distal Femur Dimensions
            </span>
            <span className="text-[11px] font-mono text-ds-4">AP/ML Ratio: {femoralMeasurements.aspectRatio}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-2.5 rounded bg-ds-surface border border-ds">
              <span className="text-[10px] text-ds-4 uppercase block">Mediolateral (ML)</span>
              <span className="text-xl font-bold text-ds-1 leading-tight">
                {femoralMeasurements.ml.toFixed(1)} <span className="text-xs font-normal text-ds-4">mm</span>
              </span>
            </div>

            <div className="p-2.5 rounded bg-ds-surface border border-ds">
              <span className="text-[10px] text-ds-4 uppercase block">Anteroposterior (AP)</span>
              <span className="text-xl font-bold text-ds-1 leading-tight">
                {femoralMeasurements.ap.toFixed(1)} <span className="text-xs font-normal text-ds-4">mm</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-ds-4 pt-1">
            <span>Planned Distal Cut: <strong className="text-ds-2">{femoralMeasurements.distalResectionMm} mm</strong></span>
            <span>Valgus Angle: <strong className="text-ds-2">{femoralMeasurements.valgusAngleDeg}°</strong></span>
          </div>
        </div>

        {/* ── TIBIAL MEASUREMENTS ── */}
        <div className="p-4 rounded-card bg-ds-surface-2 border border-ds space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Bone className="w-3.5 h-3.5" /> Proximal Tibia Dimensions
            </span>
            <span className="text-[11px] font-mono text-ds-4">AP/ML Ratio: {tibialMeasurements.aspectRatio}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-2.5 rounded bg-ds-surface border border-ds">
              <span className="text-[10px] text-ds-4 uppercase block">Mediolateral (ML)</span>
              <span className="text-xl font-bold text-ds-1 leading-tight">
                {tibialMeasurements.ml.toFixed(1)} <span className="text-xs font-normal text-ds-4">mm</span>
              </span>
            </div>

            <div className="p-2.5 rounded bg-ds-surface border border-ds">
              <span className="text-[10px] text-ds-4 uppercase block">Anteroposterior (AP)</span>
              <span className="text-xl font-bold text-ds-1 leading-tight">
                {tibialMeasurements.ap.toFixed(1)} <span className="text-xs font-normal text-ds-4">mm</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-ds-4 pt-1">
            <span>Planned Proximal Cut: <strong className="text-ds-2">{tibialMeasurements.proximalResectionMm} mm</strong></span>
            <span>Posterior Slope: <strong className="text-ds-2">{tibialMeasurements.posteriorSlopeDeg}°</strong></span>
          </div>
        </div>
      </div>

      {/* ── FOOTER STATS ── */}
      <div className="p-4 border-t border-ds bg-ds-surface-2/40 text-xs text-ds-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> High-Resolution 3D Fit Model
        </span>
        <span className="font-mono">Persona® Database Synced</span>
      </div>
    </Card>
  );
}
