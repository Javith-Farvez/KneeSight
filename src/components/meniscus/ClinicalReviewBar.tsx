import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileEdit,
  Clock,
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';

export function ClinicalReviewBar() {
  const navigate = useNavigate();
  const { success, info } = useToast();
  const [reviewState, setReviewState] = useState<'pending' | 'accepted' | 'review_requested'>('pending');

  const handleAccept = () => {
    setReviewState('accepted');
    success(
      'Measurements Accepted',
      'Medial meniscus measurements (4.76mm average) verified by attending clinician.'
    );
  };

  const handleRequestReview = () => {
    setReviewState('review_requested');
    info(
      'Review Requested',
      'Case flagged for secondary musculoskeletal radiologist audit.'
    );
  };

  return (
    <Card noPad className="border border-ds bg-ds-surface overflow-hidden shadow-ds-e2">
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Review Status Details */}
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`w-10 h-10 rounded-input flex items-center justify-center shrink-0 ${
              reviewState === 'accepted'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : reviewState === 'review_requested'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                : 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
            }`}
          >
            {reviewState === 'accepted' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : reviewState === 'review_requested' ? (
              <Clock className="w-5 h-5" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display text-ds-small font-bold text-ds-1">
                Clinical Review & Diagnostic Sign-Off
              </h4>
              <Badge
                variant={
                  reviewState === 'accepted'
                    ? 'success'
                    : reviewState === 'review_requested'
                    ? 'warning'
                    : 'teal'
                }
                size="sm"
                dot
              >
                {reviewState === 'accepted'
                  ? 'Clinician Accepted'
                  : reviewState === 'review_requested'
                  ? 'Audit Queued'
                  : 'Pending Decision'}
              </Badge>
            </div>
            <p className="text-ds-caption text-ds-4 mt-0.5">
              Confirm automated morphometric calipers or queue for secondary specialist consultation
            </p>
          </div>
        </div>

        {/* Right: Three Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap self-end sm:self-auto">
          <Button
            id="accept-measurements-btn"
            variant={reviewState === 'accepted' ? 'secondary' : 'secondary'}
            size="sm"
            onClick={handleAccept}
            leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            className="font-medium"
          >
            {reviewState === 'accepted' ? '✓ Accepted' : 'Accept Measurements'}
          </Button>

          <Button
            id="request-review-btn"
            variant="ghost"
            size="sm"
            onClick={handleRequestReview}
            leftIcon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
          >
            Request Review
          </Button>

          <Button
            id="continue-to-implant-planning-btn"
            variant="accent"
            size="md"
            onClick={() => navigate('/implant-planning')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="font-semibold shadow-sm"
          >
            Continue to Implant Planning
          </Button>
        </div>
      </div>
    </Card>
  );
}
