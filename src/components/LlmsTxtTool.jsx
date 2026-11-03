'use client';

import { useState } from 'react';

// The llms.txt checker and generator on /tools/llms-txt-checker/; the work happens in /api/llms-txt.

const LEVEL = {
  error: { label: 'Error', cls: 'bg-red-50 text-red-800 border-red-200' },
  warning: { label: 'Fix', cls: 'bg-amber-50 text-amber-900 border-amber-200' },
  tip: { label: 'Tip', cls: 'bg-canvas-2 text-muted border-line' },
};

function Issue({ issue }) {
  const l = LEVEL[issue.level] || LEVEL.tip;
  return (
    <li className={`rounded-xl border px-4 py-3 text-[15px] leading-relaxed ${l.cls}`}>
      <span className="font-semibold">{l.label}</span>
      {issue.line ? <span className="opacity-70"> · line {issue.line}</span> : null}: {issue.message}
    </li>
  );
}

function Fact({ label, children }) {
  return (
    <div className="rounded-xl border border-line bg-canvas-2 px-4 py-3">
      <div className="text-xs uppercase tracking-wider text-faint">{label}</div>
      <div className="mt-1 text-[15px] text-ink">{children}</div>
    </div>
  );
}

function CheckResult({ r }) {
  const errors = (r.issues || []).filter((i) => i.level === 'error').length;
  const fixes = (r.issues || []).filter((i) => i.level === 'warning').length;
  const verdict = !r.found
    ? 'No llms.txt found'
    : errors
      ? `Found, with ${errors} error${errors > 1 ? 's' : ''}`
      : fixes
        ? `Found and readable, ${fixes} thing${fixes > 1 ? 's' : ''} to fix`
        : 'Found and follows the format';
  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="text-2xl font-semibold tracking-tight text-ink">{verdict}</p>
        <p className="mt-1 text-muted break-all">
          {r.file.url}
          {r.file.status ? ` · status ${r.file.status}` : r.file.error ? ` · ${r.file.error}` : ''}
        </p>
      </div>

      {!r.found && !r.issues?.length && (
        <p className="text-[15px] leading-relaxed text-muted max-w-3xl">
          There’s no file at that address. Switch to <strong className="text-ink">Generate</strong> to draft one from your sitemap, then publish it at
          the root of your site as <code>/llms.txt</code>.
        </p>
      )}

      {r.found && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Title">{r.title || '—'}</Fact>
          <Fact label="Sections">{r.sections.length ? r.sections.map((s) => `${s.name} (${s.links})`).join(', ') : 'None'}</Fact>
          <Fact label="Links">{r.linkCount}</Fact>
          <Fact label="Links checked">{r.linksChecked ? `${r.linksChecked}, ${r.brokenLinks.length} not working` : 'None to check'}</Fact>
        </div>
      )}

      {r.issues?.length > 0 && (
        <ul className="space-y-2">
          {r.issues.map((issue, i) => (
            <Issue key={i} issue={issue} />
          ))}
        </ul>
      )}

      {r.brokenLinks?.length > 0 && (
        <div>
          <p className="font-semibold text-ink">Links that didn’t answer</p>
          <ul className="mt-2 space-y-1 text-[15px] text-muted">
            {r.brokenLinks.map((b) => (
              <li key={b.url} className="break-all">
                {b.url} · {b.status ? `status ${b.status}` : b.error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Fact label="AI crawlers in robots.txt">
          {r.blocked.length ? <span className="text-red-800">Blocked: {r.blocked.join(', ')}</span> : `None of ${r.crawlers.join(', ')} is blocked`}
        </Fact>
        <Fact label="llms-full.txt">{r.llmsFull ? 'Found' : 'Not found (optional)'}</Fact>
      </div>
    </div>
  );
}

function GenerateResult({ r, onChange }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(r.draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([r.draft], { type: 'text/plain' }));
    a.download = 'llms.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <div className="mt-8 space-y-4">
      <p className="text-[15px] leading-relaxed text-muted max-w-3xl">
        A draft from {r.pagesUsed} page{r.pagesUsed === 1 ? '' : 's'} found through your {r.source}. Edit it before publishing: rewrite the summary in plain
        words, keep the pages that matter most, and make each note say what the page covers.
      </p>
      <textarea
        value={r.draft}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="w-full min-h-[420px] rounded-2xl border border-line bg-canvas-2 p-5 font-mono text-[13px] leading-relaxed text-ink"
      />
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={copy} className="px-5 py-3 bg-ink !text-canvas font-bold rounded-xl hover:bg-accent transition-colors">
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button type="button" onClick={download} className="px-5 py-3 font-semibold border border-line rounded-xl hover:bg-ink/5">
          Download llms.txt
        </button>
      </div>
    </div>
  );
}

export default function LlmsTxtTool() {
  const [mode, setMode] = useState('check');
  const [site, setSite] = useState('');
  const [state, setState] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const run = async (e) => {
    e.preventDefault();
    setState('working');
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/llms-txt/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ site, mode }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setResult({ mode, ...json });
    } catch (err) {
      setError(err.message);
    } finally {
      setState('idle');
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-canvas p-6 md:p-10">
      <div className="inline-flex rounded-full border border-line p-1" role="tablist">
        {[
          ['check', 'Check'],
          ['generate', 'Generate'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            onClick={() => {
              setMode(id);
              setResult(null);
              setError('');
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${mode === id ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <form onSubmit={run} className="mt-6 flex flex-col sm:flex-row gap-3">
        <label htmlFor="llms-site" className="sr-only">
          Website address
        </label>
        <input
          id="llms-site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="example.com"
          inputMode="url"
          autoComplete="url"
          required
          className="flex-1 min-w-0 px-4 py-3 text-base bg-canvas-2 border border-line rounded-xl text-ink"
        />
        <button type="submit" disabled={state === 'working'} className="px-6 py-3 bg-ink !text-canvas font-bold rounded-xl hover:bg-accent transition-colors disabled:opacity-60">
          {state === 'working' ? (mode === 'check' ? 'Checking…' : 'Reading your pages…') : mode === 'check' ? 'Check llms.txt' : 'Generate llms.txt'}
        </button>
      </form>
      <p className="mt-3 text-sm text-faint">
        {mode === 'check'
          ? 'Reads /llms.txt, checks it against the format, tests up to 20 of its links and looks at robots.txt for AI crawlers.'
          : 'Reads your sitemap (or your home page’s links) and the titles and descriptions of up to 25 pages. Takes a few seconds.'}
      </p>
      {error && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</p>}
      {result?.mode === 'check' && <CheckResult r={result} />}
      {result?.mode === 'generate' && <GenerateResult r={result} onChange={(draft) => setResult({ ...result, draft })} />}
    </div>
  );
}
