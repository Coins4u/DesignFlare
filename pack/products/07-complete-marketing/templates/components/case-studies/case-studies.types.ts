/** Type definitions for Case Studies */
export interface CaseStudiesConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface CaseStudiesMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type CaseStudiesTab = 'overview' | 'config' | 'analytics';
