import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";

const categories = [
  {
    titleKey: "bookingPlatforms",
    integrations: [
      { name: "Airbnb", logo: "/logos/airbnb.svg" },
      { name: "Booking.com", logo: "/logos/booking.svg" },
      { name: "Vrbo", logo: "/logos/vrbo.svg", comingSoon: true },
    ],
  },
  {
    titleKey: "financialServices",
    integrations: [
      { name: "Rabobank", logo: "/logos/rabobank.svg" },
      { name: "ABN AMRO", logo: null },
      { name: "Google Drive", logo: null },
    ],
  },
  {
    titleKey: "taxCompliance",
    integrations: [
      { name: "Belastingdienst", logo: "/logos/belastingdienst.svg" },
      { name: "Excel / CSV", logo: null },
      { name: "PDF export", logo: null },
    ],
  },
] as const;

export default function IntegrationShowcase() {
  const t = useTranslations("Integrations");

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.titleKey} className="text-center">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-gray-500">
                {t(cat.titleKey)}
              </h3>
              <div className="mt-6 space-y-5">
                {cat.integrations.map((item) => (
                  <div key={item.name} className="relative flex flex-col items-center gap-2">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain grayscale transition-all hover:grayscale-0"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-600">{item.name}</span>
                    )}
                    {"comingSoon" in item && item.comingSoon && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-400">
                        {t("comingSoon")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-500">
          {t("requestIntegration")}
        </p>
      </Container>
    </section>
  );
}
