import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine,
  Layers,
  Sparkles,
  ArrowLeft,
  FileCheck2,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MultiImageDropzone } from '@/components/imaging/MultiImageDropzone';
import { ImagePreviewCard } from '@/components/imaging/ImagePreviewCard';
import { AnalysisSetupPanel } from '@/components/imaging/AnalysisSetupPanel';
import { AIProcessingScreen } from '@/components/imaging/AIProcessingScreen';
import { ImagePreviewModal } from '@/components/imaging/ImagePreviewModal';
import { analysisService } from '@/services/analysis';
import { UploadedKneeImage, INITIAL_DEMO_IMAGES } from '@/data/mockMultiImageData';

export function NewImagingAnalysisPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<UploadedKneeImage[]>(INITIAL_DEMO_IMAGES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<UploadedKneeImage | null>(null);

  // Toggle selection on individual image
  const handleToggleSelect = (id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, selected: !img.selected } : img))
    );
  };

  // Remove individual image
  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Add new images from file dropzone
  const handleAddImages = (newImgs: UploadedKneeImage[]) => {
    setImages((prev) => [...prev, ...newImgs].slice(0, 4));
  };

  // Preset demo study loader
  const handleLoadPreset = () => {
    setImages(INITIAL_DEMO_IMAGES);
  };

  // Start analysis trigger with API integration
  const handleStartAnalysis = (analysisType: string) => {
    setIsProcessing(true);
    // Send asynchronous API request to backend (FastAPI -> Mock AI Analysis)
    analysisService.startAnalysis('KS-0241', analysisType).catch((err) => {
      console.warn('[KneeSight API] Backend request note:', err);
    });
  };

  // View results after processing
  const handleViewResults = () => {
    navigate('/imaging/KS-0241');
  };

  const selectedCount = images.filter((img) => img.selected).length;

  return (
    <div className="page-content space-y-6 pb-16">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ds pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/imaging')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="text-ds-3 hover:text-ds-1 -ml-2"
          >
            Back
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ds-1 tracking-tight">
                New Imaging Analysis
              </h1>
              <Badge variant="teal" size="sm">
                Multi-View Pipeline
              </Badge>
            </div>
            <p className="text-ds-small text-ds-3 mt-0.5">
              Upload knee imaging to begin AI-assisted anatomical analysis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-ds-surface border border-ds text-xs font-mono text-ds-3">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>AI Model v2.4 Active</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT WORKSPACE ── */}
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <AIProcessingScreen
              images={images}
              onViewResults={handleViewResults}
              onReset={() => setIsProcessing(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* ── LEFT COLUMN: UPLOAD DROPZONE & PREVIEW GRID (7 cols) ── */}
            <div className="lg:col-span-7 space-y-5">
              {/* Dropzone area */}
              <MultiImageDropzone
                images={images}
                onAddImages={handleAddImages}
                onLoadPreset={handleLoadPreset}
                maxImages={4}
              />

              {/* Preview Cards Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-ds-label uppercase tracking-wider text-ds-4 font-bold">
                      Loaded Scans ({images.length} of 4)
                    </span>
                    <Badge variant="outline" size="xs">
                      {selectedCount} Selected
                    </Badge>
                  </div>

                  {images.length > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() =>
                          setImages((prev) => prev.map((img) => ({ ...img, selected: true })))
                        }
                        className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                      >
                        Select All
                      </button>
                      <span className="text-ds-4">•</span>
                      <button
                        onClick={() =>
                          setImages((prev) => prev.map((img) => ({ ...img, selected: false })))
                        }
                        className="text-ds-3 hover:text-ds-1"
                      >
                        Deselect All
                      </button>
                    </div>
                  )}
                </div>

                {/* Empty State */}
                {images.length === 0 ? (
                  <div className="p-8 rounded-panel bg-ds-surface border border-ds text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ds-1">Ready for imaging</h4>
                      <p className="text-ds-small text-ds-4 mt-0.5">
                        Upload up to 4 knee images to begin.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={handleLoadPreset}
                      >
                        Choose Images
                      </Button>
                      <Button variant="secondary" size="sm" onClick={handleLoadPreset}>
                        Load Demo Study
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* 2x2 Grid of Image Cards on Desktop, Horizontal Scroll on Mobile */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <AnimatePresence>
                      {images.map((img) => (
                        <ImagePreviewCard
                          key={img.id}
                          image={img}
                          onToggleSelect={handleToggleSelect}
                          onRemove={handleRemove}
                          onPreview={setPreviewImage}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN: ANALYSIS SETUP PANEL (5 cols) ── */}
            <div className="lg:col-span-5">
              <AnalysisSetupPanel
                selectedCount={selectedCount}
                totalCount={images.length}
                onStartAnalysis={handleStartAnalysis}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Image Preview Modal */}
      <ImagePreviewModal
        image={previewImage}
        isOpen={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}
