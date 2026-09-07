/** Type definitions for All High-Tier Modules */
export interface AllHighTierModulesConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface AllHighTierModulesMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type AllHighTierModulesTab = 'overview' | 'config' | 'analytics';
