'use client';

import { useState, useCallback } from 'react';
import type { DashboardShellsTab } from './dashboard-shells.types';

export function useDashboardShells() {
  const [tab, setTab] = useState<DashboardShellsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Dashboard Shells' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
