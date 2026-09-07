'use client';

import { useState, useCallback } from 'react';
import type { AgencyResellerKitTab } from './agency-reseller-kit.types';

export function useAgencyResellerKit() {
  const [tab, setTab] = useState<AgencyResellerKitTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Agency Reseller Kit' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
