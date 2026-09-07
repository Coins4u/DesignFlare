/** Type definitions for Dashboard Shells */
export interface DashboardShellsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface DashboardShellsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type DashboardShellsTab = 'overview' | 'config' | 'analytics';
