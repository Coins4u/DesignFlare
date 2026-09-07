type AnalyticsEvent = { name: string; properties?: Record<string, string | number | boolean> };

export function track(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  // Wire to PostHog, Plausible, GA4, etc.
  if (process.env.NODE_ENV === 'development') console.info('[analytics]', event);
  window.dispatchEvent(new CustomEvent('df:analytics', { detail: event }));
}
