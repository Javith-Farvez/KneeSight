import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Columns } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { UploadedKneeImage } from '@/data/mockMultiImageData';
import { cn } from '@/lib/utils';

interface MultiImageSwitcherBarProps {
  images: UploadedKneeImage[];
  activeImageId: string;
  onSelectImage: (id: string) => void;
  onOpenCompare: () => void;
}

export function MultiImageSwitcherBar({
  images,
  activeImageId,
  onSelectImage,
  onOpenCompare,
}: MultiImageSwitcherBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-panel bg-ds-surface border border-ds shadow-ds-e1">
      {/* Left: Study Series Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ds-4 mr-2 hidden sm:flex">
          <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Study Scans:</span>
        </div>

        {images.map((img) => {
          const isActive = img.id === activeImageId;

          return (
            <button
              key={img.id}
              id={`image-tab-${img.id}`}
              onClick={() => onSelectImage(img.id)}
              className={cn(
                'relative flex items-center gap-2 px-3 py-1.5 rounded-btn text-xs font-semibold transition-all duration-[180ms]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40',
                isActive
                  ? 'text-teal-900 dark:text-teal-100 bg-teal-500/15 border border-teal-500/40 shadow-xs'
                  : 'text-ds-3 hover:text-ds-1 hover:bg-ds-surface-2 border border-transparent'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-image-tab"
                  className="absolute inset-0 rounded-btn bg-teal-500/15 border border-teal-500/40 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="font-mono text-[11px] font-bold">Image 0{img.imageNumber}</span>
              <span className="text-[10px] text-ds-4 font-normal hidden md:inline">
                ({img.modality})
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Right: Compare Action Trigger */}
      <button
        id="btn-compare-multi-images"
        onClick={onOpenCompare}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold',
          'bg-ds-surface-2 border border-ds text-ds-2 hover:text-ds-1 hover:border-teal-500/40',
          'transition-all duration-[180ms] shadow-xs'
        )}
      >
        <Columns className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
        <span>Compare Images Side-by-Side</span>
      </button>
    </div>
  );
}
