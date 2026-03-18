import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

const painPoints = [
  { key: "pain1", icon: "📊" },
  { key: "pain2", icon: "💰" },
  { key: "pain3", icon: "📄" },
  { key: "pain4", icon: "⏰" },
] as const;

const benefits = [
  { key: "benefit1", icon: "🤖" },
  { key: "benefit2", icon: "🎯" },
  { key: "benefit3", icon: "✅" },
  { key: "benefit4", icon: "⚡" },
] as const;

export default function ProblemSolutionSection() {
  const t = useTranslations("ProblemSolution");

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subtitle")}</p>
        </div>

        {/* Before / After columns */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* BEFORE card */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <span className="inline-block rounded-full bg-gray-200 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-gray-600">
              {t("beforeLabel")}
            </span>

            {/* Chaotic flow mini-diagram */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="rounded bg-gray-200 px-3 py-1">Airbnb</span>
              <span>→</span>
              <span className="rounded bg-gray-200 px-3 py-1">Excel</span>
              <span>→</span>
              <span className="rounded bg-gray-200 px-3 py-1">Accountant</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="rounded bg-gray-200 px-3 py-1">Booking</span>
              <span>→</span>
              <span className="rounded bg-gray-200 px-3 py-1">Bank</span>
              <span>→</span>
              <span className="rounded bg-gray-200 px-3 py-1">Tax advisor</span>
            </div>

            <ul className="mt-8 space-y-4">
              {painPoints.map(({ key, icon }) => (
                <li key={key} className="flex items-start gap-3 text-gray-600">
                  <span className="text-xl leading-6">{icon}</span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER card */}
          <div className="rounded-2xl border-2 border-brand-teal/30 bg-brand-teal/5 p-8">
            <span className="inline-block rounded-full bg-brand-teal/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-brand-teal">
              {t("afterLabel")}
            </span>

            {/* Clean unified flow */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-brand-teal">
              <span className="rounded bg-brand-teal/10 px-3 py-1">Bookings</span>
              <span>→</span>
              <span className="rounded bg-brand-teal/10 px-3 py-1">Finance</span>
              <span>→</span>
              <span className="rounded bg-brand-teal/10 px-3 py-1">Taxes</span>
            </div>
            <p className="mt-2 text-center text-xs text-brand-teal/70">
              myAdmin
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map(({ key, icon }) => (
                <li key={key} className="flex items-start gap-3 text-gray-700">
                  <span className="text-xl leading-6">{icon}</span>
                  <span className="font-medium">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
