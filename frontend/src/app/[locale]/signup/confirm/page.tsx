"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

const REDIRECT_SECONDS = 5;
const DASHBOARD_URL = "https://app.myadmin.jabaki.nl/welcome";

const steps = ["step1", "step2", "step3"] as const;

export default function SignupConfirmPage() {
  const t = useTranslations("SignupConfirmation");
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = DASHBOARD_URL;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-off-white py-12">
      <Container className="flex justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h2 className="font-heading text-2xl font-bold text-deep-blue">
            {t("title")}
          </h2>
          <p className="mt-2 text-gray-600">{t("subtitle")}</p>

          {/* Quick-start steps */}
          <div className="mt-8 text-left">
            <p className="text-sm font-semibold text-deep-slate">
              {t("nextStepsTitle")}
            </p>
            <ol className="mt-3 space-y-3">
              {steps.map((key, i) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700">{t(key)}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA + countdown */}
          <a
            href={DASHBOARD_URL}
            className="mt-8 flex w-full items-center justify-center rounded-lg bg-brand-blue py-3 font-semibold text-white transition-colors hover:bg-deep-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {t("cta")}
          </a>

          <p className="mt-3 text-xs text-gray-400">
            {t("redirecting", { seconds: countdown })}
          </p>
        </div>
      </Container>
    </section>
  );
}
