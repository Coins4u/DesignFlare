'use client';

import { useState, useCallback } from 'react';
import type { AllMidTierKitsTab } from './all-mid-tier-kits.types';

export function useAllMidTierKits() {
  const [tab, setTab] = useState<AllMidTierKitsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'All Mid-Tier Kits' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
