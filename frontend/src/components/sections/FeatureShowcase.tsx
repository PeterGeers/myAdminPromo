"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

const tabs = [
  { key: "tab1", icon: "🏠", featuresKey: "tab1Features", featureCount: 5 },
  { key: "tab2", icon: "💰", featuresKey: "tab2Features", featureCount: 5 },
  { key: "tab3", icon: "🔗", featuresKey: "tab3Features", featureCount: 4 },
] as const;

export default function FeatureShowcase() {
  const t = useTranslations("FeatureShowcase");
  const [activeTab, setActiveTab] = useState(0);

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

          {/* Screenshot placeholder */}
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-brand-blue/10 via-brand-teal/5 to-brand-blue/5 shadow-sm">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-blue/15 p-6 text-center">
              <span className="text-4xl">{currentTab.icon}</span>
              <p className="mt-3 text-sm font-medium text-brand-blue/40">
                {t(`${currentTab.key}Title`)} — screenshot
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
