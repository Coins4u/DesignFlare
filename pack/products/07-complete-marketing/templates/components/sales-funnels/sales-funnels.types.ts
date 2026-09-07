/** Type definitions for Sales Funnels */
export interface SalesFunnelsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface SalesFunnelsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type SalesFunnelsTab = 'overview' | 'config' | 'analytics';
