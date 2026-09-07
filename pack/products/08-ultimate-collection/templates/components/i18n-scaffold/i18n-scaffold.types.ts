/** Type definitions for i18n Scaffold */
export interface I18nScaffoldConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface I18nScaffoldMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type I18nScaffoldTab = 'overview' | 'config' | 'analytics';
