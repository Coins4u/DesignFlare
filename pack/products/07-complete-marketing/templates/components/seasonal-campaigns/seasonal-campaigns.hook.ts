'use client';

import { useState, useCallback } from 'react';
import type { SeasonalCampaignsTab } from './seasonal-campaigns.types';

export function useSeasonalCampaigns() {
  const [tab, setTab] = useState<SeasonalCampaignsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Seasonal Campaigns' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
