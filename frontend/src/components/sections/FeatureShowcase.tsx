"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

type Tab = {
  key: string;
  icon: string;
  featuresKey: string;
  featureCount: number;
  images: string[];
};

function getTabs(locale: string): Tab[] {
  return [
    { key: "tab1", icon: "🏠", featuresKey: "tab1Features", featureCount: 5, images: [`/visuals/${locale}/str-gws-actuals.png`] },
    { key: "tab2", icon: "💰", featuresKey: "tab2Features", featureCount: 5, images: [`/visuals/${locale}/fin-gws-actuals.png`] },
    {
      key: "tab3",
      icon: "🔗",
      featuresKey: "tab3Features",
      featureCount: 4,
      images: [
        `/visuals/${locale}/myadmin-functions.png`,
        `/visuals/${locale}/str-bookings-by-country.png`,
        `/visuals/${locale}/str-future-trend.png`,
        `/visuals/${locale}/str-gws-violins.png`,
      ],
    },
  ];
}

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const isCarousel = images.length > 1;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play every 4 seconds
  useEffect(() => {
    if (!isCarousel) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isCarousel, next]);

  // Reset to first image when images change (tab switch)
  useEffect(() => {
    setCurrent(0);
  }, [images]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="h-auto w-full shrink-0"
            width={600}
            height={450}
          />
        ))}
      </div>

      {isCarousel && (
        <>
          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition-colors"
          >
            <svg className="h-5 w-5 text-deep-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition-colors"
          >
            <svg className="h-5 w-5 text-deep-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === current ? "bg-brand-blue" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FeatureShowcase() {
  const t = useTranslations("FeatureShowcase");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = getTabs(locale);
  const currentTab = tabs[activeTab];

  return (
    <section className="bg-off-white py-16 sm:py-20">
      <Container>
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subtitle")}</p>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex gap-1 rounded-xl bg-white p-1 shadow-sm" role="tablist">
            {tabs.map((tab, i) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => setActiveTab(i)}
                className={`rounded-lg px-5 py-3 text-sm font-semibold transition-colors sm:px-8 sm:text-base ${
                  activeTab === i
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {t(`${tab.key}Title`)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Feature checklist */}
          <div>
            <ul className="space-y-4">
              {Array.from({ length: currentTab.featureCount }, (_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">
                    {t(`${currentTab.featuresKey}.f${i + 1}`)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold text-brand-blue cursor-pointer hover:underline">
              {t("learnMore")}
            </p>
          </div>

          {/* Screenshot / Carousel */}
          <ImageCarousel images={currentTab.images} alt={t(`${currentTab.key}Title`)} />
        </div>
      </Container>
    </section>
  );
}
