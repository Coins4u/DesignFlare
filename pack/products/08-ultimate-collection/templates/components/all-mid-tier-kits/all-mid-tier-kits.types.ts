/** Type definitions for All Mid-Tier Kits */
export interface AllMidTierKitsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface AllMidTierKitsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type AllMidTierKitsTab = 'overview' | 'config' | 'analytics';
