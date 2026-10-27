import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function Toast() {
  const { toast } = useProperties();

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type === 'error' ? 'toast-error' : ''}`}>
        {toast.type === 'error' ? (
          <AlertCircle size={20} color="var(--danger)" />
        ) : (
          <CheckCircle2 size={20} color="var(--primary)" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

