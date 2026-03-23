"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";

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

interface MobileDrawerProps {
  locale: string;
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ locale, open, onClose }: MobileDrawerProps) {
  const t = useTranslations("Header");
  const tLang = useTranslations("LanguageDropdown");
  const pathname = usePathname();
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: t("features"), href: "/#features" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("faq"), href: "/#faq" },
  ];

  // Client-side mount check for portal
  useEffect(() => setMounted(true), []);

  // Reset language dropdown when drawer closes
  useEffect(() => {
    if (!open) setLangOpen(false);
  }, [open]);

  // Focus trap + Escape to close + body scroll lock
  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      router.replace(pathname, { locale: newLocale });
      onClose();
    },
    [router, pathname, onClose]
  );

  const handleNavClick = () => onClose();

  if (!mounted || !open) return null;

  return createPortal(
    <div className="lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("openMenu")}
        className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-white shadow-xl animate-[slideIn_200ms_ease-out]"
      >
        {/* Header row */}
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" onClick={handleNavClick} className="flex-shrink-0">
            <Image
              src="/logo-header.png"
              alt="myAdmin"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={t("closeMenu")}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block border-b border-gray-100 py-4 text-base font-medium text-gray-700 transition-colors hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}

          {/* Language dropdown */}
          <div className="mt-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex w-full items-center justify-between border-b border-gray-100 py-4 text-base font-medium text-gray-700 transition-colors hover:text-brand-blue"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">🌐</span>
                {tLang("label")} — {LANGUAGES.find((l) => l.code === locale)?.label}
              </span>
              <svg
                className={`h-5 w-5 transition-transform ${langOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="space-y-1 py-2">
                {LANGUAGES.map((lang, i) => {
                  const isActive = lang.code === locale;
                  const showDivider = i > 0 && !lang.active && LANGUAGES[i - 1].active;
                  return (
                    <div key={lang.code}>
                      {showDivider && <div className="my-2 border-t border-gray-100" />}
                      <button
                        disabled={!lang.active}
                        onClick={() => lang.active && switchLocale(lang.code as Locale)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          lang.active
                            ? isActive
                              ? "bg-blue-50 font-medium text-brand-blue"
                              : "text-gray-700 hover:bg-gray-50"
                            : "cursor-default text-gray-400"
                        }`}
                      >
                        <span aria-hidden="true">{lang.flag}</span>
                        <span className="flex-1 text-left">{lang.label}</span>
                        {isActive && (
                          <svg className="h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {!lang.active && (
                          <span className="text-xs text-gray-400">{tLang("comingSoon")}</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Bottom CTA area */}
        <div className="border-t border-gray-100 px-4 py-6 sm:px-6">
          <Button href="/signup" variant="primary" size="md" className="w-full justify-center">
            {t("startTrial")}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
