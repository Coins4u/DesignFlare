/** Type definitions for Dark Mode System */
export interface DarkModeSystemConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface DarkModeSystemMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type DarkModeSystemTab = 'overview' | 'config' | 'analytics';
