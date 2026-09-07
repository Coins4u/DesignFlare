'use client';

import { useState, useCallback } from 'react';
import type { InfluencerHubTab } from './influencer-hub.types';

export function useInfluencerHub() {
  const [tab, setTab] = useState<InfluencerHubTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Influencer Hub' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
