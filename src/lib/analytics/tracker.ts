/**
 * Analytics Event Tracking
 * Client-side event tracker that sends events to /api/analytics.
 * Used by both client components and server-side code.
 */

import type { Json } from "@/types/database";

export interface TrackEventParams {
  eventType: string;
  eventData?: Record<string, unknown>;
  pageUrl?: string;
  pageSlug?: string;
  contentId?: string;
  offerId?: string;
}

/**
 * Track an analytics event (client-side).
 * Sends to /api/analytics endpoint.
 * Fire-and-forget — doesn't block the UI.
 */
export function trackEvent(params: TrackEventParams): void {
  // Don't track in dev unless explicitly enabled
  if (
    process.env.NODE_ENV === "development" &&
    !process.env.NEXT_PUBLIC_TRACK_DEV
  ) {
    console.debug("[analytics] dev skip:", params.eventType, params);
    return;
  }

  const payload = {
    event_type: params.eventType,
    event_data: {
      ...params.eventData,
      ...(typeof window !== 'undefined' ? {
        traffic_source: new URLSearchParams(window.location.search).get('utm_source')?.slice(0,120) || (()=>{try{return document.referrer?new URL(document.referrer).hostname:'direct';}catch{return 'unknown';}})(),
        device_type: /iPad|Tablet/i.test(navigator.userAgent)?'tablet':/Mobile|Android|iPhone/i.test(navigator.userAgent)?'mobile':'desktop',
      } : {}),
    },
    page_url: params.pageUrl || (typeof window !== "undefined" ? window.location.href : null),
    page_slug: params.pageSlug || (typeof window !== "undefined" ? window.location.pathname : null),
    content_id: params.contentId || null,
    offer_id: params.offerId || null,
  };

  // Fire and forget
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true, // survives page navigation
  }).catch(() => {
    // Silently fail — analytics should never break the UX
  });
}

/**
 * Common event helpers for consistency.
 */
export const events = {
  pageView: (slug: string) =>
    trackEvent({ eventType: "page_view", pageSlug: slug }),

  contentView: (contentId: string, slug: string) =>
    trackEvent({ eventType: "content_view", contentId, pageSlug: slug }),

  offerView: (offerId: string, slug: string) =>
    trackEvent({ eventType: "offer_view", offerId, pageSlug: slug }),

  offerClick: (offerId: string, slug: string) =>
    trackEvent({ eventType: "offer_click", offerId, pageSlug: slug }),

  ctaClick: (ctaId: string, variant?: string) =>
    trackEvent({
      eventType: "cta_click",
      eventData: { cta_id: ctaId, variant },
    }),

  emailCapture: (source: string) =>
    trackEvent({ eventType: "email_capture", eventData: { source } }),

  chatStarted: (page: string) =>
    trackEvent({ eventType: "chat_started", eventData: { page } }),

  scrollDepth: (depth: number, slug: string) =>
    trackEvent({
      eventType: "scroll_depth",
      eventData: { depth },
      pageSlug: slug,
    }),

  timeOnPage: (seconds: number, slug: string) =>
    trackEvent({
      eventType: "time_on_page",
      eventData: { seconds },
      pageSlug: slug,
    }),
};
