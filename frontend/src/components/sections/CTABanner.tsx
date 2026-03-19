"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export default function CTABanner() {
  const t = useTranslations("CTABanner");

  return (
    <section className="bg-deep-blue py-16">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-sm text-white/70">{t("subtitle")}</p>
          </div>
          <Button
            href="/signup"
            variant="secondary"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-deep-blue"
            onClick={() => trackEvent("cta_click", { location: "cta_banner", label: "start_trial" })}
          >
            {t("cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
