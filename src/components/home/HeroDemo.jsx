'use client';

import { useState } from 'react';
import SyncDemo from './SyncDemo';
import AuditDemo from './AuditDemo';
import SeoDemo from './SeoDemo';

// The homepage hero's demo: one tab per line of work, each something the
// visitor can try. Opens on the NetSuite sync, which plays one order itself.

const TABS = [
  { id: 'sync', label: 'NetSuite sync', Demo: SyncDemo },
  { id: 'audit', label: 'App audit', Demo: AuditDemo },
  { id: 'seo', label: 'Technical SEO', Demo: SeoDemo },
];

export default function HeroDemo() {
  const [tab, setTab] = useState('sync');
  const { Demo } = TABS.find((t) => t.id === tab);

  return (
    <div className="w-full max-w-[480px] mx-auto lg:mr-0">
      <div role="tablist" aria-label="Try a line of work" className="flex border-b border-line mb-5">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-baseline gap-2 pb-3 -mb-px border-b-2 text-left text-[15px] font-medium tracking-[-0.02em] transition-colors ${
              tab === t.id ? 'border-accent text-ink' : 'border-transparent text-faint hover:text-ink'
            }`}
          >
            <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="lg:min-h-[560px]">
        <Demo />
      </div>
    </div>
  );
}
