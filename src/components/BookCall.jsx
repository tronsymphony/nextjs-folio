'use client';

import Cal from '@calcom/embed-react';

export default function BookCall({ calLink }) {
  return (
    <Cal
      calLink={calLink}
      config={{ layout: 'month_view', theme: 'dark' }}
      style={{ width: '100%', height: '100%', minHeight: 640, overflow: 'auto' }}
    />
  );
}
