'use client';

import { useState, useCallback } from 'react';
import type { DarkModeSystemTab } from './dark-mode-system.types';

export function useDarkModeSystem() {
  const [tab, setTab] = useState<DarkModeSystemTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Dark Mode System' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
