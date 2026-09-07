/** Type definitions for Seasonal Campaigns */
export interface SeasonalCampaignsConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface SeasonalCampaignsMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type SeasonalCampaignsTab = 'overview' | 'config' | 'analytics';
