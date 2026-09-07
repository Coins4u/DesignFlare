/** Type definitions for Influencer Hub */
export interface InfluencerHubConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface InfluencerHubMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type InfluencerHubTab = 'overview' | 'config' | 'analytics';
