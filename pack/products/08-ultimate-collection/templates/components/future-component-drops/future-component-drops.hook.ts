'use client';

import { useState, useCallback } from 'react';
import type { FutureComponentDropsTab } from './future-component-drops.types';

export function useFutureComponentDrops() {
  const [tab, setTab] = useState<FutureComponentDropsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Future Component Drops' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
