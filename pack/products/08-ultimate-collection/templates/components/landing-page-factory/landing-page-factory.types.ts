/** Type definitions for Landing Page Factory */
export interface LandingPageFactoryConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface LandingPageFactoryMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type LandingPageFactoryTab = 'overview' | 'config' | 'analytics';
