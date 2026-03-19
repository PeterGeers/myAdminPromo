"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";

const LANGUAGES = [
  { code: "nl", label: "Nederlands", flag: "🇳🇱", active: true },
  { code: "en", label: "English", flag: "🇬🇧", active: true },
  { code: "de", label: "Deutsch", flag: "🇩🇪", active: false },
  { code: "fr", label: "Français", flag: "🇫🇷", active: false },
  { code: "it", label: "Italiano", flag: "🇮🇹", active: false },
  { code: "pt", label: "Português", flag: "🇵🇹", active: false },
  { code: "es", label: "Español", flag: "🇪🇸", active: false },
] as const;

type Locale = "nl" | "en";

interface LanguageDropdownProps {
  locale: string;
  /** "light" for white bg (header), "dark" for dark bg (footer) */
  variant?: "light" | "dark";
}

export default function LanguageDropdown({
  locale,
  variant = "light",
}: LanguageDropdownProps) {
  const t = useTranslations("LanguageDropdown");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      trackEvent("language_switch", { from: locale, to: newLocale });
      router.replace(pathname, { locale: newLocale });
      setOpen(false);
    },
    [router, pathname, locale]
  );

  const isDark = variant === "dark";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
          isDark
            ? "text-gray-400 hover:bg-white/10 hover:text-white"
            : "text-gray-700 hover:bg-gray-100 hover:text-brand-blue"
        }`}
      >
        <span aria-hidden="true">🌐</span>
        <span className="uppercase">{locale}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("label")}
          className="absolute bottom-full right-0 mb-1 w-52 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5 lg:bottom-auto lg:top-full lg:mb-0 lg:mt-1"
        >
          {LANGUAGES.map((lang, i) => {
            const isActive = lang.code === locale;
            const showDivider =
              i > 0 && !lang.active && LANGUAGES[i - 1].active;

            return (
              <div key={lang.code}>
                {showDivider && (
                  <div className="my-1 border-t border-gray-100" />
                )}
                <button
                  role="option"
                  aria-selected={isActive}
                  disabled={!lang.active}
                  onClick={() =>
                    lang.active && switchLocale(lang.code as Locale)
                  }
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    lang.active
                      ? isActive
                        ? "font-medium text-brand-blue"
                        : "text-gray-700 hover:bg-gray-50"
                      : "cursor-default text-gray-400"
                  }`}
                >
                  <span aria-hidden="true">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.label}</span>
                  {isActive && (
                    <svg
                      className="h-4 w-4 text-brand-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {!lang.active && (
                    <span className="text-xs text-gray-400">
                      {t("comingSoon")}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
