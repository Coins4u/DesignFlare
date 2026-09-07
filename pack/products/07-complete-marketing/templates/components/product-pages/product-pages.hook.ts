'use client';

import { useState, useCallback } from 'react';
import type { ProductPagesTab } from './product-pages.types';

export function useProductPages() {
  const [tab, setTab] = useState<ProductPagesTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Product Pages' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
