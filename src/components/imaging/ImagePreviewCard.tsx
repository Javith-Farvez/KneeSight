import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Maximize2, FileImage, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { UploadedKneeImage } from '@/data/mockMultiImageData';
import { cn } from '@/lib/utils';

interface ImagePreviewCardProps {
  image: UploadedKneeImage;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onPreview: (image: UploadedKneeImage) => void;
}

export function ImagePreviewCard({
  image,
  onToggleSelect,
  onRemove,
  onPreview,
}: ImagePreviewCardProps) {
  const isSelected = image.selected;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: 1,
        scale: isSelected ? 1.01 : 1,
      }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      onClick={() => onToggleSelect(image.id)}
      className={cn(
        'group relative rounded-panel border p-3.5 transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)] cursor-pointer select-none',
        isSelected
          ? 'bg-teal-500/[0.04] dark:bg-teal-500/[0.08] border-teal-500 shadow-ds-e2'
          : 'bg-ds-surface border-ds hover:border-ds-2 shadow-ds-e1 opacity-80 hover:opacity-100'
      )}
    >
      {/* Top Bar: Image Number, Modality, & Actions */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-ds-surface-2 border border-ds text-ds-2">
            Image 0{image.imageNumber}
          </span>
          <Badge
            variant={image.modality === 'Radiograph' ? 'teal' : image.modality === 'MRI' ? 'coral' : 'info'}
            size="xs"
          >
            {image.modality}
          </Badge>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onPreview(image)}
            className="p-1 rounded text-ds-4 hover:text-ds-1 hover:bg-ds-surface-2 transition-colors"
            title="Full Preview"
            aria-label={`Preview ${image.filename}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onRemove(image.id)}
            className="p-1 rounded text-ds-4 hover:text-coral-500 hover:bg-coral-500/10 transition-colors"
            title="Remove Image"
            aria-label={`Remove ${image.filename}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image Thumbnail with Overlay Frame */}
      <div className="relative aspect-[4/3] rounded-input bg-navy-950 overflow-hidden border border-ds mb-3 flex items-center justify-center">
        <img
          src={image.previewUrl}
          alt={image.filename}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Anatomical calibration HUD tag */}
        <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-navy-950/80 backdrop-blur-xs font-mono text-[9px] text-teal-300 border border-teal-500/30">
          {image.pixelSpacing}
        </div>

        {/* View Angle Tag */}
        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-navy-950/80 backdrop-blur-xs text-[9px] text-slate-300 font-medium">
          {image.subType}
        </div>
      </div>

      {/* Card Info & Selection Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-xs font-semibold text-ds-1 truncate" title={image.filename}>
            {image.filename}
          </div>
          <div className="text-[11px] text-ds-4 truncate mt-0.5">
            {image.viewName} · {image.filesize}
          </div>
        </div>

        {/* Selection Checkbox & Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className={cn(
              'w-5 h-5 rounded-btn flex items-center justify-center border transition-all duration-[180ms]',
              isSelected
                ? 'bg-teal-500 border-teal-500 text-white shadow-xs'
                : 'border-ds bg-ds-surface text-transparent hover:border-teal-500/50'
            )}
          >
            <Check className="w-3.5 h-3.5" strokeWidth={3} />
          </div>
          <span
            className={cn(
              'text-[11px] font-semibold transition-colors duration-[180ms]',
              isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-ds-4'
            )}
          >
            {isSelected ? 'Selected' : 'Select'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
