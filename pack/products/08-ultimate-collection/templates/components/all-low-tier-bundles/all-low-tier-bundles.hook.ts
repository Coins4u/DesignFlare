'use client';

import { useState, useCallback } from 'react';
import type { AllLowTierBundlesTab } from './all-low-tier-bundles.types';

export function useAllLowTierBundles() {
  const [tab, setTab] = useState<AllLowTierBundlesTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'All Low-Tier Bundles' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
