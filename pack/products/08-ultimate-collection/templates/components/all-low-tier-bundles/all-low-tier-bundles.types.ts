/** Type definitions for All Low-Tier Bundles */
export interface AllLowTierBundlesConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface AllLowTierBundlesMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type AllLowTierBundlesTab = 'overview' | 'config' | 'analytics';
