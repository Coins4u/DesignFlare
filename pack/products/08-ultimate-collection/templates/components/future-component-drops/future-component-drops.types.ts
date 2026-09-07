/** Type definitions for Future Component Drops */
export interface FutureComponentDropsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface FutureComponentDropsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type FutureComponentDropsTab = 'overview' | 'config' | 'analytics';
