'use client';

import { useState, useCallback } from 'react';
import type { SalesFunnelsTab } from './sales-funnels.types';

export function useSalesFunnels() {
  const [tab, setTab] = useState<SalesFunnelsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Sales Funnels' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
