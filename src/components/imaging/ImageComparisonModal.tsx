import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Columns,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Ruler,
  Sliders,
  ChevronDown,
  Check,
} from 'lucide-react';
import { UploadedKneeImage } from '@/data/mockMultiImageData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import heroKneeImg from '@/assets/hero-knee.jpg';

interface ImageComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: UploadedKneeImage[];
  initialLeftId?: string;
  initialRightId?: string;
}

export function ImageComparisonModal({
  isOpen,
  onClose,
  images,
  initialLeftId,
  initialRightId,
}: ImageComparisonModalProps) {
  const [leftImageId, setLeftImageId] = useState<string>(
    initialLeftId || images[0]?.id || 'img-01'
  );
  const [rightImageId, setRightImageId] = useState<string>(
    initialRightId || images[1]?.id || images[0]?.id || 'img-02'
  );

  // Synchronized view state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showOverlays, setShowOverlays] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);

  // Reset synchronized state on open
  useEffect(() => {
    if (isOpen) {
      if (initialLeftId) setLeftImageId(initialLeftId);
      if (initialRightId) setRightImageId(initialRightId);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [isOpen, initialLeftId, initialRightId]);

  if (!isOpen) return null;

  const leftImage = images.find((i) => i.id === leftImageId) || images[0];
  const rightImage = images.find((i) => i.id === rightImageId) || images[1] || images[0];

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
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
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-2 sm:p-4 bg-navy-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative w-full max-w-7xl h-[92vh] flex flex-col bg-navy-950 rounded-panel border border-ds overflow-hidden shadow-2xl"
        >
          {/* ── TOP HEADER / TOOLBAR ── */}
          <div className="h-14 px-4 bg-navy-900/95 border-b border-navy-800 flex items-center justify-between z-20 shrink-0 text-white select-none">
            {/* Title & Sync indicator */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-input bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center">
                <Columns className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold text-white tracking-tight">
                    Synchronized Dual-Image Comparison
                  </h3>
                  <Badge variant="teal" size="xs">
                    Synced Navigation
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400">
                  Case KS-0241 · Pan, Zoom, and AI Overlays are synchronized across both viewports
                </p>
              </div>
            </div>

            {/* Sync Tools */}
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center bg-navy-950/80 rounded-input border border-navy-800 p-0.5">
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
                  className="p-1.5 rounded hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 font-mono text-[11px] text-teal-300 min-w-[42px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.2, 3.5))}
                  className="p-1.5 rounded hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="p-2 rounded-btn bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
                title="Reset Synced View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Overlays Toggle */}
              <button
                onClick={() => setShowOverlays(!showOverlays)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn border text-xs font-medium transition-all ${
                  showOverlays
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                    : 'bg-navy-950/80 border-navy-800 text-slate-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Overlays</span>
              </button>

              {/* Measurements Toggle */}
              <button
                onClick={() => setShowMeasurements(!showMeasurements)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn border text-xs font-medium transition-all ${
                  showMeasurements
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                    : 'bg-navy-950/80 border-navy-800 text-slate-400'
                }`}
              >
                <Ruler className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Measurements</span>
              </button>

              {/* Close Modal */}
              <button
                onClick={onClose}
                className="p-2 rounded-btn bg-navy-950/80 border border-navy-800 text-slate-400 hover:text-white hover:bg-coral-500/20 hover:border-coral-500/40 transition-colors ml-2"
                title="Close Comparison"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── SPLIT VIEWPORT CONTAINER ── */}
          <div
            className="relative flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-navy-800 bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {/* ── LEFT VIEWPORT ── */}
            <div className="relative flex flex-col h-full overflow-hidden">
              {/* Left Sub-Header Selector */}
              <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between bg-navy-950/85 backdrop-blur-sm px-3 py-1.5 rounded-input border border-navy-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-teal-400 font-bold font-mono">Image A:</span>
                  <div className="relative">
                    <select
                      value={leftImageId}
                      onChange={(e) => setLeftImageId(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-navy-900 border border-navy-700 text-slate-200 text-xs font-semibold rounded px-2 py-1 pr-6 outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      {images.map((img) => (
                        <option key={img.id} value={img.id}>
                          Image 0{img.imageNumber} · {img.filename} ({img.modality})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <Badge variant="teal" size="xs">
                  {leftImage.modality}
                </Badge>
              </div>

              {/* Viewport Canvas */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                <div
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transition: isPanning ? 'none' : 'transform 0.08s ease-out',
                  }}
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={leftImage.previewUrl || heroKneeImg}
                    alt={leftImage.filename}
                    className="max-h-[460px] w-auto object-contain select-none pointer-events-none filter contrast-125"
                    draggable={false}
                  />

                  {/* SVG Overlays */}
                  {showOverlays && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 500 500"
                    >
                      <path
                        d="M 120 40 C 130 140, 140 210, 160 250 C 175 270, 210 275, 235 260 C 255 245, 265 245, 285 260 C 310 275, 345 270, 360 250 C 380 210, 390 140, 400 40 Z"
                        fill="rgba(46, 196, 182, 0.16)"
                        stroke="#2EC4B6"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M 145 295 C 190 292, 235 285, 260 272 C 285 285, 330 292, 375 295 C 365 370, 350 440, 335 480 L 185 480 C 170 440, 155 370, 145 295 Z"
                        fill="rgba(203, 213, 225, 0.15)"
                        stroke="#CBD5E1"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M 160 268 C 175 266, 195 268, 205 274 C 195 284, 175 286, 160 284 C 152 280, 152 272, 160 268 Z"
                        fill="rgba(255, 107, 107, 0.18)"
                        stroke="#FF6B6B"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}

                  {/* Caliper Measurement Overlay */}
                  {showMeasurements && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 500 500"
                    >
                      <line x1="135" y1="225" x2="385" y2="225" stroke="#2EC4B6" strokeWidth="1.6" strokeDasharray="4 2" />
                      <circle cx="135" cy="225" r="3" fill="#2EC4B6" />
                      <circle cx="385" cy="225" r="3" fill="#2EC4B6" />
                      <rect x="225" y="212" width="70" height="18" rx="4" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1" />
                      <text x="260" y="224" fill="#2EC4B6" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        {leftImage.measurements.femoralWidth} mm
                      </text>
                    </svg>
                  )}
                </div>
              </div>

              {/* Left Bottom HUD */}
              <div className="absolute bottom-2 inset-x-3 flex items-center justify-between font-mono text-[10px] text-slate-400 bg-navy-950/80 p-1.5 rounded border border-navy-800 pointer-events-none">
                <span>FW: {leftImage.measurements.femoralWidth} mm</span>
                <span>TW: {leftImage.measurements.tibialWidth} mm</span>
                <span>MT: {leftImage.measurements.meniscusThickness} mm</span>
              </div>
            </div>

            {/* ── RIGHT VIEWPORT ── */}
            <div className="relative flex flex-col h-full overflow-hidden">
              {/* Right Sub-Header Selector */}
              <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between bg-navy-950/85 backdrop-blur-sm px-3 py-1.5 rounded-input border border-navy-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-teal-400 font-bold font-mono">Image B:</span>
                  <div className="relative">
                    <select
                      value={rightImageId}
                      onChange={(e) => setRightImageId(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-navy-900 border border-navy-700 text-slate-200 text-xs font-semibold rounded px-2 py-1 pr-6 outline-none focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      {images.map((img) => (
                        <option key={img.id} value={img.id}>
                          Image 0{img.imageNumber} · {img.filename} ({img.modality})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <Badge variant="coral" size="xs">
                  {rightImage.modality}
                </Badge>
              </div>

              {/* Viewport Canvas */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                <div
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transition: isPanning ? 'none' : 'transform 0.08s ease-out',
                  }}
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={rightImage.previewUrl || heroKneeImg}
                    alt={rightImage.filename}
                    className="max-h-[460px] w-auto object-contain select-none pointer-events-none filter contrast-125"
                    draggable={false}
                  />

                  {/* SVG Overlays */}
                  {showOverlays && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 500 500"
                    >
                      <path
                        d="M 120 40 C 130 140, 140 210, 160 250 C 175 270, 210 275, 235 260 C 255 245, 265 245, 285 260 C 310 275, 345 270, 360 250 C 380 210, 390 140, 400 40 Z"
                        fill="rgba(46, 196, 182, 0.16)"
                        stroke="#2EC4B6"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M 145 295 C 190 292, 235 285, 260 272 C 285 285, 330 292, 375 295 C 365 370, 350 440, 335 480 L 185 480 C 170 440, 155 370, 145 295 Z"
                        fill="rgba(203, 213, 225, 0.15)"
                        stroke="#CBD5E1"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M 160 268 C 175 266, 195 268, 205 274 C 195 284, 175 286, 160 284 C 152 280, 152 272, 160 268 Z"
                        fill="rgba(255, 107, 107, 0.18)"
                        stroke="#FF6B6B"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}

                  {/* Caliper Measurement Overlay */}
                  {showMeasurements && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 500 500"
                    >
                      <line x1="135" y1="225" x2="385" y2="225" stroke="#2EC4B6" strokeWidth="1.6" strokeDasharray="4 2" />
                      <circle cx="135" cy="225" r="3" fill="#2EC4B6" />
                      <circle cx="385" cy="225" r="3" fill="#2EC4B6" />
                      <rect x="225" y="212" width="70" height="18" rx="4" fill="#0B132B" stroke="#2EC4B6" strokeWidth="1" />
                      <text x="260" y="224" fill="#2EC4B6" fontSize="10" fontFamily="IBM Plex Mono, monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        {rightImage.measurements.femoralWidth} mm
                      </text>
                    </svg>
                  )}
                </div>
              </div>

              {/* Right Bottom HUD */}
              <div className="absolute bottom-2 inset-x-3 flex items-center justify-between font-mono text-[10px] text-slate-400 bg-navy-950/80 p-1.5 rounded border border-navy-800 pointer-events-none">
                <span>FW: {rightImage.measurements.femoralWidth} mm</span>
                <span>TW: {rightImage.measurements.tibialWidth} mm</span>
                <span>MT: {rightImage.measurements.meniscusThickness} mm</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
