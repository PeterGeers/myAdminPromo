import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import TermsContent from "./TermsContent";

type Props = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myadmin.jabaki.nl";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsPage" });
  const url = `${siteUrl}/${locale}/terms`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: { nl: `${siteUrl}/nl/terms`, en: `${siteUrl}/en/terms` },
    },
  };
}

export default function TermsPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <TermsContent />;
}
