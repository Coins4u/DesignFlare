'use client';

import { useState, useCallback } from 'react';
import type { PaymentIntegrationsTab } from './payment-integrations.types';

export function usePaymentIntegrations() {
  const [tab, setTab] = useState<PaymentIntegrationsTab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: 'Payment Integrations' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
