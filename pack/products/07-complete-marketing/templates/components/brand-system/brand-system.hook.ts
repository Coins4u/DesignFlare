'use client';

import { useState, useCallback } from 'react';
import type { BrandSystemTab } from './brand-system.types';

export function useBrandSystem() {
  const [tab, setTab] = useState<BrandSystemTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Brand System' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
