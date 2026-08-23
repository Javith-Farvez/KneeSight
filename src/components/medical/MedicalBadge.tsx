import React from 'react';
import { Badge, BadgeVariant } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface MedicalBadgeProps {
  type: 'ai-assisted' | 'for-review' | 'suggested' | 'approved' | 'processing' | 'flagged';
  className?: string;
  size?: 'sm' | 'md';
}

const configs: Record<MedicalBadgeProps['type'], { label: string; variant: BadgeVariant; dot: boolean }> = {
  'ai-assisted': { label: 'AI-Assisted',         variant: 'teal',    dot: true  },
  'for-review':  { label: 'For Clinical Review',  variant: 'warning', dot: true  },
  'suggested':   { label: 'AI Suggested',         variant: 'teal',    dot: false },
  'approved':    { label: 'Clinician Approved',   variant: 'success', dot: true  },
  'processing':  { label: 'AI Processing…',       variant: 'info',    dot: true  },
  'flagged':     { label: 'Flagged — Review',     variant: 'danger',  dot: true  },
};

export function MedicalBadge({ type, className, size = 'sm' }: MedicalBadgeProps) {
  const { label, variant, dot } = configs[type];
  return (
    <Badge variant={variant} size={size} dot={dot} className={cn('font-semibold', className)}>
      {label}
    </Badge>
  );
}
