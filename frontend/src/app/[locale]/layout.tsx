import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myadmin.jabaki.nl";

export const metadata: Metadata = {
  title:
    "myAdmin — Manage your rentals. Handle your taxes. All in one platform.",
  description:
    "myAdmin is the integrated platform for short-term rental property managers. Rental analytics, financial administration, and tax compliance in one tool.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "myAdmin — Manage your rentals. Handle your taxes. All in one platform.",
    description:
      "The integrated platform for STR property managers. Rental analytics, financial administration, and tax compliance in one tool.",
    url: siteUrl,
    siteName: "myAdmin",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "myAdmin — All-in-one platform for STR property managers",
      },
    ],
    locale: "nl_NL",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "myAdmin — All-in-one platform for STR property managers",
    description:
      "Rental analytics, financial administration, and tax compliance in one tool.",
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="font-sans text-deep-slate bg-off-white antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
