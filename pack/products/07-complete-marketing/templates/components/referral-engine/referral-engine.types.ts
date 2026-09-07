/** Type definitions for Referral Engine */
export interface ReferralEngineConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface ReferralEngineMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type ReferralEngineTab = 'overview' | 'config' | 'analytics';
