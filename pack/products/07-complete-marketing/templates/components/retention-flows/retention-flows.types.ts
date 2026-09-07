/** Type definitions for Retention Flows */
export interface RetentionFlowsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface RetentionFlowsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type RetentionFlowsTab = 'overview' | 'config' | 'analytics';
