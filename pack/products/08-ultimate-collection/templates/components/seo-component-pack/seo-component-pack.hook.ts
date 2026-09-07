'use client';

import { useState, useCallback } from 'react';
import type { SeoComponentPackTab } from './seo-component-pack.types';

export function useSeoComponentPack() {
  const [tab, setTab] = useState<SeoComponentPackTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'SEO Component Pack' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
