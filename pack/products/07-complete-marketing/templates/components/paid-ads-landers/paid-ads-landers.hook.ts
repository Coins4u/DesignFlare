'use client';

import { useState, useCallback } from 'react';
import type { PaidAdsLandersTab } from './paid-ads-landers.types';

export function usePaidAdsLanders() {
  const [tab, setTab] = useState<PaidAdsLandersTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Paid Ads Landers' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
