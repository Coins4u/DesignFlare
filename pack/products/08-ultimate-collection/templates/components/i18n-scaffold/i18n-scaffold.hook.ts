'use client';

import { useState, useCallback } from 'react';
import type { I18nScaffoldTab } from './i18n-scaffold.types';

export function useI18nScaffold() {
  const [tab, setTab] = useState<I18nScaffoldTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'i18n Scaffold' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
