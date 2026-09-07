/** Type definitions for Paid Ads Landers */
export interface PaidAdsLandersConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface PaidAdsLandersMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type PaidAdsLandersTab = 'overview' | 'config' | 'analytics';
