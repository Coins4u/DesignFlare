/** Type definitions for Agency Reseller Kit */
export interface AgencyResellerKitConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface AgencyResellerKitMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type AgencyResellerKitTab = 'overview' | 'config' | 'analytics';
