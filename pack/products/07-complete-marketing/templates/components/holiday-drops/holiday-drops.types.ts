/** Type definitions for Holiday Drops */
export interface HolidayDropsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface HolidayDropsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type HolidayDropsTab = 'overview' | 'config' | 'analytics';
