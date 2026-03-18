import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import SocialProofSection from "@/components/sections/SocialProofSection";
import PricingSection from "@/components/sections/PricingSection";
import IntegrationShowcase from "@/components/sections/IntegrationShowcase";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
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
