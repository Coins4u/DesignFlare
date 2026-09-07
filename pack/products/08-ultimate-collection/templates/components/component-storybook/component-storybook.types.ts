/** Type definitions for Component Storybook */
export interface ComponentStorybookConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface ComponentStorybookMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type ComponentStorybookTab = 'overview' | 'config' | 'analytics';
