'use client';

import { useState, useCallback } from 'react';
import type { WhiteLabelLicenseTab } from './white-label-license.types';

export function useWhiteLabelLicense() {
  const [tab, setTab] = useState<WhiteLabelLicenseTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'White-Label License' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
