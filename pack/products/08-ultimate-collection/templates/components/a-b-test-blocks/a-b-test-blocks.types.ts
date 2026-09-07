/** Type definitions for A/B Test Blocks */
export interface ABTestBlocksConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface ABTestBlocksMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type ABTestBlocksTab = 'overview' | 'config' | 'analytics';
