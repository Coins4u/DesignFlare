'use client';

import { useState, useCallback } from 'react';
import type { BlackFridayKitTab } from './black-friday-kit.types';

export function useBlackFridayKit() {
  const [tab, setTab] = useState<BlackFridayKitTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Black Friday Kit' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
