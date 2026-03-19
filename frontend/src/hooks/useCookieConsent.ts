"use client";

import { useState, useEffect, useCallback } from "react";

export interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent extends ConsentState {
  timestamp: string;
}

const COOKIE_NAME = "cookie_consent";
const COOKIE_DAYS = 365;

const defaultConsent: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function parseConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.essential === "boolean") return parsed as StoredConsent;
  } catch {
    // invalid cookie
  }
  return null;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const stored = parseConsent(getCookie(COOKIE_NAME));
    if (stored) {
      setConsent({ essential: true, analytics: stored.analytics, marketing: stored.marketing });
      setHasConsented(true);
    } else {
      setHasConsented(false);
    }
  }, []);

  const saveConsent = useCallback((next: ConsentState) => {
    const toStore: StoredConsent = {
      ...next,
      essential: true, // always on
      timestamp: new Date().toISOString(),
    };
    setCookie(COOKIE_NAME, JSON.stringify(toStore), COOKIE_DAYS);
    setConsent(toStore);
    setHasConsented(true);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  }, [saveConsent]);

  const reopenBanner = useCallback(() => {
    setHasConsented(false);
  }, []);

  return { consent, hasConsented, saveConsent, acceptAll, rejectAll, reopenBanner };
}
