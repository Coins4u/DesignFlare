'use client';

import { useState, useCallback } from 'react';
import type { HolidayDropsTab } from './holiday-drops.types';

export function useHolidayDrops() {
  const [tab, setTab] = useState<HolidayDropsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Holiday Drops' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
