/** Type definitions for Press Kit */
export interface PressKitConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface PressKitMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type PressKitTab = 'overview' | 'config' | 'analytics';
