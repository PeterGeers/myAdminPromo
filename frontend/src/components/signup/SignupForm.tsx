"use client";

import { useState, useCallback, useId, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<string, string>>;

const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(pw: string): "weak" | "fair" | "good" | "strong" {
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);
  if (pw.length >= 12 && hasUpper && hasNumber && hasSpecial) return "strong";
  if (pw.length >= 10 && hasUpper && hasNumber && hasSpecial) return "good";
  if (pw.length >= 8 && hasUpper && hasNumber) return "fair";
  return "weak";
}

interface SignupFormProps {
  onSuccess: (email: string) => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const t = useTranslations("Signup");
  const v = useTranslations("SignupValidation");
  const id = useId();

  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedStart = useRef(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    propertyRange: "",
    referralSource: "",
    terms: false,
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateField = useCallback(
    (name: string, value: string | boolean): string | undefined => {
      switch (name) {
        case "firstName":
        case "lastName": {
          const s = value as string;
          const prefix = name === "firstName" ? "firstName" : "lastName";
          if (!s.trim()) return v(`${prefix}Required`);
          if (s.trim().length < 2) return v(`${prefix}MinLength`);
          if (s.length > 50) return v(`${prefix}MaxLength`);
          if (!NAME_REGEX.test(s)) return v(`${prefix}Invalid`);
          return undefined;
        }
        case "email": {
          const s = value as string;
          if (!s.trim()) return v("emailRequired");
          if (!EMAIL_REGEX.test(s)) return v("emailInvalid");
          if (s.length > 254) return v("emailTooLong");
          return undefined;
        }
        case "password": {
          const s = value as string;
          if (!s) return v("passwordRequired");
          if (s.length < 8) return v("passwordMinLength");
          if (s.length > 128) return v("passwordMaxLength");
          if (!/[A-Z]/.test(s)) return v("passwordUppercase");
          if (!/[0-9]/.test(s)) return v("passwordNumber");
          return undefined;
        }
        case "companyName": {
          const s = value as string;
          if (s.length > 100) return v("companyNameMaxLength");
          return undefined;
        }
        case "terms":
          if (!value) return v("termsRequired");
          return undefined;
        default:
          return undefined;
      }
    },
    [v]
  );

  const handleFormFocus = () => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent("sign_up_start", { method: "email" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setServerError("");
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => new Set(prev).add(name));
    const val = form[name as keyof typeof form];
    const err = validateField(name, val);
    setErrors((prev) => {
      if (err) return { ...prev, [name]: err };
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("sign_up_submit", { method: "email" });

    // Validate all fields
    const newErrors: FieldErrors = {};
    for (const [key, value] of Object.entries(form)) {
      const err = validateField(key, value);
      if (err) newErrors[key] = err;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(new Set(Object.keys(form)));
      const firstKey = Object.keys(newErrors)[0];
      const el = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstKey}"]`
      );
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    setServerError("");

    const email = form.email.trim().toLowerCase();

    // Read honeypot value to send to backend (backend returns fake 200 if filled)
    const hp = formRef.current?.querySelector<HTMLInputElement>(
      'input[name="website"]'
    );

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email,
      password: form.password,
      companyName: form.companyName.trim() || undefined,
      propertyRange: form.propertyRange || undefined,
      referralSource: form.referralSource || undefined,
      acceptedTerms: form.terms,
      locale: document.documentElement.lang || "nl",
      honeypot: hp?.value ?? "",
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const csrfSecret = process.env.NEXT_PUBLIC_CSRF_SECRET || "";

      const res = await fetch(`${apiUrl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfSecret,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // 200 (honeypot silent success) or 201 (real success)
        trackEvent("sign_up_complete", { method: "email" });
        onSuccess(email);
        return;
      }

      if (res.status === 409) {
        setErrors({ email: v("emailExists") });
        return;
      }

      if (res.status === 422) {
        // Backend returns field-level validation errors
        const data = await res.json();
        if (data.errors && typeof data.errors === "object") {
          const fieldErrors: FieldErrors = {};
          const fieldMap: Record<string, string> = {
            firstName: "firstNameRequired",
            lastName: "lastNameRequired",
            email: "emailInvalid",
            password: "passwordMinLength",
            acceptedTerms: "termsRequired",
          };
          for (const [field, _msg] of Object.entries(data.errors)) {
            // Use our translated messages, falling back to server message
            fieldErrors[field === "acceptedTerms" ? "terms" : field] =
              v(fieldMap[field] ?? "serverError");
          }
          setErrors(fieldErrors);
          setTouched(new Set(Object.keys(form)));
        } else {
          setServerError(v("serverError"));
        }
        return;
      }

      if (res.status === 429) {
        setServerError(v("rateLimited"));
        return;
      }

      setServerError(v("serverError"));
    } catch {
      setServerError(v("networkError"));
    } finally {
      setSubmitting(false);
    }
  };

  const fieldId = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;
  const hasError = (name: string) => touched.has(name) && !!errors[name];
  const isValid = (name: string) =>
    touched.has(name) && !errors[name] && form[name as keyof typeof form];

  const inputClasses = (name: string) =>
    `block w-full rounded-lg border px-4 py-3 text-deep-slate placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
      hasError(name)
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
        : isValid(name)
          ? "border-green-400 focus:border-brand-blue focus:ring-brand-blue/30"
          : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue/30"
    }`;

  const propertyRanges = [
    { value: "1-5", label: t("propertyRange1") },
    { value: "6-20", label: t("propertyRange2") },
    { value: "21-50", label: t("propertyRange3") },
    { value: "50+", label: t("propertyRange4") },
  ];

  const referralSources = [
    { value: "google_search", label: t("referralGoogle") },
    { value: "social_media", label: t("referralSocial") },
    { value: "friend", label: t("referralFriend") },
    { value: "blog", label: t("referralBlog") },
    { value: "podcast", label: t("referralPodcast") },
    { value: "other", label: t("referralOther") },
  ];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={handleFormFocus}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
    >
      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor={fieldId("website")}>
          Do not fill this out
          <input
            type="text"
            id={fieldId("website")}
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </div>
      )}

      {/* First name + Last name row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={fieldId("firstName")}
            className="mb-1.5 block text-sm font-medium text-deep-slate"
          >
            {t("firstName")} <span className="text-red-500">*</span>
          </label>
          <input
            id={fieldId("firstName")}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError("firstName")}
            aria-describedby={hasError("firstName") ? errorId("firstName") : undefined}
            className={inputClasses("firstName")}
          />
          {hasError("firstName") && (
            <p id={errorId("firstName")} className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={fieldId("lastName")}
            className="mb-1.5 block text-sm font-medium text-deep-slate"
          >
            {t("lastName")} <span className="text-red-500">*</span>
          </label>
          <input
            id={fieldId("lastName")}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError("lastName")}
            aria-describedby={hasError("lastName") ? errorId("lastName") : undefined}
            className={inputClasses("lastName")}
          />
          {hasError("lastName") && (
            <p id={errorId("lastName")} className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mt-4">
        <label
          htmlFor={fieldId("email")}
          className="mb-1.5 block text-sm font-medium text-deep-slate"
        >
          {t("email")} <span className="text-red-500">*</span>
        </label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={hasError("email")}
          aria-describedby={hasError("email") ? errorId("email") : undefined}
          className={inputClasses("email")}
        />
        {hasError("email") && (
          <p id={errorId("email")} className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mt-4">
        <label
          htmlFor={fieldId("password")}
          className="mb-1.5 block text-sm font-medium text-deep-slate"
        >
          {t("password")} <span className="text-red-500">*</span>
        </label>
        <PasswordInput
          id={fieldId("password")}
          name="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={hasError("password")}
          errorId={hasError("password") ? errorId("password") : undefined}
          showLabel={t("showPassword")}
          hideLabel={t("hidePassword")}
          className={inputClasses("password")}
        />
        {form.password && <PasswordStrength strength={getPasswordStrength(form.password)} />}
        {hasError("password") && (
          <p id={errorId("password")} className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      {/* Company name (optional) */}
      <div className="mt-4">
        <label
          htmlFor={fieldId("companyName")}
          className="mb-1.5 block text-sm font-medium text-deep-slate"
        >
          {t("companyName")}
        </label>
        <input
          id={fieldId("companyName")}
          name="companyName"
          type="text"
          autoComplete="organization"
          value={form.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={hasError("companyName")}
          aria-describedby={hasError("companyName") ? errorId("companyName") : undefined}
          className={inputClasses("companyName")}
        />
        {hasError("companyName") && (
          <p id={errorId("companyName")} className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.companyName}
          </p>
        )}
      </div>

      {/* Property range (optional) */}
      <div className="mt-4">
        <label
          htmlFor={fieldId("propertyRange")}
          className="mb-1.5 block text-sm font-medium text-deep-slate"
        >
          {t("propertyRange")}
        </label>
        <select
          id={fieldId("propertyRange")}
          name="propertyRange"
          value={form.propertyRange}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputClasses("propertyRange")} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
        >
          <option value="">{t("propertyRangePlaceholder")}</option>
          {propertyRanges.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Referral source (optional) */}
      <div className="mt-4">
        <label
          htmlFor={fieldId("referralSource")}
          className="mb-1.5 block text-sm font-medium text-deep-slate"
        >
          {t("referralSource")}
        </label>
        <select
          id={fieldId("referralSource")}
          name="referralSource"
          value={form.referralSource}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputClasses("referralSource")} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
        >
          <option value="">{t("referralPlaceholder")}</option>
          {referralSources.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Terms checkbox */}
      <div className="mt-6">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError("terms")}
            aria-describedby={hasError("terms") ? errorId("terms") : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
          />
          <span className="text-sm text-gray-600">
            {t.rich("termsAgree", {
              terms: (chunks) => (
                <Link href="/terms" className="text-brand-blue underline hover:text-deep-blue">
                  {chunks}
                </Link>
              ),
              privacy: (chunks) => (
                <Link href="/privacy" className="text-brand-blue underline hover:text-deep-blue">
                  {chunks}
                </Link>
              ),
            })}
            {" "}<span className="text-red-500">*</span>
          </span>
        </label>
        {hasError("terms") && (
          <p id={errorId("terms")} className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.terms}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center rounded-lg bg-brand-blue py-3 font-semibold text-white transition-colors hover:bg-deep-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          t("submitButton")
        )}
      </button>

      {/* Already have an account */}
      <p className="mt-4 text-center text-sm text-gray-500">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/" className="font-medium text-brand-blue hover:text-deep-blue">
          {t("logIn")}
        </Link>
      </p>
    </form>
  );
}
