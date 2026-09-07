/** Type definitions for White-Label License */
export interface WhiteLabelLicenseConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface WhiteLabelLicenseMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type WhiteLabelLicenseTab = 'overview' | 'config' | 'analytics';
