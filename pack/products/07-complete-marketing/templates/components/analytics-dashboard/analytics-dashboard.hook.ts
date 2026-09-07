'use client';

import { useState, useCallback } from 'react';
import type { AnalyticsDashboardTab } from './analytics-dashboard.types';

export function useAnalyticsDashboard() {
  const [tab, setTab] = useState<AnalyticsDashboardTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Analytics Dashboard' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
