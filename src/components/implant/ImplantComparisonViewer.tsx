import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Ruler,
  Maximize2,
  Minimize2,
  Sliders,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Info,
  CheckCircle2,
  AlertTriangle,
  Bone,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ImplantOption, MOCK_IMPLANT_PATIENT } from '@/data/mockImplantPlanningData';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface ImplantComparisonViewerProps {
  selectedOption: ImplantOption;
  onSelectOption: (opt: ImplantOption) => void;
  allOptions: ImplantOption[];
}

type ViewPlane = 'coronal' | 'sagittal' | 'axial';

export function ImplantComparisonViewer({
  selectedOption,
  onSelectOption,
  allOptions,
}: ImplantComparisonViewerProps) {
  const [viewPlane, setViewPlane] = useState<ViewPlane>('coronal');
  const [showBoneContour, setShowBoneContour] = useState(true);
  const [showImplantShield, setShowImplantShield] = useState(true);
  const [showCutPlanes, setShowCutPlanes] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(75);

  const patient = MOCK_IMPLANT_PATIENT;

  return (
    <div className="relative flex flex-col bg-navy-950 rounded-panel border border-ds overflow-hidden shadow-ds-e3 select-none h-[540px] lg:h-[590px]">
      {/* ── TOP VIEWPORT HEADER & QUICK OPTION SWITCHER ── */}
      <div className="h-14 px-4 bg-navy-900/90 border-b border-navy-800 flex items-center justify-between z-20 shrink-0 text-white flex-wrap gap-2">
        {/* Left: View Plane Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
            Projection:
          </span>
          <div className="flex items-center bg-navy-950/90 rounded-input border border-navy-800 p-0.5 text-xs">
            <button
              onClick={() => setViewPlane('coronal')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewPlane === 'coronal'
                  ? 'bg-teal-500/20 text-teal-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Coronal (AP/ML)
            </button>
            <button
              onClick={() => setViewPlane('sagittal')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewPlane === 'sagittal'
                  ? 'bg-teal-500/20 text-teal-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sagittal (Resection)
            </button>
            <button
              onClick={() => setViewPlane('axial')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewPlane === 'axial'
                  ? 'bg-teal-500/20 text-teal-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Axial (Plateau Tray)
            </button>
          </div>
        </div>

        {/* Right: Interactive Option 1 / 2 / 3 Quick Switch Pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-medium hidden md:inline">
            Comparing:
          </span>
          <div className="flex items-center bg-navy-950/90 rounded-input border border-navy-800 p-0.5 text-xs font-mono">
            {allOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSelectOption(opt)}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                  selectedOption.id === opt.id
                    ? 'bg-teal-500 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Option {opt.rank} ({opt.sizeName.split(' ')[1]})</span>
                <span className="text-[10px] opacity-80">{opt.matchScore}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HUD BANNER: LIVE FIT METRIC & CLINICAL NOTICE ── */}
      <div className="h-10 px-4 bg-navy-900/60 border-b border-navy-800/80 flex items-center justify-between z-20 shrink-0 text-white text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-teal-300">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>{selectedOption.sizeName}</span>
          </span>
          <span className="text-slate-500">|</span>
          <span className="font-mono text-slate-300">
            Fit Match:{' '}
            <strong className="text-teal-400 font-bold text-sm">
              <AnimatedCounter value={selectedOption.matchScore} suffix="%" durationMs={600} />
            </strong>
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline text-[11px]">
            Coverage: {selectedOption.coveragePct}% (Overhang: {selectedOption.overhangMm > 0 ? `+${selectedOption.overhangMm}mm` : `${selectedOption.overhangMm}mm`})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" size="sm">
            Clinical Review Required
          </Badge>
        </div>
      </div>

      {/* ── MAIN INTERACTIVE GEOMETRIC VIEWPORT ── */}
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        {/* Medical Viewport Grid & Crosshair Reference */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900/40 via-black to-black pointer-events-none" />

        {/* Anatomical Calibrations & Orientation HUD */}
        <div className="absolute top-3 left-3 text-slate-500 font-mono text-[11px] pointer-events-none space-y-0.5 z-10 select-none">
          <div>PATIENT: ELEANOR VANCE (62y F)</div>
          <div>BONE ML: {patient.femoralMeasurements.ml} mm | AP: {patient.femoralMeasurements.ap} mm</div>
          <div>VALGUS CUT: {selectedOption.valgusAngle}° | RESECTION: {selectedOption.resectionDepth} mm</div>
        </div>

        <div className="absolute top-3 right-3 text-teal-400 font-mono text-xs font-bold pointer-events-none z-10">
          LATERAL
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-slate-400 font-mono text-xs font-bold pointer-events-none z-10">
          MEDIAL
        </div>

        {/* ── ANIMATED SVG PROJECTION CONTAINER (Keyed by selected option and view plane) ── */}
        <div className="relative w-full h-full max-w-[580px] max-h-[460px] flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.svg
              key={`${selectedOption.id}-${viewPlane}`}
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -6 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
              viewBox="0 0 500 420"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* ─────────────────────────────────────────────────────────────
                  PROJECTION 1: CORONAL VIEW (Distal Femur & Proximal Tibia AP/ML)
              ───────────────────────────────────────────────────────────── */}
              {viewPlane === 'coronal' && (
                <g>
                  {/* Distal Femur Resected Bone Contour (Teal Neutral) */}
                  <path
                    d="M 120 40 L 130 180 C 135 220, 160 240, 200 240 L 300 240 C 340 240, 365 220, 370 180 L 380 40 Z"
                    fill="rgba(203, 213, 225, 0.08)"
                    stroke="#CBD5E1"
                    strokeWidth="1.8"
                  />

                  {/* Resection Line (Transverse Cut Plane) */}
                  {showCutPlanes && (
                    <g>
                      <line x1="80" y1="240" x2="420" y2="240" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
                      <rect x="360" y="244" width="85" height="16" rx="3" fill="#0B132B" stroke="#F59E0B" strokeWidth="1" />
                      <text x="402" y="252" fill="#F59E0B" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        Cut: {selectedOption.resectionDepth} mm @ {selectedOption.valgusAngle}°
                      </text>
                    </g>
                  )}

                  {/* Proximal Tibia Resected Bone Contour */}
                  <path
                    d="M 130 280 C 180 280, 320 280, 370 280 L 350 400 L 150 400 Z"
                    fill="rgba(203, 213, 225, 0.08)"
                    stroke="#CBD5E1"
                    strokeWidth="1.8"
                  />

                  {/* Joint Line Space (Polyethylene Insert Gap) */}
                  <rect
                    x="150"
                    y="252"
                    width="200"
                    height="18"
                    rx="3"
                    fill="rgba(46, 196, 182, 0.22)"
                    stroke="#2EC4B6"
                    strokeWidth="1.5"
                  />
                  <text x="250" y="261" fill="#2EC4B6" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                    Poly Insert: {selectedOption.polyThickness.split(' ')[0]}
                  </text>

                  {/* ── IMPLANT GEOMETRY OVERLAY (Dynamically sized by Option) ── */}
                  {/* Femoral Component Shield */}
                  <path
                    d={
                      selectedOption.rank === 1
                        ? "M 125 150 C 130 242, 165 244, 205 244 L 295 244 C 335 244, 370 242, 375 150 L 360 145 C 350 220, 330 225, 290 225 L 210 225 C 170 225, 150 220, 140 145 Z"
                        : selectedOption.rank === 2
                        ? "M 136 150 C 140 242, 170 244, 208 244 L 292 244 C 330 244, 360 242, 364 150 L 352 145 C 342 220, 325 225, 288 225 L 212 225 C 175 225, 158 220, 148 145 Z"
                        : "M 115 150 C 122 242, 160 244, 202 244 L 298 244 C 340 244, 378 242, 385 150 L 368 145 C 358 220, 335 225, 292 225 L 208 225 C 165 225, 142 220, 132 145 Z"
                    }
                    fill={selectedOption.overhangMm > 1 ? "rgba(239, 68, 68, 0.30)" : "rgba(46, 196, 182, 0.28)"}
                    stroke={selectedOption.overhangMm > 1 ? "#EF4444" : "#2EC4B6"}
                    strokeWidth="2.2"
                  />

                  {/* Tibial Tray Baseplate */}
                  <rect
                    x={selectedOption.rank === 1 ? 132 : selectedOption.rank === 2 ? 142 : 122}
                    y="272"
                    width={selectedOption.rank === 1 ? 236 : selectedOption.rank === 2 ? 216 : 256}
                    height="10"
                    rx="2"
                    fill="rgba(46, 196, 182, 0.35)"
                    stroke={selectedOption.overhangMm > 1 ? "#EF4444" : "#2EC4B6"}
                    strokeWidth="1.8"
                  />
                  {/* Stem Keel */}
                  <polygon
                    points={
                      selectedOption.rank === 1
                        ? "240,282 260,282 254,340 246,340"
                        : selectedOption.rank === 2
                        ? "242,282 258,282 253,330 247,330"
                        : "238,282 262,282 256,350 244,350"
                    }
                    fill="rgba(46, 196, 182, 0.4)"
                    stroke="#2EC4B6"
                    strokeWidth="1.5"
                  />

                  {/* ── DYNAMIC MEASUREMENT CALIPERS ── */}
                  {/* Femoral ML Caliper */}
                  <g>
                    <line x1="120" y1="20" x2="380" y2="20" stroke="#2EC4B6" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="120" cy="20" r="3" fill="#2EC4B6" />
                    <circle cx="380" cy="20" r="3" fill="#2EC4B6" />
                    <rect x="200" y="10" width="100" height="20" rx="4" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1" />
                    <text x="250" y="20" fill="#2EC4B6" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                      Implant ML: {selectedOption.femoralML} mm
                    </text>
                  </g>

                  {/* Tibial Base ML Caliper */}
                  <g>
                    <line x1="130" y1="410" x2="370" y2="410" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="130" cy="410" r="3" fill="#CBD5E1" />
                    <circle cx="370" cy="410" r="3" fill="#CBD5E1" />
                    <rect x="200" y="400" width="100" height="20" rx="4" fill="#0B132B" stroke="#CBD5E1" strokeWidth="1" />
                    <text x="250" y="410" fill="#CBD5E1" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                      Tibial Tray: {selectedOption.tibialML} mm
                    </text>
                  </g>
                </g>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  PROJECTION 2: SAGITTAL VIEW (AP Profile & Resection Slope)
              ───────────────────────────────────────────────────────────── */}
              {viewPlane === 'sagittal' && (
                <g>
                  {/* Femoral Sagittal Curve */}
                  <path
                    d="M 160 50 C 165 140, 180 200, 200 240 C 230 270, 310 265, 340 210 C 350 160, 345 80, 335 50 Z"
                    fill="rgba(203, 213, 225, 0.08)"
                    stroke="#CBD5E1"
                    strokeWidth="1.8"
                  />

                  {/* Posterior Chamfer Cut */}
                  <line x1="170" y1="210" x2="230" y2="240" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="3 2" />

                  {/* Tibial Sagittal Slope Base */}
                  <path
                    d="M 160 275 L 340 285 L 320 390 L 180 390 Z"
                    fill="rgba(203, 213, 225, 0.08)"
                    stroke="#CBD5E1"
                    strokeWidth="1.8"
                  />

                  {/* Sagittal Posterior Slope Marker */}
                  <line x1="130" y1="275" x2="370" y2="288" stroke="#2EC4B6" strokeWidth="1.5" strokeDasharray="4 2" />
                  <rect x="300" y="295" width="115" height="18" rx="3" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1" />
                  <text x="357" y="304" fill="#2EC4B6" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                    Post. Slope: {patient.tibialMeasurements.posteriorSlopeDeg}°
                  </text>

                  {/* Implant Sagittal Profile */}
                  <path
                    d={
                      selectedOption.rank === 1
                        ? "M 175 120 C 180 230, 210 248, 260 248 C 300 248, 330 220, 335 120 L 322 120 C 318 200, 290 225, 255 225 C 220 225, 195 200, 190 120 Z"
                        : selectedOption.rank === 2
                        ? "M 182 120 C 186 230, 214 248, 258 248 C 295 248, 322 220, 326 120 L 315 120 C 310 200, 285 225, 254 225 C 222 225, 200 200, 195 120 Z"
                        : "M 168 120 C 174 230, 206 248, 262 248 C 305 248, 338 220, 344 120 L 330 120 C 324 200, 295 225, 256 225 C 218 225, 190 200, 185 120 Z"
                    }
                    fill="rgba(46, 196, 182, 0.32)"
                    stroke="#2EC4B6"
                    strokeWidth="2"
                  />

                  {/* Femoral AP Dimension Caliper */}
                  <g>
                    <line x1="160" y1="20" x2="340" y2="20" stroke="#2EC4B6" strokeWidth="1.5" />
                    <circle cx="160" cy="20" r="3" fill="#2EC4B6" />
                    <circle cx="340" cy="20" r="3" fill="#2EC4B6" />
                    <rect x="200" y="10" width="100" height="20" rx="4" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1" />
                    <text x="250" y="20" fill="#2EC4B6" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                      Implant AP: {selectedOption.femoralAP} mm
                    </text>
                  </g>
                </g>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  PROJECTION 3: AXIAL VIEW (Tibial Plateau Rim Perimeter Coverage)
              ───────────────────────────────────────────────────────────── */}
              {viewPlane === 'axial' && (
                <g>
                  {/* Resected Tibial Plateau Perimeter (Cortical Bone Boundary) */}
                  <ellipse
                    cx="250"
                    cy="210"
                    rx="145"
                    ry="105"
                    fill="rgba(203, 213, 225, 0.08)"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                  />

                  {/* Tibial Tray Baseplate Contour */}
                  <rect
                    x={selectedOption.rank === 1 ? 112 : selectedOption.rank === 2 ? 122 : 100}
                    y={selectedOption.rank === 1 ? 112 : selectedOption.rank === 2 ? 120 : 102}
                    width={selectedOption.rank === 1 ? 276 : selectedOption.rank === 2 ? 256 : 300}
                    height={selectedOption.rank === 1 ? 196 : selectedOption.rank === 2 ? 180 : 216}
                    rx="30"
                    fill={selectedOption.overhangMm > 1 ? "rgba(239, 68, 68, 0.30)" : "rgba(46, 196, 182, 0.30)"}
                    stroke={selectedOption.overhangMm > 1 ? "#EF4444" : "#2EC4B6"}
                    strokeWidth="2.2"
                  />

                  {/* Central Fixation Boss */}
                  <circle cx="250" cy="210" r="18" fill="rgba(46, 196, 182, 0.5)" stroke="#2EC4B6" strokeWidth="1.5" />

                  {/* Overhang / Underhang Callout */}
                  <g>
                    <rect x="180" y="325" width="140" height="22" rx="4" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1.2" />
                    <text x="250" y="336" fill="#2EC4B6" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                      Cortical Coverage: {selectedOption.coveragePct}%
                    </text>
                  </g>
                </g>
              )}
            </motion.svg>
          </AnimatePresence>
        </div>

        {/* Overhang warning pill if size 6 */}
        {selectedOption.overhangMm > 1 && (
          <div className="absolute bottom-4 left-4 p-2.5 rounded-card bg-coral-950/80 border border-coral-500/40 text-coral-200 text-xs flex items-center gap-2 backdrop-blur-sm z-20">
            <AlertTriangle className="w-4 h-4 text-coral-400 shrink-0" />
            <span>
              <strong>Overhang Alert:</strong> +{selectedOption.overhangMm} mm exceeds recommended cortical margin.
            </span>
          </div>
        )}
      </div>

      {/* ── BOTTOM VIEWPORT METRIC BAR ── */}
      <div className="h-11 px-4 bg-navy-900/90 border-t border-navy-800 flex items-center justify-between z-20 shrink-0 text-white text-xs">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400">Femur Fit:</span>
          <span className={`font-bold ${selectedOption.femoralFit === 'Excellent' ? 'text-emerald-400' : selectedOption.femoralFit === 'Good' ? 'text-amber-400' : 'text-coral-400'}`}>
            {selectedOption.femoralFit}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Tibia Fit:</span>
          <span className={`font-bold ${selectedOption.tibialFit === 'Excellent' ? 'text-emerald-400' : selectedOption.tibialFit === 'Good' ? 'text-amber-400' : 'text-coral-400'}`}>
            {selectedOption.tibialFit}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>{selectedOption.suggestedTag}</span>
        </div>
      </div>
    </div>
  );
}
