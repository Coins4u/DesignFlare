'use client';

import { useState, useCallback } from 'react';
import type { EmailTemplateEngineTab } from './email-template-engine.types';

export function useEmailTemplateEngine() {
  const [tab, setTab] = useState<EmailTemplateEngineTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Email Template Engine' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
