/** Type definitions for Black Friday Kit */
export interface BlackFridayKitConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface BlackFridayKitMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type BlackFridayKitTab = 'overview' | 'config' | 'analytics';
