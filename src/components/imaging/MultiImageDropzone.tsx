import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, FileImage, AlertCircle, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { UploadedKneeImage, INITIAL_DEMO_IMAGES } from '@/data/mockMultiImageData';

interface MultiImageDropzoneProps {
  images: UploadedKneeImage[];
  onAddImages: (newImgs: UploadedKneeImage[]) => void;
  onLoadPreset: () => void;
  maxImages?: number;
}

export function MultiImageDropzone({
  images,
  onAddImages,
  onLoadPreset,
  maxImages = 4,
}: MultiImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);

    const validFiles: File[] = [];
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'dcm', 'dicom', 'webp'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (allowedExtensions.includes(ext) || file.type.startsWith('image/')) {
        validFiles.push(file);
      } else {
        setErrorMessage(`Unsupported file format "${file.name}". Please upload PNG, JPG, or DICOM files.`);
        return;
      }
    }

    const currentCount = images.length;
    const remainingSlots = maxImages - currentCount;

    if (remainingSlots <= 0) {
      setErrorMessage(`Maximum ${maxImages} images can be analyzed at once.`);
      return;
    }

    const filesToAdd = validFiles.slice(0, remainingSlots);
    if (validFiles.length > remainingSlots) {
      setErrorMessage(`Only ${remainingSlots} more image(s) added. Maximum is ${maxImages}.`);
    }

    const newKneeImages: UploadedKneeImage[] = filesToAdd.map((file, idx) => {
      const nextNum = currentCount + idx + 1;
      const objectUrl = URL.createObjectURL(file);
      const isMri = file.name.toLowerCase().includes('mri') || file.name.toLowerCase().includes('t2');
      const isCt = file.name.toLowerCase().includes('ct') || file.name.toLowerCase().includes('axial');

      return {
        id: `custom-img-${Date.now()}-${idx}`,
        imageNumber: nextNum,
        filename: file.name,
        modality: isMri ? 'MRI' : isCt ? 'CT' : 'Radiograph',
        subType: isMri ? 'Proton-Density FS' : isCt ? 'Axial Bone Algorithm' : 'AP Weight-Bearing',
        viewName: `Knee Study Scan #${nextNum}`,
        filesize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        previewUrl: objectUrl,
        selected: true,
        measurements: {
          femoralWidth: +(72.5 + Math.random() * 2).toFixed(1),
          tibialWidth: +(70.8 + Math.random() * 1.8).toFixed(1),
          meniscusThickness: +(4.7 + Math.random() * 0.3).toFixed(2),
          medialJSW: 3.42,
          lateralJSW: 5.18,
        },
        qualityScores: {
          femur: 96,
          tibia: 95,
          meniscus: 91,
          overall: 94,
        },
        structures: {
          femur: true,
          tibia: true,
          medialMeniscus: true,
          lateralMeniscus: true,
          patella: true,
        },
        seriesNumber: `SER-00${nextNum}/04`,
        pixelSpacing: '0.14 mm/px',
        acquisitionDate: '2026-08-18 09:30 EST',
      };
    });

    onAddImages(newKneeImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp,.dcm,.dicom"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-panel p-8 text-center cursor-pointer transition-all duration-200 select-none ${
          isDragging
            ? 'border-teal-500 bg-teal-500/10 shadow-ds-e2 scale-[1.005]'
            : 'border-ds hover:border-teal-500/50 bg-ds-surface hover:bg-ds-surface-2/50'
        }`}
      >
        {/* Minimal Knee / Anatomical Visualization Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Femur head/shaft */}
            <path d="M10 2 C10 6, 8 8, 8 11 C8 13, 10 14, 12 14 C14 14, 16 13, 16 11 C16 8, 14 6, 14 2" />
            {/* Joint space gap */}
            <path d="M7 15.5 C10 15, 14 15, 17 15.5" stroke="#FF6B5E" strokeWidth="2" strokeDasharray="1 2" />
            {/* Tibial plateau */}
            <path d="M7 17 C9 17, 11 18, 12 18 C13 18, 15 17, 17 17 L15 22 L9 22 Z" />
          </svg>
        </div>

        <h3 className="font-display text-lg font-bold text-ds-1 tracking-tight">
          Upload Knee Imaging
        </h3>
        <p className="text-ds-small text-ds-3 mt-1">
          Drag & drop images here or{' '}
          <span className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2">
            Choose Images
          </span>
        </p>

        <div className="flex items-center justify-center gap-3 mt-4 text-[11px] font-mono text-ds-4 uppercase tracking-wider">
          <span>PNG • JPG • JPEG • DICOM demo</span>
          <span>•</span>
          <span>Up to {maxImages} images</span>
        </div>
      </div>

      {/* Preset Demo Study Loader Bar */}
      <div className="flex items-center justify-between p-3 rounded-btn bg-teal-500/10 border border-teal-500/25">
        <div className="flex items-center gap-2 text-xs text-ds-1">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
          <span className="font-medium">
            Demo Examiner Shortcut: Load standard 4-view clinical knee study
          </span>
        </div>
        <Button
          variant="secondary"
          size="xs"
          onClick={onLoadPreset}
          className="border-teal-500/40 text-teal-700 dark:text-teal-300 font-semibold shrink-0"
        >
          Load 4 Demo Images
        </Button>
      </div>

      {/* Error Message Alert */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-btn bg-coral-500/10 border border-coral-500/30 text-xs text-coral-600 dark:text-coral-400"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="ml-auto font-bold hover:underline"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </div>
  );
}
