'use client';

import { useState, useCallback } from 'react';
import type { ReferralEngineTab } from './referral-engine.types';

export function useReferralEngine() {
  const [tab, setTab] = useState<ReferralEngineTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Referral Engine' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
