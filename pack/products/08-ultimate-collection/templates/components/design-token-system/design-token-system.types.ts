/** Type definitions for Design Token System */
export interface DesignTokenSystemConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface DesignTokenSystemMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type DesignTokenSystemTab = 'overview' | 'config' | 'analytics';
