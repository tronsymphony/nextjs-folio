'use client';

import { Printer } from 'lucide-react';

export default function PrintButton({ label = 'Print or save as PDF' }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-700 hover:bg-white/5 transition-colors"
    >
      <Printer className="w-4 h-4" /> {label}
    </button>
  );
}
