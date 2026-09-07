/** Type definitions for Product Pages */
export interface ProductPagesConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface ProductPagesMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type ProductPagesTab = 'overview' | 'config' | 'analytics';
