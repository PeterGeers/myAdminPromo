"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCookieConsent, ConsentState } from "@/hooks/useCookieConsent";
import { loadGA4, removeGACookies } from "@/lib/analytics";

export default function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const { consent, hasConsented, saveConsent, acceptAll, rejectAll, reopenBanner } =
    useCookieConsent();

  const [showPrefs, setShowPrefs] = useState(false);
  const [localAnalytics, setLocalAnalytics] = useState(false);
  const [localMarketing, setLocalMarketing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync local toggles when opening prefs
  const openPrefs = () => {
    setLocalAnalytics(consent.analytics);
    setLocalMarketing(consent.marketing);
    setShowPrefs(true);
  };

  // Listen for custom event from privacy page "Manage cookie preferences" button
  useEffect(() => {
    const handler = () => openPrefs();
    window.addEventListener("open-cookie-preferences", handler);
    return () => window.removeEventListener("open-cookie-preferences", handler);
  });

  const handleSavePrefs = () => {
    const next: ConsentState = {
      essential: true,
      analytics: localAnalytics,
      marketing: localMarketing,
    };
    saveConsent(next);
    setShowPrefs(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setShowPrefs(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setShowPrefs(false);
  };

  // Load or unload GA4 based on consent
  useEffect(() => {
    if (hasConsented === null) return; // still loading
    if (consent.analytics) {
      loadGA4();
    } else if (hasConsented) {
      // Consent was given but analytics is off — remove cookies
      removeGACookies();
    }
  }, [consent.analytics, hasConsented]);

  // Close modal on Escape
  useEffect(() => {
    if (!showPrefs) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPrefs(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showPrefs]);

  // Focus trap inside modal
  useEffect(() => {
    if (!showPrefs || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"]), input'
    );
    if (focusable.length) focusable[0].focus();
  }, [showPrefs]);

  // Don't render anything until we know consent state
  if (hasConsented === null) return null;

  // Preferences modal
  if (showPrefs) {
    return (
      <div
        className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
        role="dialog"
        aria-label={t("preferencesTitle")}
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowPrefs(false)}
        />
        {/* Modal */}
        <div
          ref={modalRef}
          className="relative w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl sm:m-4"
        >
          <button
            onClick={() => setShowPrefs(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 className="font-heading text-lg font-bold text-gray-900">
            {t("preferencesTitle")}
          </h3>

          <div className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200">
            {/* Essential — locked */}
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{t("essential")}</p>
                <p className="mt-0.5 text-xs text-gray-500">{t("essentialDescription")}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                {t("alwaysOn")}
              </span>
            </div>

            {/* Analytics toggle */}
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{t("analytics")}</p>
                <p className="mt-0.5 text-xs text-gray-500">{t("analyticsDescription")}</p>
              </div>
              <button
                role="switch"
                aria-checked={localAnalytics}
                onClick={() => setLocalAnalytics(!localAnalytics)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  localAnalytics ? "bg-brand-blue" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    localAnalytics ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Marketing toggle */}
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{t("marketing")}</p>
                <p className="mt-0.5 text-xs text-gray-500">{t("marketingDescription")}</p>
              </div>
              <button
                role="switch"
                aria-checked={localMarketing}
                onClick={() => setLocalMarketing(!localMarketing)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  localMarketing ? "bg-brand-blue" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    localMarketing ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            onClick={handleSavePrefs}
            className="mt-4 w-full rounded-lg bg-brand-blue py-2.5 text-sm font-semibold text-white transition-colors hover:bg-deep-blue"
          >
            {t("savePreferences")}
          </button>
        </div>
      </div>
    );
  }

  // Banner — show when no consent yet
  if (!hasConsented) {
    return (
      <div
        className="fixed inset-x-0 bottom-0 z-[60] p-4"
        role="dialog"
        aria-label={t("bannerLabel")}
      >
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-5 shadow-lg sm:flex sm:items-center sm:gap-6 sm:p-6">
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-gray-700">
              {t("message")}
            </p>
            <Link
              href="/privacy"
              className="mt-1 inline-block text-sm text-brand-blue underline hover:text-deep-blue"
            >
              {t("readPrivacy")}
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:shrink-0">
            <button
              onClick={openPrefs}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t("managePreferences")}
            </button>
            <button
              onClick={handleRejectAll}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t("rejectAll")}
            </button>
            <button
              onClick={handleAcceptAll}
              className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-deep-blue"
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Minimized state — small cookie icon to reopen
  return (
    <button
      onClick={reopenBanner}
      className="fixed bottom-4 left-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg"
      aria-label={t("managePreferences")}
    >
      <span className="text-lg" role="img" aria-hidden="true">🍪</span>
    </button>
  );
}
