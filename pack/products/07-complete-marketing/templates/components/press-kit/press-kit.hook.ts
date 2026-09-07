'use client';

import { useState, useCallback } from 'react';
import type { PressKitTab } from './press-kit.types';

export function usePressKit() {
  const [tab, setTab] = useState<PressKitTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Press Kit' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
