import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

const metrics = [
  { key: "metric1", icon: "📄" },
  { key: "metric2", icon: "⚙️" },
  { key: "metric3", icon: "✅" },
  { key: "metric4", icon: "👨‍💼" },
] as const;

export default function SocialProofSection() {
  const t = useTranslations("SocialProof");

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <h2 className="text-center font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">
          {t("title")}
        </h2>

        {/* Metrics bar */}
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map(({ key, icon }) => (
            <div key={key} className="flex flex-col items-center text-center">
              <span className="text-4xl">{icon}</span>
              <p className="mt-3 text-sm font-semibold text-gray-700 sm:text-base">
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
