import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import PrivacyContent from "./PrivacyContent";

type Props = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myadmin.jabaki.nl";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPage" });
  const url = `${siteUrl}/${locale}/privacy`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: { nl: `${siteUrl}/nl/privacy`, en: `${siteUrl}/en/privacy` },
    },
    openGraph: {
      url,
    },
  };
}

export default function PrivacyPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <PrivacyContent />;
}
