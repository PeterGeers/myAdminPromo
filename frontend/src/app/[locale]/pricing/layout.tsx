import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myadmin.jabaki.nl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage" });

  const url = `${siteUrl}/${locale}/pricing`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: { nl: `${siteUrl}/nl/pricing`, en: `${siteUrl}/en/pricing` },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url,
      siteName: "myAdmin",
      type: "website",
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
