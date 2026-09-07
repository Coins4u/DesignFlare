/** Type definitions for SEO Component Pack */
export interface SeoComponentPackConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface SeoComponentPackMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type SeoComponentPackTab = 'overview' | 'config' | 'analytics';
