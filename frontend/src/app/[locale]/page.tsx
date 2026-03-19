import { use } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import SocialProofSection from "@/components/sections/SocialProofSection";
import PricingSection from "@/components/sections/PricingSection";
import IntegrationShowcase from "@/components/sections/IntegrationShowcase";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myadmin.jabaki.nl";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tf = await getTranslations({ locale, namespace: "FAQ" });

  const faqCount = 8;
  const faqItems = Array.from({ length: faqCount }, (_, i) => ({
    "@type": "Question" as const,
    name: tf(`q${i + 1}`),
    acceptedAnswer: { "@type": "Answer" as const, text: tf(`a${i + 1}`) },
  }));

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "myAdmin",
    legalName: "Goodwin Solutions BV",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Integrated platform for STR property managers — rental analytics, financial administration, and tax compliance.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beemsterstraat 3",
      addressLocality: "Hoofddorp",
      postalCode: "2131 ZA",
      addressCountry: "NL",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <ScrollDepthTracker />
      <HeroSection />
      <ProblemSolutionSection />
      <FeatureShowcase />
      <SocialProofSection />
      <PricingSection />
      <IntegrationShowcase />
      <FAQSection />
      <CTABanner />
    </>
  );
}
