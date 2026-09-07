/** Type definitions for UGC Gallery */
export interface UgcGalleryConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface UgcGalleryMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type UgcGalleryTab = 'overview' | 'config' | 'analytics';
