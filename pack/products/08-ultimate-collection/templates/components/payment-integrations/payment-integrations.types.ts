/** Type definitions for Payment Integrations */
export interface PaymentIntegrationsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface PaymentIntegrationsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type PaymentIntegrationsTab = 'overview' | 'config' | 'analytics';
