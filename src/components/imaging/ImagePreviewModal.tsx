import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { UploadedKneeImage } from '@/data/mockMultiImageData';

interface ImagePreviewModalProps {
  image: UploadedKneeImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ImagePreviewModal({ image, isOpen, onClose }: ImagePreviewModalProps) {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Image 0${image.imageNumber} · ${image.filename}`}
      description={`${image.modality} · ${image.subType} · ${image.filesize}`}
      size="lg"
      footer={
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 font-mono text-xs text-ds-3">
            <span>Pixel Spacing: {image.pixelSpacing}</span>
            <span>•</span>
            <span>Acquired: {image.acquisitionDate}</span>
          </div>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      }
    >
      <div className="relative aspect-[4/3] rounded-panel bg-navy-950 overflow-hidden border border-ds flex items-center justify-center">
        <img
          src={image.previewUrl}
          alt={image.filename}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="teal" size="sm">
            Calibrated DICOM
          </Badge>
        </div>
      </div>
    </Modal>
  );
}
