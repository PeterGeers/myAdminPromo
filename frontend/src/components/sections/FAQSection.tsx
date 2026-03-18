"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

const faqCount = 8;

export default function FAQSection() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="bg-off-white py-16 sm:py-20">
      <Container>
        <h2 className="text-center font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-gray-200">
          {Array.from({ length: faqCount }, (_, i) => {
            const idx = i + 1;
            const isOpen = openIndex === i;
            return (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-base font-semibold text-gray-900">
                    {t(`q${idx}`)}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-12 text-sm leading-relaxed text-gray-600">
                    {t(`a${idx}`)}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          {t("contactPrompt")}{" "}
          <span className="font-semibold text-brand-blue cursor-pointer hover:underline">
            {t("contactLink")}
          </span>
        </p>
      </Container>
    </section>
  );
}
