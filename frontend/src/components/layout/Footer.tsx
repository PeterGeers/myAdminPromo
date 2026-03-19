"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("product"),
      links: [
        { label: t("features"), href: "/#features" },
        { label: t("pricing"), href: "/pricing" },
        { label: t("integrations"), href: "/#integrations" },
        { label: t("faq"), href: "/#faq" },
        // { label: t("changelog"), href: "/changelog" },
      ],
    },
    {
      title: t("company"),
      links: [
        // { label: t("about"), href: "/about" },
        // { label: t("blog"), href: "/blog" },
        // { label: t("careers"), href: "/careers" },
        { label: t("contact"), href: "mailto:peter@jabaki.nl", external: true },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("privacy"), href: "/privacy" },
        { label: t("terms"), href: "/terms" },
        // { label: t("cookies"), href: "#cookies" },
        // { label: t("gdpr"), href: "/gdpr" },
      ],
    },
    {
      title: t("connect"),
      links: [
        // { label: t("twitter"), href: "https://x.com/myadmin", external: true },
        // { label: t("linkedin"), href: "https://linkedin.com/company/myadmin", external: true },
        { label: t("email"), href: "mailto:peter@jabaki.nl", external: true },
        // { label: t("youtube"), href: "https://youtube.com/@myadmin", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-deep-slate" role="contentinfo">
      <Container className="py-12 sm:py-16">
        {/* Logo + tagline */}
        <div className="mb-10">
          <Link href="/">
            <img
              src="/logo-dark.png"
              alt="myAdmin"
              className="h-7 w-auto"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-gray-400">
            {t("tagline")}
          </p>
        </div>

        {/* Link columns: 4-col → 2×2 → stacked */}
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => {
                  const isExternal = "external" in link && link.external;
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <Container className="py-6">
          <p className="text-center text-sm text-gray-500 sm:text-left">
            {t("copyright", { year })}
          </p>
        </Container>
      </div>
    </footer>
  );
}
