/** Type definitions for Auth Flows */
export interface AuthFlowsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface AuthFlowsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type AuthFlowsTab = 'overview' | 'config' | 'analytics';
