import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export function ForgotPasswordModal({ isOpen, onClose, initialEmail = '' }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid medical institutional email address.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  const handleResetState = () => {
    setSent(false);
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetState}
      title="Reset Clinical Access Password"
      size="sm"
    >
      {sent ? (
        <div className="space-y-4 text-center py-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-ds-body text-ds-1">Reset Instructions Sent</h4>
            <p className="text-ds-small text-ds-3 mt-1">
              If an account exists for <strong className="text-ds-1">{email}</strong>, a prototype recovery link has been generated.
            </p>
          </div>
          <div className="p-3 rounded-card bg-ds-surface-2 border border-ds text-[11px] text-ds-4 text-left">
            <strong>Prototype Note:</strong> In this evaluation build, credentials are simulated locally. You can also sign in directly using the 1-Click Demo Accounts.
          </div>
          <Button variant="accent" fullWidth onClick={handleResetState}>
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-ds-small text-ds-3">
            Enter your institutional email address to receive password recovery instructions.
          </p>

          <Input
            id="forgot-email"
            label="Institutional Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="surgeon@hospital.org"
            leftIcon={<Mail className="w-4 h-4" />}
            errorText={error}
            required
            autoFocus
          />

          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={handleResetState}>
              Cancel
            </Button>
            <Button
              variant="accent"
              type="submit"
              loading={loading}
            >
              {loading ? 'Sending Link…' : 'Send Recovery Link'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
