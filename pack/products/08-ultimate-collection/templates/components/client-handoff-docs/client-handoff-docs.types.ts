/** Type definitions for Client Handoff Docs */
export interface ClientHandoffDocsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface ClientHandoffDocsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type ClientHandoffDocsTab = 'overview' | 'config' | 'analytics';
