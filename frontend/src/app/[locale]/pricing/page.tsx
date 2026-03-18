"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";

/* ── Plan data ── */
const plans = [
  {
    nameKey: "starterName",
    descKey: "starterDescription",
    priceKey: "starterPrice",
    annualPriceKey: "starterAnnualPrice",
    propsKey: "starterProperties",
    features: ["starterFeature1", "starterFeature2", "starterFeature3", "starterFeature4", "starterFeature5"],
    popular: false,
    ctaKey: "startTrial",
    ctaHref: "/signup",
  },
  {
    nameKey: "professionalName",
    descKey: "professionalDescription",
    priceKey: "professionalPrice",
    annualPriceKey: "professionalAnnualPrice",
    propsKey: "professionalProperties",
    features: ["professionalFeature1", "professionalFeature2", "professionalFeature3", "professionalFeature4", "professionalFeature5", "professionalFeature6", "professionalFeature7"],
    popular: true,
    ctaKey: "startTrial",
    ctaHref: "/signup",
  },
  {
    nameKey: "enterpriseName",
    descKey: "enterpriseDescription",
    priceKey: "enterprisePrice",
    annualPriceKey: null,
    propsKey: "enterpriseProperties",
    features: ["enterpriseFeature1", "enterpriseFeature2", "enterpriseFeature3", "enterpriseFeature4", "enterpriseFeature5", "enterpriseFeature6"],
    popular: false,
    ctaKey: "contactUs",
    ctaHref: "/signup",
  },
] as const;

/* ── Add-ons ── */
const addOns = [
  { nameKey: "addOnProperties", priceKey: "addOnPropertiesPrice", descKey: "addOnPropertiesDescription", icon: "🏠" },
  { nameKey: "addOnUsers", priceKey: "addOnUsersPrice", descKey: "addOnUsersDescription", icon: "👤" },
  { nameKey: "addOnAnalytics", priceKey: "addOnAnalyticsPrice", descKey: "addOnAnalyticsDescription", icon: "📊" },
  { nameKey: "addOnAccountant", priceKey: "addOnAccountantPrice", descKey: "addOnAccountantDescription", icon: "🆓" },
] as const;

/* ── Comparison table ── */
type CellValue = "included" | "notIncluded" | string;
interface CompRow { featureKey: string; starter: CellValue; professional: CellValue; enterprise: CellValue }
interface CompCategory { categoryKey: string; rows: CompRow[] }

const comparison: CompCategory[] = [
  {
    categoryKey: "categorySTR",
    rows: [
      { featureKey: "featureProperties", starter: "1-3", professional: "4-15", enterprise: "16+" },
      { featureKey: "featurePlatformImport", starter: "included", professional: "included", enterprise: "included" },
      { featureKey: "featurePricingInsights", starter: "included", professional: "included", enterprise: "included" },
      { featureKey: "featureRevenueAnalytics", starter: "included", professional: "included", enterprise: "included" },
      { featureKey: "featureChannelComparison", starter: "included", professional: "included", enterprise: "included" },
      { featureKey: "featureGuestAnalytics", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureCountryReports", starter: "notIncluded", professional: "included", enterprise: "included" },
    ],
  },
  {
    categoryKey: "categoryFinancial",
    rows: [
      { featureKey: "featureBankImport", starter: "included", professional: "included", enterprise: "included" },
      { featureKey: "featureBasicReports", starter: "included", professional: "included", enterprise: "included" },
      { featureKey: "featureAIInvoice", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureFullPL", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureGoogleDrive", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureMultiYear", starter: "notIncluded", professional: "included", enterprise: "included" },
    ],
  },
  {
    categoryKey: "categoryTax",
    rows: [
      { featureKey: "featureBTW", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureIncomeTax", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureTouristTax", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureAuditTrail", starter: "notIncluded", professional: "included", enterprise: "included" },
    ],
  },
  {
    categoryKey: "categoryPlatform",
    rows: [
      { featureKey: "featureUsers", starter: "1", professional: "1", enterprise: "unlimited" },
      { featureKey: "featureAPI", starter: "notIncluded", professional: "notIncluded", enterprise: "included" },
      { featureKey: "featureWhiteLabel", starter: "notIncluded", professional: "notIncluded", enterprise: "included" },
      { featureKey: "featureAccountantAccess", starter: "free", professional: "free", enterprise: "free" },
    ],
  },
  {
    categoryKey: "categorySupport",
    rows: [
      { featureKey: "featureEmailSupport", starter: "included", professional: "included", enterprise: "included" },
      { featureKey: "featurePrioritySupport", starter: "notIncluded", professional: "included", enterprise: "included" },
      { featureKey: "featureDedicatedSupport", starter: "notIncluded", professional: "notIncluded", enterprise: "included" },
    ],
  },
];

/* ── Value props ── */
const valueProps = [
  { key: "valueNoFees", icon: "💳" },
  { key: "valueScale", icon: "📈" },
  { key: "valueSecurity", icon: "🔒" },
  { key: "valueCancel", icon: "🚀" },
] as const;

const faqCount = 9;

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const tp = useTranslations("PricingPage");
  const tf = useTranslations("PricingFAQ");
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // first expanded

  function renderCell(value: CellValue) {
    if (value === "included") return <span className="text-brand-teal font-semibold">{tp("included")}</span>;
    if (value === "notIncluded") return <span className="text-gray-300">{tp("notIncluded")}</span>;
    if (value === "free") return <span className="text-brand-teal text-xs font-semibold">{tp("free")}</span>;
    if (value === "unlimited") return <span className="text-sm font-medium">{tp("unlimited")}</span>;
    return <span className="text-sm">{value}</span>;
  }

  return (
    <>
      {/* ── 1. Header ── */}
      <section className="bg-off-white py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-extrabold text-deep-blue sm:text-5xl">
              {tp("title")}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{tp("subtitle")}</p>
          </div>
          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? "text-gray-900" : "text-gray-500"}`}>{t("monthly")}</span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${annual ? "bg-brand-blue" : "bg-gray-300"}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 translate-y-1 rounded-full bg-white shadow-sm transition-transform ${annual ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-gray-900" : "text-gray-500"}`}>{t("annual")}</span>
            {annual && <span className="rounded-full bg-brand-teal/10 px-3 py-0.5 text-xs font-semibold text-brand-teal">{t("annualSave")}</span>}
          </div>
        </Container>
      </section>

      {/* ── 2. Pricing Cards ── */}
      <section className="bg-off-white pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => {
              const isPopular = plan.popular;
              const price = annual && plan.annualPriceKey ? t(plan.annualPriceKey) : t(plan.priceKey);
              const isCustom = plan.priceKey === "enterprisePrice";
              return (
                <div
                  key={plan.nameKey}
                  className={`relative flex flex-col rounded-2xl p-8 ${isPopular ? "border-2 border-brand-blue bg-white shadow-lg lg:-mt-4 lg:mb-[-1rem] lg:py-10" : "border border-gray-200 bg-white"} ${isPopular ? "order-first lg:order-none" : ""}`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-semibold text-white">{t("mostPopular")}</span>
                  )}
                  <h3 className="font-heading text-xl font-bold text-deep-blue">{t(plan.nameKey)}</h3>
                  <p className="mt-1 text-sm text-gray-500">{t(plan.descKey)}</p>
                  <div className="mt-6">
                    {isCustom ? (
                      <span className="font-heading text-4xl font-extrabold text-deep-blue">{price}</span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-4xl font-extrabold text-deep-blue">€{price}</span>
                        <span className="text-sm text-gray-500">{t("perMonth")}</span>
                      </div>
                    )}
                    {annual && !isCustom && <p className="mt-1 text-xs text-gray-400">{t("billedAnnually")}</p>}
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-600">{t(plan.propsKey)}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((fKey) => (
                      <li key={fKey} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {t(fKey)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href={plan.ctaHref} variant={isPopular ? "primary" : "secondary"} size="md" className="w-full">{t(plan.ctaKey)}</Button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">{t("trustLine")}</p>
        </Container>
      </section>

      {/* ── 3. Add-Ons ── */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">{tp("addOnsTitle")}</h2>
            <p className="mt-4 text-lg text-gray-600">{tp("addOnsSubtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((a) => (
              <div key={a.nameKey} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <span className="text-3xl">{a.icon}</span>
                <h3 className="mt-3 font-heading text-base font-bold text-deep-blue">{tp(a.nameKey)}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-blue">{tp(a.priceKey)}</p>
                <p className="mt-2 text-sm text-gray-500">{tp(a.descKey)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. Feature Comparison Table ── */}
      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <h2 className="text-center font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">{tp("compareTitle")}</h2>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="sticky left-0 bg-off-white py-3 pr-4 font-medium text-gray-500" />
                  <th className="px-4 py-3 text-center font-heading font-bold text-deep-blue">{t("starterName")}</th>
                  <th className="px-4 py-3 text-center font-heading font-bold text-white bg-brand-blue rounded-t-lg">{t("professionalName")}</th>
                  <th className="px-4 py-3 text-center font-heading font-bold text-deep-blue">{t("enterpriseName")}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((cat) => (
                  <>
                    <tr key={cat.categoryKey}>
                      <td colSpan={4} className="sticky left-0 bg-gray-100 px-0 py-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {tp(cat.categoryKey)}
                      </td>
                    </tr>
                    {cat.rows.map((row) => (
                      <tr key={row.featureKey} className="border-b border-gray-100">
                        <td className="sticky left-0 bg-off-white py-3 pr-4 text-gray-700">{tp(row.featureKey)}</td>
                        <td className="px-4 py-3 text-center">{renderCell(row.starter)}</td>
                        <td className="px-4 py-3 text-center bg-brand-blue/5">{renderCell(row.professional)}</td>
                        <td className="px-4 py-3 text-center">{renderCell(row.enterprise)}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ── 5. Value Proposition Strip ── */}
      <section className="bg-white py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {valueProps.map(({ key, icon }) => (
              <div key={key} className="flex flex-col items-center text-center">
                <span className="text-3xl">{icon}</span>
                <p className="mt-2 text-sm font-semibold text-gray-700">{tp(key)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. Pricing FAQ ── */}
      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <h2 className="text-center font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">{tf("title")}</h2>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-gray-200">
            {Array.from({ length: faqCount }, (_, i) => {
              const idx = i + 1;
              const isOpen = openFaq === i;
              return (
                <div key={idx}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between py-5 text-left" aria-expanded={isOpen}>
                    <span className="pr-4 text-base font-semibold text-gray-900">{tf(`q${idx}`)}</span>
                    <svg className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {isOpen && <p className="pb-5 pr-12 text-sm leading-relaxed text-gray-600">{tf(`a${idx}`)}</p>}
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            {tf("contactPrompt")}{" "}
            <span className="font-semibold text-brand-blue cursor-pointer hover:underline">{tf("contactLink")}</span>
          </p>
        </Container>
      </section>

      {/* ── 7. CTA Banner ── */}
      <CTABanner />
    </>
  );
}
