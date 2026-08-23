import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine,
  UploadCloud,
  Layers,
  Ruler,
  HelpCircle,
  Sparkles,
  Info,
  Maximize2,
  FileSpreadsheet,
  CheckCircle2,
  ChevronDown,
  Columns,
  PlusCircle,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MedicalImageViewer } from '@/components/imaging/MedicalImageViewer';
import { AIAnalysisPanel } from '@/components/imaging/AIAnalysisPanel';
import { MeasurementSummaryBar } from '@/components/imaging/MeasurementSummaryBar';
import { MultiImageSwitcherBar } from '@/components/imaging/MultiImageSwitcherBar';
import { ImageComparisonModal } from '@/components/imaging/ImageComparisonModal';
import { UploadPipelineModal } from '@/components/imaging/UploadPipelineModal';
import { INITIAL_DEMO_IMAGES, UploadedKneeImage } from '@/data/mockMultiImageData';

export function ImagingPage() {
  const navigate = useNavigate();
  const { id: caseParamId } = useParams<{ id: string }>();

  const [images, setImages] = useState<UploadedKneeImage[]>(INITIAL_DEMO_IMAGES);
  const [activeImageId, setActiveImageId] = useState<string>(INITIAL_DEMO_IMAGES[0].id);

  const [showOverlays, setShowOverlays] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [selectedStructure, setSelectedStructure] = useState<'all' | 'femur' | 'tibia' | 'meniscus' | null>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(caseParamId || 'KS-0241');

  const activeImage = images.find((img) => img.id === activeImageId) || images[0];

  const handleAnalysisComplete = () => {
    setShowOverlays(true);
    setShowMeasurements(true);
  };

  const handleSelectImage = (imgId: string) => {
    setActiveImageId(imgId);
  };

  return (
    <div className="page-content space-y-5 pb-12">
      {/* ── WORKSPACE TOP BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ds pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-input bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <ScanLine className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-ds-1 tracking-tight">
                AI-Assisted Demo Analysis
              </h1>
              <Badge variant="teal" size="sm">
                Case {selectedCase}
              </Badge>
              <Badge variant="outline" size="xs">
                Demo results — for clinical review
              </Badge>
            </div>
            <p className="text-ds-small text-ds-4 mt-0.5">
              AI-assisted anatomical segmentation, landmark detection, and caliper measurements
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Patient / Case Selector */}
          <select
            value={selectedCase}
            onChange={(e) => setSelectedCase(e.target.value)}
            className="h-9 rounded-input px-3 bg-ds-surface border border-ds text-ds-small text-ds-1 font-mono focus:border-teal-500 outline-none cursor-pointer"
          >
            <option value="KS-0241">KS-0241 · Demo Case (4 Scans)</option>
            <option value="KS-0242">KS-0242 · Marcus Sterling (Left AP)</option>
            <option value="KS-0243">KS-0243 · Arthur Pendelton (Right AP)</option>
            <option value="KS-0244">KS-0244 · Clara Martinez (Left AP)</option>
          </select>

          {/* New Multi-Image Analysis Button */}
          <Button
            id="btn-nav-new-multi-upload"
            variant="accent"
            size="sm"
            onClick={() => navigate('/imaging/new')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="font-semibold shadow-sm"
          >
            New Multi-Image Analysis
          </Button>
        </div>
      </div>

      {/* ── MULTI-IMAGE SWITCHER BAR ── */}
      <MultiImageSwitcherBar
        images={images}
        activeImageId={activeImageId}
        onSelectImage={handleSelectImage}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* ── MAIN WORKSPACE: LEFT (IMAGE VIEWER) + RIGHT (AI PANEL) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Medical Image Viewer (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0.85, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.85 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <MedicalImageViewer
                activeImage={activeImage}
                showOverlays={showOverlays}
                onToggleOverlays={setShowOverlays}
                showMeasurements={showMeasurements}
                onToggleMeasurements={setShowMeasurements}
                selectedStructure={selectedStructure}
                onSelectStructure={setSelectedStructure}
                isFullscreen={isFullscreen}
                onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
                onOpenCompareModal={() => setIsCompareModalOpen(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: AI Analysis Panel (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col">
          <AIAnalysisPanel
            activeImage={activeImage}
            showOverlays={showOverlays}
            onToggleOverlays={setShowOverlays}
            showMeasurements={showMeasurements}
            onToggleMeasurements={setShowMeasurements}
            selectedStructure={selectedStructure}
            onSelectStructure={setSelectedStructure}
          />
        </div>
      </div>

      {/* ── BOTTOM: MEASUREMENT SUMMARY STRIP ── */}
      <MeasurementSummaryBar activeImage={activeImage} />

      {/* ── SIDE-BY-SIDE SYNCHRONIZED COMPARISON MODAL ── */}
      <ImageComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        images={images}
        initialLeftId={activeImage.id}
        initialRightId={images.find((i) => i.id !== activeImage.id)?.id || images[0].id}
      />

      {/* ── UPLOAD PIPELINE MODAL ── */}
      <UploadPipelineModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />
    </div>
  );
}
