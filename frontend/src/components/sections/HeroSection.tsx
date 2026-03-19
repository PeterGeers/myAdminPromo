"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { trackEvent } from "@/lib/analytics";

const platformLogos = [
  { name: "Airbnb", src: "/logos/airbnb.svg", width: 90, height: 28 },
  { name: "Booking.com", src: "/logos/booking.svg", width: 120, height: 28 },
  { name: "Vrbo", src: "/logos/vrbo.svg", width: 80, height: 28 },
  { name: "Rabobank", src: "/logos/rabobank.svg", width: 100, height: 28 },
  { name: "Belastingdienst", src: "/logos/belastingdienst.svg", width: 120, height: 28 },
];

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="bg-off-white py-16 sm:py-20 lg:py-28">
      <Container>
        {/* Two-column layout */}
        <div className="grid items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-16">
          {/* Text column */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-teal">
              {t("eyebrow")}
            </p>

            <h1 className="font-heading text-4xl font-extrabold leading-tight text-deep-blue sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/signup" variant="primary" size="lg" onClick={() => trackEvent("cta_click", { location: "hero", label: "start_trial" })}>
                {t("primaryCta")}
              </Button>
              <Button href="/#features" variant="secondary" size="lg" onClick={() => trackEvent("cta_click", { location: "hero", label: "see_features" })}>
                {t("secondaryCta")}
              </Button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              {t("trustSignal")}
            </p>
          </div>

          {/* Image/illustration placeholder */}
          <div className="flex items-center justify-center">
            <div className="aspect-[4/3] w-full max-w-lg rounded-2xl bg-gradient-to-br from-brand-blue/10 via-brand-teal/10 to-brand-blue/5 p-8">
              <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-blue/20 p-6 text-center">
                <svg className="mb-4 h-16 w-16 text-brand-blue/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                <p className="text-sm font-medium text-brand-blue/40">Dashboard illustration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform logos row */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-70 grayscale">
            {platformLogos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="h-14 w-auto max-w-[180px] object-contain"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
