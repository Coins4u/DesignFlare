'use client';

import { useState, useCallback } from 'react';
import type { DesignTokenSystemTab } from './design-token-system.types';

export function useDesignTokenSystem() {
  const [tab, setTab] = useState<DesignTokenSystemTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Design Token System' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
