import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Columns,
  Layers,
  Ruler,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
} from 'lucide-react';
import heroKneeImg from '@/assets/hero-knee.jpg';

interface MeniscusImageViewerProps {
  showOverlay: boolean;
  onToggleOverlay: (val: boolean) => void;
  showMeasurements: boolean;
  onToggleMeasurements: (val: boolean) => void;
  opacity: number;
  onOpacityChange: (val: number) => void;
}

export function MeniscusImageViewer({
  showOverlay,
  onToggleOverlay,
  showMeasurements,
  onToggleMeasurements,
  opacity,
  onOpacityChange,
}: MeniscusImageViewerProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareSplit, setCompareSplit] = useState<number>(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewPlane, setViewPlane] = useState<'sagittal' | 'coronal'>('sagittal');

  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsCompareMode(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.6), 3.5));
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col bg-navy-950 rounded-panel border border-ds overflow-hidden shadow-ds-e3 select-none ${
        isFullscreen ? 'fixed inset-0 z-[300] rounded-none border-none' : 'h-[540px] lg:h-[580px]'
      }`}
    >
      {/* ── TOP TOOLBAR ── */}
      <div className="h-12 px-4 bg-navy-900/90 border-b border-navy-800 flex items-center justify-between z-20 shrink-0 text-white">
        {/* Left info & Plane switcher */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="font-bold text-teal-400">KS-0241</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-medium">Medial Meniscus MRI</span>
          </div>

          <div className="hidden sm:flex items-center bg-navy-950/80 rounded-input border border-navy-800 p-0.5 text-[11px]">
            <button
              onClick={() => setViewPlane('sagittal')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewPlane === 'sagittal'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sagittal PDFS
            </button>
            <button
              onClick={() => setViewPlane('coronal')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewPlane === 'coronal'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Coronal T2
            </button>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-navy-950/80 rounded-input border border-navy-800 p-0.5">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
              className="p-1 rounded hover:bg-navy-800 text-slate-300 hover:text-white"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-teal-300 min-w-[38px] text-center" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 3.5))}
              className="p-1 rounded hover:bg-navy-800 text-slate-300 hover:text-white"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-btn bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-white hover:bg-navy-800"
            title="Reset View (R)"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Overlay Toggle */}
          <button
            onClick={() => onToggleOverlay(!showOverlay)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-btn border text-xs font-medium ${
              showOverlay
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-navy-950/80 border-navy-800 text-slate-400'
            }`}
            title="Toggle Meniscus Overlay"
            aria-label="Toggle Meniscus Overlay"
            aria-pressed={showOverlay}
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Overlay</span>
          </button>

          {/* Measurements Toggle */}
          <button
            onClick={() => onToggleMeasurements(!showMeasurements)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-btn border text-xs font-medium ${
              showMeasurements
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-navy-950/80 border-navy-800 text-slate-400'
            }`}
            title="Toggle Regional Measurements"
            aria-label="Toggle Regional Measurements"
            aria-pressed={showMeasurements}
          >
            <Ruler className="w-3.5 h-3.5 text-coral-400" />
            <span className="hidden md:inline">Measurements</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={() => setIsCompareMode((prev) => !prev)}
            className={`p-2 rounded-btn border ${
              isCompareMode
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-navy-950/80 border-navy-800 text-slate-300 hover:text-white hover:bg-navy-800'
            }`}
            title="Compare Split View"
            aria-label="Toggle Compare Split View"
            aria-pressed={isCompareMode}
          >
            <Columns className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 rounded-btn bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-white"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── OPACITY CONTROLLER BAR ── */}
      <div className="h-9 px-4 bg-navy-900/60 border-b border-navy-800/80 flex items-center justify-between z-20 shrink-0 text-white text-xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-teal-400" /> Overlay Opacity:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => onOpacityChange(Number(e.target.value))}
              className="w-28 sm:w-36 h-1 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <span className="font-mono text-teal-300 text-[11px] w-8">{opacity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-coral-400" />
          <span className="text-slate-300 font-medium">Medial Meniscus Horns</span>
        </div>
      </div>

      {/* ── MAIN VIEWPORT CANVAS ── */}
      <div
        className="relative flex-1 bg-black overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900/40 via-black to-black pointer-events-none" />

        {/* Anatomical HUD */}
        <div className="absolute top-3 left-3 text-slate-500 font-mono text-[11px] pointer-events-none space-y-0.5 z-10 select-none">
          <div>SERIES: 3.0T MRI KNEE</div>
          <div>TE: 35ms | TR: 2800ms</div>
          <div>SLICE THICKNESS: 2.0 mm</div>
        </div>

        <div className="absolute top-3 right-3 text-teal-400 font-mono text-xs font-bold pointer-events-none z-10">
          MEDIAL
        </div>
        <div className="absolute bottom-3 left-3 text-slate-400 font-mono text-xs font-bold pointer-events-none z-10">
          ANT
        </div>
        <div className="absolute bottom-3 right-3 text-slate-400 font-mono text-xs font-bold pointer-events-none z-10">
          POST
        </div>

        {/* Zoom & Pan Container */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isPanning ? 'none' : 'transform 0.08s ease-out',
          }}
          className="relative max-w-full max-h-full flex items-center justify-center"
        >
          <div className="relative rounded shadow-2xl overflow-hidden">
            <img
              src={heroKneeImg}
              alt="Medial Meniscus MRI View"
              className="max-h-[440px] lg:max-h-[470px] w-auto object-contain select-none pointer-events-none filter contrast-125 brightness-95"
              draggable={false}
            />

            {/* Compare mode split layer */}
            {isCompareMode && (
              <div
                className="absolute inset-0 overflow-hidden border-r-2 border-teal-400"
                style={{ width: `${compareSplit}%` }}
              >
                <img
                  src={heroKneeImg}
                  alt="Raw MRI View"
                  className="max-h-[440px] lg:max-h-[470px] w-auto object-contain select-none pointer-events-none filter grayscale contrast-110"
                  draggable={false}
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 uppercase">
                  Raw MRI
                </div>
              </div>
            )}

            {/* ── SEGMENTATION & MEASUREMENT SVG OVERLAY ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 500"
              preserveAspectRatio="none"
            >
              {/* Medial Meniscus Segmentation Mask with Opacity Control */}
              <AnimatePresence>
                {showOverlay && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: opacity / 100 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Anterior Horn Wedge */}
                    <path
                      d="M 155 264 C 172 260, 192 264, 202 272 C 192 284, 172 288, 155 284 C 146 280, 146 268, 155 264 Z"
                      fill="rgba(255, 107, 107, 0.35)"
                      stroke="#FF6B6B"
                      strokeWidth="2"
                    />

                    {/* Central Body Zone */}
                    <path
                      d="M 230 262 C 245 260, 260 260, 275 264 C 270 278, 245 278, 230 276 Z"
                      fill="rgba(46, 196, 182, 0.25)"
                      stroke="#2EC4B6"
                      strokeWidth="1.8"
                      strokeDasharray="2 2"
                    />

                    {/* Posterior Horn Wedge (Degenerative tear site) */}
                    <path
                      d="M 310 270 C 322 264, 344 262, 360 266 C 368 272, 366 282, 356 286 C 340 290, 320 286, 310 276 Z"
                      fill="rgba(255, 107, 107, 0.40)"
                      stroke="#FF6B6B"
                      strokeWidth="2"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* ── THREE CALIPER MEASUREMENT LINES (Anterior, Central, Posterior) ── */}
              <AnimatePresence>
                {showMeasurements && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 1. Anterior Horn Thickness Line (4.61 mm) */}
                    <g>
                      <line x1="178" y1="262" x2="178" y2="284" stroke="#FF6B6B" strokeWidth="2" />
                      <circle cx="178" cy="262" r="2.5" fill="#FF6B6B" />
                      <circle cx="178" cy="284" r="2.5" fill="#FF6B6B" />
                      {/* Badge */}
                      <rect x="130" y="240" width="56" height="17" rx="3" fill="#0B132B" stroke="#FF6B6B" strokeWidth="1" />
                      <text x="158" y="250" fill="#FF6B6B" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        Ant: 4.61 mm
                      </text>
                    </g>

                    {/* 2. Central Body Thickness Line (4.92 mm) */}
                    <g>
                      <line x1="252" y1="260" x2="252" y2="277" stroke="#2EC4B6" strokeWidth="2" />
                      <circle cx="252" cy="260" r="2.5" fill="#2EC4B6" />
                      <circle cx="252" cy="277" r="2.5" fill="#2EC4B6" />
                      <rect x="224" y="240" width="56" height="17" rx="3" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1" />
                      <text x="252" y="250" fill="#2EC4B6" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        Ctr: 4.92 mm
                      </text>
                    </g>

                    {/* 3. Posterior Horn Thickness Line (4.74 mm) */}
                    <g>
                      <line x1="338" y1="264" x2="338" y2="286" stroke="#FF6B6B" strokeWidth="2" />
                      <circle cx="338" cy="264" r="2.5" fill="#FF6B6B" />
                      <circle cx="338" cy="286" r="2.5" fill="#FF6B6B" />
                      <rect x="310" y="240" width="56" height="17" rx="3" fill="#0B132B" stroke="#FF6B6B" strokeWidth="1" />
                      <text x="338" y="250" fill="#FF6B6B" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        Post: 4.74 mm
                      </text>
                    </g>

                    {/* Average Summary Marker */}
                    <g>
                      <rect x="215" y="300" width="72" height="18" rx="4" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1.2" />
                      <text x="251" y="310" fill="#2EC4B6" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        Avg: 4.76 mm
                      </text>
                    </g>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>

        {/* Compare slider dragger */}
        {isCompareMode && (
          <div
            className="absolute inset-y-0 z-20 w-8 flex items-center justify-center cursor-ew-resize pointer-events-auto"
            style={{ left: `calc(${compareSplit}% - 16px)` }}
            onMouseDown={() => {
              const handleDrag = (moveEvent: MouseEvent) => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const pct = Math.max(10, Math.min(90, ((moveEvent.clientX - rect.left) / rect.width) * 100));
                setCompareSplit(pct);
              };
              const stopDrag = () => {
                window.removeEventListener('mousemove', handleDrag);
                window.removeEventListener('mouseup', stopDrag);
              };
              window.addEventListener('mousemove', handleDrag);
              window.addEventListener('mouseup', stopDrag);
            }}
          >
            <div className="w-5 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg border border-white">
              <Columns className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
