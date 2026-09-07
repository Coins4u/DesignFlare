/** Type definitions for Email Template Engine */
export interface EmailTemplateEngineConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface EmailTemplateEngineMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type EmailTemplateEngineTab = 'overview' | 'config' | 'analytics';
