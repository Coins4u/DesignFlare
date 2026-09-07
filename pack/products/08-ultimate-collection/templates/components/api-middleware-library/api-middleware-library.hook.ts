'use client';

import { useState, useCallback } from 'react';
import type { ApiMiddlewareLibraryTab } from './api-middleware-library.types';

export function useApiMiddlewareLibrary() {
  const [tab, setTab] = useState<ApiMiddlewareLibraryTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'API Middleware Library' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
