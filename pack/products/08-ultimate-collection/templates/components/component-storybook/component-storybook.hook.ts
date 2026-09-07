'use client';

import { useState, useCallback } from 'react';
import type { ComponentStorybookTab } from './component-storybook.types';

export function useComponentStorybook() {
  const [tab, setTab] = useState<ComponentStorybookTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Component Storybook' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
