/** Type definitions for Enterprise SLA Docs */
export interface EnterpriseSlaDocsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface EnterpriseSlaDocsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type EnterpriseSlaDocsTab = 'overview' | 'config' | 'analytics';
