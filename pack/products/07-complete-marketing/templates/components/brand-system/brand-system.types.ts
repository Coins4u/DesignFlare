/** Type definitions for Brand System */
export interface BrandSystemConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface BrandSystemMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type BrandSystemTab = 'overview' | 'config' | 'analytics';
