/**
 * GA4 analytics utility with consent-gated loading.
 * - loadGA4(): dynamically injects gtag.js only when analytics consent is given
 * - removeGACookies(): clears GA cookies when consent is revoked
 * - trackEvent(): fires events only when gtag is available
 */

type EventParams = Record<string, string | number | boolean>;

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

let ga4Loaded = false;

/**
 * Dynamically load GA4 gtag.js script.
 * Only call this after the user has given analytics consent.
 */
export function loadGA4() {
  if (ga4Loaded || !GA_ID || typeof window === "undefined") return;

  // Inject gtag.js script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown[]).push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    anonymize_ip: true,
    cookie_flags: "SameSite=Lax;Secure",
  });

  ga4Loaded = true;
}

/**
 * Remove Google Analytics cookies when consent is revoked.
 */
export function removeGACookies() {
  if (typeof document === "undefined") return;
  const domain = window.location.hostname;
  const cookieNames = ["_ga", "_gid", "_gat", `_ga_${GA_ID.replace("G-", "")}`];

  cookieNames.forEach((name) => {
    // Clear with various domain combinations
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain}`;
  });

  ga4Loaded = false;
}

/**
 * Track a GA4 event. Only fires when gtag is loaded (requires analytics consent).
 */
export function trackEvent(name: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
