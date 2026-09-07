'use client';

import { useState, useCallback } from 'react';
import type { RetentionFlowsTab } from './retention-flows.types';

export function useRetentionFlows() {
  const [tab, setTab] = useState<RetentionFlowsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Retention Flows' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
