"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import LanguageDropdown from "@/components/layout/LanguageDropdown";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { trackEvent } from "@/lib/analytics";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Header");

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("features"), href: "/#features" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("faq"), href: "/#faq" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <img
                src="/logo-header.png"
                alt="myAdmin"
                className="h-8 w-auto"
              />
            </Link>

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-8 lg:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium text-gray-700 transition-colors hover:text-brand-blue"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LanguageDropdown locale={locale} variant="light" />

              <Button
                href="/signup"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => trackEvent("cta_click", { location: "nav", label: "start_trial" })}
              >
                <span className="lg:hidden">{t("trial")}</span>
                <span className="hidden lg:inline">{t("startTrial")}</span>
              </Button>

              <button
                onClick={() => setDrawerOpen(true)}
                aria-label={t("openMenu")}
                aria-expanded={drawerOpen}
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileDrawer
        locale={locale}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
