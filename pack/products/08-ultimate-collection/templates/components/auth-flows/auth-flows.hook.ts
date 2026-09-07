'use client';

import { useState, useCallback } from 'react';
import type { AuthFlowsTab } from './auth-flows.types';

export function useAuthFlows() {
  const [tab, setTab] = useState<AuthFlowsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Auth Flows' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
