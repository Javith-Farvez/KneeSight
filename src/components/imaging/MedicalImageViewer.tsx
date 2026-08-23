import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Ruler,
  Sliders,
  Columns,
  Eye,
  EyeOff,
  Sun,
  Contrast,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import heroKneeImg from '@/assets/hero-knee.jpg';
import aiPanelImg from '@/assets/ai-analysis-panel.jpg';

import { UploadedKneeImage, INITIAL_DEMO_IMAGES } from '@/data/mockMultiImageData';

interface MedicalImageViewerProps {
  showOverlays: boolean;
  onToggleOverlays: (val: boolean) => void;
  showMeasurements: boolean;
  onToggleMeasurements: (val: boolean) => void;
  selectedStructure: 'all' | 'femur' | 'tibia' | 'meniscus' | null;
  onSelectStructure: (struct: 'all' | 'femur' | 'tibia' | 'meniscus' | null) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  activeImage?: UploadedKneeImage;
  onOpenCompareModal?: () => void;
}

export function MedicalImageViewer({
  showOverlays,
  onToggleOverlays,
  showMeasurements,
  onToggleMeasurements,
  selectedStructure,
  onSelectStructure,
  isFullscreen,
  onToggleFullscreen,
  activeImage = INITIAL_DEMO_IMAGES[0],
  onOpenCompareModal,
}: MedicalImageViewerProps) {
  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Brightness & Contrast (Window Leveling)
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [showAdjustControls, setShowAdjustControls] = useState(false);

  // Compare mode (split slider)
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareSplit, setCompareSplit] = useState<number>(50); // percentage

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset view
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setBrightness(100);
    setContrast(100);
    setIsCompareMode(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((z) => Math.min(z + 0.2, 3.5));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoom((z) => Math.max(z - 0.2, 0.6));
      } else if (e.key === '0' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleResetView();
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        onToggleOverlays(!showOverlays);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        onToggleMeasurements(!showMeasurements);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        onToggleFullscreen();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsCompareMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showOverlays, showMeasurements, onToggleOverlays, onToggleMeasurements, onToggleFullscreen]);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
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

  // Visibility filters for individual structures
  const isFemurVisible = showOverlays && (selectedStructure === 'all' || selectedStructure === 'femur' || selectedStructure === null);
  const isTibiaVisible = showOverlays && (selectedStructure === 'all' || selectedStructure === 'tibia' || selectedStructure === null);
  const isMeniscusVisible = showOverlays && (selectedStructure === 'all' || selectedStructure === 'meniscus' || selectedStructure === null);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col bg-navy-950 rounded-panel border border-ds overflow-hidden shadow-ds-e3 select-none ${
        isFullscreen ? 'fixed inset-0 z-[300] rounded-none border-none' : 'h-[580px] lg:h-[640px]'
      }`}
    >
      {/* ── TOP DICOM TOOLBAR ── */}
      <div className="h-12 px-4 bg-navy-900/90 border-b border-navy-800 flex items-center justify-between z-20 shrink-0 text-white">
        {/* Left: Metadata & Series */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="font-bold text-teal-400">KS-0241</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">{activeImage?.viewName || 'AP Weight-Bearing Knee'}</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">Image 0{activeImage?.imageNumber || 1} ({activeImage?.modality})</span>
          </div>

          <div className="hidden xl:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-navy-950/60 px-2 py-0.5 rounded border border-navy-800">
            <span>WW: {contrast * 24}</span>
            <span className="text-slate-600">/</span>
            <span>WL: {brightness * 6}</span>
          </div>
        </div>

        {/* Right: Workstation Action Tools */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-navy-950/80 rounded-input border border-navy-800 p-0.5">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
              className="p-1.5 rounded hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-teal-300 min-w-[42px] text-center" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 3.5))}
              className="p-1.5 rounded hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={handleResetView}
            className="p-2 rounded-btn bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
            title="Reset Pan/Zoom/Window (R)"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Adjust Brightness / Contrast */}
          <button
            onClick={() => setShowAdjustControls((v) => !v)}
            className={`p-2 rounded-btn border transition-colors ${
              showAdjustControls
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-navy-950/80 border-navy-800 text-slate-300 hover:text-white hover:bg-navy-800'
            }`}
            title="Adjust Windowing (Brightness & Contrast)"
            aria-label="Adjust Windowing (Brightness and Contrast)"
            aria-expanded={showAdjustControls}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Overlays toggle */}
          <button
            id="viewer-toggle-overlay-btn"
            onClick={() => onToggleOverlays(!showOverlays)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn border text-xs font-medium transition-all ${
              showOverlays
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-xs'
                : 'bg-navy-950/80 border-navy-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle AI Segmentation Overlays (O)"
            aria-label="Toggle AI Segmentation Overlays"
            aria-pressed={showOverlays}
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Overlays</span>
          </button>

          {/* Measurements toggle */}
          <button
            id="viewer-toggle-measurements-btn"
            onClick={() => onToggleMeasurements(!showMeasurements)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn border text-xs font-medium transition-all ${
              showMeasurements
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-xs'
                : 'bg-navy-950/80 border-navy-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Caliper Measurements (M)"
            aria-label="Toggle Caliper Measurements"
            aria-pressed={showMeasurements}
          >
            <Ruler className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Measurements</span>
          </button>

          {/* Compare mode */}
          <button
            id="viewer-compare-btn"
            onClick={() => {
              if (onOpenCompareModal) {
                onOpenCompareModal();
              } else {
                setIsCompareMode((prev) => !prev);
              }
            }}
            className={`p-2 rounded-btn border transition-colors ${
              isCompareMode
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-navy-950/80 border-navy-800 text-slate-300 hover:text-white hover:bg-navy-800'
            }`}
            title="Side-by-Side Image Comparison (C)"
            aria-label="Side-by-Side Image Comparison"
            aria-pressed={isCompareMode}
          >
            <Columns className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen */}
          <button
            id="viewer-fullscreen-btn"
            onClick={onToggleFullscreen}
            className="p-2 rounded-btn bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── WINDOW LEVELING POPUP SLIDERS ── */}
      {showAdjustControls && (
        <div className="absolute top-14 right-4 z-30 p-3.5 rounded-card bg-navy-900/95 border border-teal-500/30 backdrop-blur-md text-white text-xs w-64 shadow-ds-e3 space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-navy-800">
            <span className="font-semibold text-teal-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Window Leveling
            </span>
            <button
              onClick={() => {
                setBrightness(100);
                setContrast(100);
              }}
              className="text-[10px] text-slate-400 hover:text-white underline"
            >
              Reset
            </button>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-400" /> Brightness (WL)</span>
              <span className="font-mono">{brightness}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="160"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="flex items-center gap-1"><Contrast className="w-3 h-3 text-teal-400" /> Contrast (WW)</span>
              <span className="font-mono">{contrast}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="180"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full h-1 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
          </div>
        </div>
      )}

      {/* ── MAIN DICOM VIEWPORT CANVAS ── */}
      <div
        className="relative flex-1 bg-black overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Medical Viewport Grid & Calibration Markers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900/40 via-black to-black pointer-events-none" />

        {/* Anatomical Orientation HUD */}
        <div className="absolute top-3 left-3 text-slate-500 font-mono text-[11px] pointer-events-none space-y-0.5 z-10 select-none">
          <div>PATIENT: DEMO CASE KS-0241 (M/62)</div>
          <div>SERIES: {activeImage?.seriesNumber || 'SER-001/04'} ({activeImage?.modality || 'CR/DX'})</div>
          <div>FOV: 240 x 240 mm</div>
          <div>KVp: 68 | mA: 120</div>
        </div>

        <div className="absolute top-3 right-3 text-slate-400 font-mono text-xs font-bold pointer-events-none z-10">
          R
        </div>
        <div className="absolute bottom-3 left-3 text-slate-400 font-mono text-xs font-bold pointer-events-none z-10">
          INF
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-slate-400 font-mono text-xs font-bold pointer-events-none z-10">
          SUP
        </div>
        <div className="absolute bottom-3 right-3 text-slate-500 font-mono text-[11px] pointer-events-none z-10 flex flex-col items-end">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-12 h-0.5 bg-teal-400" />
            <span className="text-teal-300 font-bold">50 mm</span>
          </div>
          <span>CALIBRATED {activeImage?.pixelSpacing || '0.14 mm/px'}</span>
        </div>

        {/* ── ZOOM / PAN TRANSFORM LAYER ── */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
            transition: isPanning ? 'none' : 'transform 0.08s ease-out',
          }}
          className="relative max-w-full max-h-full flex items-center justify-center"
        >
          {/* Base Radiograph Image Asset */}
          <div className="relative rounded shadow-2xl overflow-hidden">
            <img
              src={activeImage?.previewUrl || heroKneeImg}
              alt={activeImage?.filename || 'Knee Radiograph'}
              className="max-h-[500px] lg:max-h-[550px] w-auto object-contain select-none pointer-events-none filter contrast-125"
              draggable={false}
            />

            {/* ── COMPARE MODE: SPLIT VIEW ── */}
            {isCompareMode && (
              <div
                className="absolute inset-0 overflow-hidden border-r-2 border-teal-400"
                style={{ width: `${compareSplit}%` }}
              >
                <img
                  src={activeImage?.previewUrl || heroKneeImg}
                  alt="Raw Radiograph"
                  className="max-h-[500px] lg:max-h-[550px] w-auto object-contain select-none pointer-events-none filter grayscale contrast-110"
                  draggable={false}
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 uppercase">
                  Raw DICOM
                </div>
              </div>
            )}

            {/* ── SEGMENTATION MASKS SVG OVERLAY ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 500"
              preserveAspectRatio="none"
            >
              {/* 1. Femur Segmentation Overlay (Teal Outline, 12-20% Fill) */}
              <AnimatePresence>
                {isFemurVisible && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Femoral condyle contour mask */}
                    <path
                      d="M 120 40 C 130 140, 140 210, 160 250 C 175 270, 210 275, 235 260 C 255 245, 265 245, 285 260 C 310 275, 345 270, 360 250 C 380 210, 390 140, 400 40 Z"
                      fill="rgba(46, 196, 182, 0.16)"
                      stroke="#2EC4B6"
                      strokeWidth="1.8"
                      strokeDasharray="none"
                    />
                    {/* Lateral/Medial condyle landmarks */}
                    <circle cx="185" cy="265" r="3" fill="#2EC4B6" />
                    <circle cx="335" cy="265" r="3" fill="#2EC4B6" />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* 2. Tibia Segmentation Overlay (Neutral/Light Outline, 12-20% Fill) */}
              <AnimatePresence>
                {isTibiaVisible && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Tibial plateau contour mask */}
                    <path
                      d="M 145 295 C 190 292, 235 285, 260 272 C 285 285, 330 292, 375 295 C 365 370, 350 440, 335 480 L 185 480 C 170 440, 155 370, 145 295 Z"
                      fill="rgba(203, 213, 225, 0.15)"
                      stroke="#CBD5E1"
                      strokeWidth="1.8"
                    />
                    {/* Tibial intercondylar spines */}
                    <path
                      d="M 245 278 L 255 266 L 265 278"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="1.6"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* 3. Medial Meniscus Segmentation Overlay (Controlled Coral Highlight, 12-20% Fill) */}
              <AnimatePresence>
                {isMeniscusVisible && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Medial meniscus wedge contour */}
                    <path
                      d="M 160 268 C 175 266, 195 268, 205 274 C 195 284, 175 286, 160 284 C 152 280, 152 272, 160 268 Z"
                      fill="rgba(255, 107, 107, 0.18)"
                      stroke="#FF6B6B"
                      strokeWidth="1.8"
                    />
                    {/* Lateral meniscus wedge contour */}
                    <path
                      d="M 315 274 C 325 268, 345 266, 360 268 C 368 272, 368 280, 360 284 C 345 286, 325 284, 315 274 Z"
                      fill="rgba(255, 107, 107, 0.14)"
                      stroke="#FF6B6B"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* ── CALIBRATED MEASUREMENT LINES & LABELS ── */}
              <AnimatePresence>
                {showMeasurements && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Measurement 1: Femoral Width (73.1 mm) */}
                    <g>
                      {/* End ticks */}
                      <line x1="135" y1="218" x2="135" y2="232" stroke="#2EC4B6" strokeWidth="1.5" />
                      <line x1="385" y1="218" x2="385" y2="232" stroke="#2EC4B6" strokeWidth="1.5" />
                      {/* Animated connecting line */}
                      <motion.line
                        x1="135"
                        y1="225"
                        x2="385"
                        y2="225"
                        stroke="#2EC4B6"
                        strokeWidth="1.6"
                        strokeDasharray="4 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                      {/* Caliper End Dots */}
                      <circle cx="135" cy="225" r="3" fill="#2EC4B6" />
                      <circle cx="385" cy="225" r="3" fill="#2EC4B6" />
                      {/* Measurement Badge */}
                      <rect x="225" y="212" width="70" height="18" rx="4" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1" />
                      <text x="260" y="224" fill="#2EC4B6" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        {activeImage?.measurements?.femoralWidth || 73.1} mm
                      </text>
                    </g>

                    {/* Measurement 2: Tibial Width */}
                    <g>
                      <line x1="145" y1="318" x2="145" y2="332" stroke="#CBD5E1" strokeWidth="1.5" />
                      <line x1="375" y1="318" x2="375" y2="332" stroke="#CBD5E1" strokeWidth="1.5" />
                      <motion.line
                        x1="145"
                        y1="325"
                        x2="375"
                        y2="325"
                        stroke="#CBD5E1"
                        strokeWidth="1.6"
                        strokeDasharray="4 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                      />
                      <circle cx="145" cy="325" r="3" fill="#CBD5E1" />
                      <circle cx="375" cy="325" r="3" fill="#CBD5E1" />
                      <rect x="225" y="316" width="70" height="18" rx="4" fill="#0B132B" stroke="#CBD5E1" strokeWidth="1" />
                      <text x="260" y="328" fill="#CBD5E1" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        {activeImage?.measurements?.tibialWidth || 71.7} mm
                      </text>
                    </g>

                    {/* Measurement 3: Meniscus Thickness */}
                    <g>
                      <motion.line
                        x1="182"
                        y1="267"
                        x2="182"
                        y2="284"
                        stroke="#FF6B6B"
                        strokeWidth="1.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                      />
                      <circle cx="182" cy="267" r="2.5" fill="#FF6B6B" />
                      <circle cx="182" cy="284" r="2.5" fill="#FF6B6B" />
                      <rect x="135" y="270" width="46" height="15" rx="3" fill="#0B132B" stroke="#FF6B6B" strokeWidth="1" />
                      <text x="158" y="279" fill="#FF6B6B" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        {activeImage?.measurements?.meniscusThickness || 4.82} mm
                      </text>
                    </g>

                    {/* Measurement 4: Medial Joint Space Width */}
                    <g>
                      <line x1="172" y1="262" x2="172" y2="290" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 1" />
                      <rect x="180" y="295" width="52" height="14" rx="3" fill="#0B132B" stroke="#F59E0B" strokeWidth="0.8" />
                      <text x="206" y="303" fill="#F59E0B" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" textAnchor="middle" dominantBaseline="middle">
                        JSW: {activeImage?.measurements?.medialJSW || 3.4} mm
                      </text>
                    </g>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>

        {/* Compare Mode Split Dragger */}
        {isCompareMode && (
          <div
            className="absolute inset-y-0 z-20 w-8 flex items-center justify-center cursor-ew-resize pointer-events-auto"
            style={{ left: `calc(${compareSplit}% - 16px)` }}
            onMouseDown={(e) => {
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

      {/* ── BOTTOM ANATOMICAL STRUCTURE TOGGLE BAR ── */}
      <div className="h-11 px-4 bg-navy-900/90 border-t border-navy-800 flex items-center justify-between z-20 shrink-0 text-white text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">
            Active Layers:
          </span>

          <button
            onClick={() => onSelectStructure(selectedStructure === 'femur' ? null : 'femur')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-btn text-[11px] font-medium border transition-all ${
              isFemurVisible && (selectedStructure === 'femur' || selectedStructure === null)
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 font-semibold'
                : 'bg-navy-950/60 text-slate-400 border-navy-800 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>Femur</span>
          </button>

          <button
            onClick={() => onSelectStructure(selectedStructure === 'tibia' ? null : 'tibia')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-btn text-[11px] font-medium border transition-all ${
              isTibiaVisible && (selectedStructure === 'tibia' || selectedStructure === null)
                ? 'bg-slate-500/20 text-slate-200 border-slate-400/50 font-semibold'
                : 'bg-navy-950/60 text-slate-400 border-navy-800 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>Tibia</span>
          </button>

          <button
            onClick={() => onSelectStructure(selectedStructure === 'meniscus' ? null : 'meniscus')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-btn text-[11px] font-medium border transition-all ${
              isMeniscusVisible && (selectedStructure === 'meniscus' || selectedStructure === null)
                ? 'bg-coral-500/20 text-coral-300 border-coral-500/50 font-semibold'
                : 'bg-navy-950/60 text-slate-400 border-navy-800 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-coral-400" />
            <span>Medial Meniscus</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="hidden md:inline">Pan: Drag | Zoom: Wheel / +/-</span>
          <span className="text-teal-400 font-semibold hidden sm:inline">AI Calibrated</span>
        </div>
      </div>
    </div>
  );
}
