"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { plans } from "@/lib/pricing-data";

export default function PricingSection() {
  const t = useTranslations("Pricing");
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-off-white py-16 sm:py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subtitle")}</p>
        </div>

        {/* Toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!annual ? "text-gray-900" : "text-gray-500"}`}>
            {t("monthly")}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            onClick={() => {
              const next = !annual;
              setAnnual(next);
              trackEvent("pricing_toggle", { billing: next ? "annual" : "monthly" });
            }}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
              annual ? "bg-brand-blue" : "bg-gray-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 translate-y-1 rounded-full bg-white shadow-sm transition-transform ${
                annual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-gray-900" : "text-gray-500"}`}>
            {t("annual")}
          </span>
          {annual && (
            <span className="rounded-full bg-brand-teal/10 px-3 py-0.5 text-xs font-semibold text-brand-teal">
              {t("annualSave")}
            </span>
          )}
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const price = annual && plan.annualPriceKey
              ? t(plan.annualPriceKey)
              : t(plan.priceKey);
            const isCustom = plan.priceKey === "enterprisePrice";

            return (
              <div
                key={plan.nameKey}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  isPopular
                    ? "border-2 border-brand-blue bg-white shadow-lg lg:-mt-4 lg:mb-[-1rem] lg:py-10"
                    : "border border-gray-200 bg-white"
                } ${isPopular ? "order-first lg:order-none" : ""}`}
              >
                {isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-semibold text-white">
                    {t("mostPopular")}
                  </span>
                )}

                <h3 className="font-heading text-xl font-bold text-deep-blue">
                  {t(plan.nameKey)}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{t(plan.descKey)}</p>

                {/* Price */}
                <div className="mt-6">
                  {isCustom ? (
                    <span className="font-heading text-4xl font-extrabold text-deep-blue">
                      {price}
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-extrabold text-deep-blue">
                        €{price}
                      </span>
                      <span className="text-sm text-gray-500">{t("perMonth")}</span>
                    </div>
                  )}
                  {annual && !isCustom && (
                    <p className="mt-1 text-xs text-gray-400">{t("billedAnnually")}</p>
                  )}
                </div>

                <p className="mt-4 text-sm font-medium text-gray-600">
                  {t(plan.propsKey)}
                </p>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((fKey) => (
                    <li key={fKey} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {t(fKey)}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    href={plan.ctaHref}
                    variant={isPopular ? "primary" : "secondary"}
                    size="md"
                    className="w-full"
                  >
                    {t(plan.ctaKey)}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust line */}
        <p className="mt-10 text-center text-sm text-gray-500">
          {t("trustLine")}
        </p>
      </Container>
    </section>
  );
}
