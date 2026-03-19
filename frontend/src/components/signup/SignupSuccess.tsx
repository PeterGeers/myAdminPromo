"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

interface SignupSuccessProps {
  email: string;
}

const COOLDOWN_SECONDS = 60;

export default function SignupSuccess({ email }: SignupSuccessProps) {
  const t = useTranslations("EmailVerification");
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState("");

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || resending) return;

    setResending(true);
    setResendError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/api/signup/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setCooldown(COOLDOWN_SECONDS);
        return;
      }

      if (res.status === 429) {
        setCooldown(COOLDOWN_SECONDS);
        return;
      }

      // 404 or 410 — show generic hint, don't reveal details
      setResendError(t("spamHint"));
    } catch {
      setResendError(t("spamHint"));
    } finally {
      setResending(false);
    }
  }, [email, cooldown, resending, t]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-off-white py-12">
      <Container className="flex justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
          {/* Mail icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10">
            <svg className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <h2 className="font-heading text-2xl font-bold text-deep-blue">
            {t("title")}
          </h2>

          <p className="mt-3 text-gray-600">{t("description")}</p>
          <p className="mt-2 font-medium text-deep-slate">{email}</p>
          <p className="mt-4 text-sm text-gray-500">{t("instruction")}</p>

          {/* Resend section */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500">{t("didntReceive")}</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              className="mt-2 text-sm font-medium text-brand-blue transition-colors hover:text-deep-blue disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {resending ? (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t("resend")}
                </span>
              ) : cooldown > 0 ? (
                t("resendCooldown", { seconds: cooldown })
              ) : (
                t("resend")
              )}
            </button>

            {resendError && (
              <p className="mt-2 text-xs text-red-600">{resendError}</p>
            )}
          </div>

          {/* Spam hint */}
          <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs text-gray-500">{t("spamHint")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
