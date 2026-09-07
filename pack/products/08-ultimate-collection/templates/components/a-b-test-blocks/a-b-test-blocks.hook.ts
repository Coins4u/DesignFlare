'use client';

import { useState, useCallback } from 'react';
import type { ABTestBlocksTab } from './a-b-test-blocks.types';

export function useABTestBlocks() {
  const [tab, setTab] = useState<ABTestBlocksTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'A/B Test Blocks' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
