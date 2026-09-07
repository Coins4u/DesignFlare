'use client';

import { useState, useCallback } from 'react';
import type { ClientHandoffDocsTab } from './client-handoff-docs.types';

export function useClientHandoffDocs() {
  const [tab, setTab] = useState<ClientHandoffDocsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Client Handoff Docs' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
