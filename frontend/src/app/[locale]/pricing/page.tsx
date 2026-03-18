import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function PricingPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("PricingPage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-heading text-4xl font-bold text-deep-blue">
        {t("title")}
      </h1>
    </main>
  );
}
