'use client';

import { useState, useCallback } from 'react';
import type { LandingPageFactoryTab } from './landing-page-factory.types';

export function useLandingPageFactory() {
  const [tab, setTab] = useState<LandingPageFactoryTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Landing Page Factory' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
