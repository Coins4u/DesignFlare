'use client';

import { useState, useCallback } from 'react';
import type { AccessibilityKitTab } from './accessibility-kit.types';

export function useAccessibilityKit() {
  const [tab, setTab] = useState<AccessibilityKitTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Accessibility Kit' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
