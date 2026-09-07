/** Type definitions for Accessibility Kit */
export interface AccessibilityKitConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface AccessibilityKitMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type AccessibilityKitTab = 'overview' | 'config' | 'analytics';
