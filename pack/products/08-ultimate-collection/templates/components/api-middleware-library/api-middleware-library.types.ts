/** Type definitions for API Middleware Library */
export interface ApiMiddlewareLibraryConfig {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface ApiMiddlewareLibraryMetrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type ApiMiddlewareLibraryTab = 'overview' | 'config' | 'analytics';
