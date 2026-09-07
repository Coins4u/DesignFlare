/** Type definitions for Analytics Dashboard */
export interface AnalyticsDashboardConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface AnalyticsDashboardMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type AnalyticsDashboardTab = 'overview' | 'config' | 'analytics';
