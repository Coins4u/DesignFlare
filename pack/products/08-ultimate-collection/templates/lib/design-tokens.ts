export const designTokens = {
  colors: {
    primary: { 50: '#eef2ff', 500: '#6366f1', 600: '#4f46e5', 900: '#312e81' },
    slate: { 50: '#f8fafc', 500: '#64748b', 900: '#0f172a' },
  },
  radii: { sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  shadows: { card: '0 8px 24px rgba(15,23,42,0.06)', hero: '0 24px 48px rgba(79,70,229,0.18)' },
  typography: { sans: 'Inter, system-ui, sans-serif', mono: 'ui-monospace, monospace' },
} as const;

export type DesignTokens = typeof designTokens;
