'use client';

import { useState, useCallback } from 'react';
import type { CaseStudiesTab } from './case-studies.types';

export function useCaseStudies() {
  const [tab, setTab] = useState<CaseStudiesTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Case Studies' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
