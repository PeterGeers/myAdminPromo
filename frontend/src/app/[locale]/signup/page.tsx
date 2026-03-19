"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SignupForm from "@/components/signup/SignupForm";
import SignupSuccess from "@/components/signup/SignupSuccess";
import { trackEvent } from "@/lib/analytics";

const platformLogos = [
  { name: "Airbnb", src: "/logos/airbnb.svg" },
  { name: "Booking.com", src: "/logos/booking.svg" },
  { name: "Rabobank", src: "/logos/rabobank.svg" },
  { name: "ING", src: "/logos/ing.svg" },
];

const benefits = [
  "benefit1",
  "benefit2",
  "benefit3",
  "benefit4",
  "benefit5",
  "benefit6",
] as const;

export default function SignupPage() {
  const t = useTranslations("Signup");
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  if (successEmail) {
    return <SignupSuccess email={successEmail} />;
  }

  return (
    <section className="min-h-screen bg-off-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[45%_55%] lg:gap-16">
          {/* Left column — value props */}
          <div className="lg:sticky lg:top-28">
            <h1 className="font-heading text-3xl font-extrabold leading-tight text-deep-blue sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{t("subtitle")}</p>

            <ul className="mt-8 space-y-3">
              {benefits.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-700">{t(key)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-gray-500">{t("trustSignal")}</p>

            <div className="mt-4 flex flex-wrap items-center gap-6 opacity-60 grayscale">
              {platformLogos.map((logo) => (
                <img key={logo.name} src={logo.src} alt={logo.name} className="h-8 w-auto object-contain" />
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className="relative">
            <SignupForm onSuccess={setSuccessEmail} />

            {/* Social signup — UI only */}
            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-off-white px-4 text-sm text-gray-400">
                    {t("orSignUpWith")}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  disabled
                  onClick={() => trackEvent("sign_up_social_click", { method: "google" })}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {t("signUpGoogle")}
                </button>
                <button
                  type="button"
                  disabled
                  onClick={() => trackEvent("sign_up_social_click", { method: "microsoft" })}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#00A4EF">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                  </svg>
                  {t("signUpMicrosoft")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
