"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LegalPageLayout from "@/components/layout/LegalPageLayout";

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100 even:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-600">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TermsContent() {
  const t = useTranslations("TermsPage");

  const tocItems = [
    { id: "definitions", label: t("toc1") },
    { id: "account", label: t("toc2") },
    { id: "free-trial", label: t("toc3") },
    { id: "subscriptions", label: t("toc4") },
    { id: "payment", label: t("toc5") },
    { id: "your-data", label: t("toc6") },
    { id: "acceptable-use", label: t("toc7") },
    { id: "ip-rights", label: t("toc8") },
    { id: "liability", label: t("toc9") },
    { id: "warranty", label: t("toc10") },
    { id: "termination", label: t("toc11") },
    { id: "changes", label: t("toc12") },
    { id: "governing-law", label: t("toc13") },
    { id: "disputes", label: t("toc14") },
    { id: "contact", label: t("toc15") },
  ];

  return (
    <LegalPageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      lastUpdated={t("lastUpdated")}
      effectiveDate={t("effectiveDate")}
      intro={t("intro")}
      tocTitle={t("tocTitle")}
      tocItems={tocItems}
    >
      {/* 1. Definitions */}
      <section id="definitions">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc1")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("def1")}</li>
          <li>• {t("def2")}</li>
          <li>• {t("def3")}</li>
          <li>• {t("def4")}</li>
          <li>• {t("def5")}</li>
          <li>• {t("def6")}</li>
          <li>• {t("def7")}</li>
        </ul>
      </section>

      {/* 2. Account registration */}
      <section id="account">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc2")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("account1")}</li>
          <li>• {t("account2")}</li>
          <li>• {t("account3")}</li>
          <li>• {t("account4")}</li>
          <li>• {t("account5")}</li>
        </ul>
      </section>

      {/* 3. Free trial */}
      <section id="free-trial">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc3")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("trial1")}</li>
          <li>• {t("trial2")}</li>
          <li>• {t("trial3")}</li>
          <li>• {t("trial4")}</li>
          <li>• {t("trial5")}</li>
          <li>• {t("trial6")}</li>
          <li>• {t("trial7")}</li>
        </ul>
      </section>

      {/* 4. Subscriptions & plans */}
      <section id="subscriptions">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc4")}</h2>
        <div className="mt-4">
          <DataTable
            headers={[t("planHeader"), t("planPropertiesHeader"), t("planPriceHeader"), t("planBillingHeader")]}
            rows={[
              [t("planStarter"), t("planStarterProps"), t("planStarterPrice"), t("planStarterBilling")],
              [t("planPro"), t("planProProps"), t("planProPrice"), t("planProBilling")],
              [t("planEnterprise"), t("planEnterpriseProps"), t("planEnterprisePrice"), t("planEnterpriseBilling")],
            ]}
          />
        </div>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("sub1")}</li>
          <li>• {t("sub2")}</li>
          <li>• {t("sub3")}</li>
          <li>• {t("sub4")}</li>
          <li>• {t("sub5")}</li>
        </ul>
      </section>

      {/* 5. Payment terms */}
      <section id="payment">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc5")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("pay1")}</li>
          <li>• {t("pay2")}</li>
          <li>• {t("pay3")}</li>
          <li>• {t("pay4")}</li>
          <li>• {t("pay5")}</li>
          <li>• {t("pay6")}</li>
          <li>• {t("pay7")}</li>
          <li>• {t("pay8")}</li>
        </ul>
      </section>

      {/* 6. Your data & privacy */}
      <section id="your-data">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc6")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("data1")}</li>
          <li>
            • {t("data2")}{" "}
            <Link href="/privacy" className="text-brand-blue underline">
              {t("data2Link")}
            </Link>
          </li>
          <li>• {t("data3")}</li>
          <li>• {t("data4")}</li>
          <li>• {t("data5")}</li>
          <li>• {t("data6")}</li>
          <li>• {t("data7")}</li>
          <li>• {t("data8")}</li>
          <li>• {t("data9")}</li>
          <li>• {t("data10")}</li>
        </ul>
      </section>

      {/* 7. Acceptable use */}
      <section id="acceptable-use">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc7")}</h2>
        <p className="mt-4 text-base leading-relaxed text-gray-700">{t("useIntro")}</p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("use1")}</li>
          <li>• {t("use2")}</li>
          <li>• {t("use3")}</li>
          <li>• {t("use4")}</li>
          <li>• {t("use5")}</li>
          <li>• {t("use6")}</li>
          <li>• {t("use7")}</li>
        </ul>
        <p className="mt-3 text-base leading-relaxed text-gray-700">{t("useWarning")}</p>
      </section>

      {/* 8. Intellectual property */}
      <section id="ip-rights">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc8")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("ip1")}</li>
          <li>• {t("ip2")}</li>
          <li>• {t("ip3")}</li>
          <li>• {t("ip4")}</li>
        </ul>
      </section>

      {/* 9. Limitation of liability — warning styling */}
      <section id="liability">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc9")}</h2>
        <div className="mt-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-6">
          <ul className="space-y-2 text-base leading-relaxed text-gray-700">
            <li>• {t("liability1")}</li>
            <li>• {t("liability2")}</li>
            <li>• {t("liability3")}</li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-gray-700">{t("liabilityNotLiable")}</p>
          <ul className="mt-2 space-y-2 text-base leading-relaxed text-gray-700">
            <li>• {t("liability4")}</li>
            <li>• {t("liability5")}</li>
            <li>• {t("liability6")}</li>
            <li>• {t("liability7")}</li>
            <li>• {t("liability8")}</li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-gray-700">{t("liabilityDutchLaw")}</p>
          <p className="mt-2 text-base leading-relaxed text-gray-700">{t("liabilityExclusion")}</p>
        </div>
      </section>

      {/* 10. Warranty disclaimer */}
      <section id="warranty">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc10")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("warranty1")}</li>
          <li>• {t("warranty2")}</li>
          <li>• {t("warranty3")}</li>
          <li>• {t("warranty4")}</li>
          <li>• {t("warranty5")}</li>
        </ul>
      </section>

      {/* 11. Termination */}
      <section id="termination">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc11")}</h2>
        <h3 className="mt-4 text-lg font-semibold text-gray-800">{t("termByYou")}</h3>
        <ul className="mt-2 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("termYou1")}</li>
          <li>• {t("termYou2")}</li>
          <li>• {t("termYou3")}</li>
          <li>• {t("termYou4")}</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold text-gray-800">{t("termByUs")}</h3>
        <ul className="mt-2 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("termUs1")}</li>
          <li>• {t("termUs2")}</li>
          <li>• {t("termUs3")}</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold text-gray-800">{t("termAfter")}</h3>
        <ul className="mt-2 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("termAfter1")}</li>
          <li>• {t("termAfter2")}</li>
          <li>• {t("termAfter3")}</li>
          <li>• {t("termAfter4")}</li>
          <li>• {t("termAfter5")}</li>
        </ul>
      </section>

      {/* 12. Changes to these terms */}
      <section id="changes">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc12")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("changes1")}</li>
          <li>• {t("changes2")}</li>
          <li>• {t("changes3")}</li>
          <li>• {t("changes4")}</li>
          <li>• {t("changes5")}</li>
        </ul>
      </section>

      {/* 13. Governing law */}
      <section id="governing-law">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc13")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("law1")}</li>
          <li>• {t("law2")}</li>
          <li>• {t("law3")}</li>
          <li>• {t("law4")}</li>
        </ul>
      </section>

      {/* 14. Dispute resolution */}
      <section id="disputes">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc14")}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("dispute1")}</li>
          <li>• {t("dispute2")}</li>
          <li>• {t("dispute3")}</li>
          <li>• {t("dispute4")}</li>
        </ul>
      </section>

      {/* 15. Contact */}
      <section id="contact">
        <h2 className="font-heading text-2xl font-bold text-gray-900">{t("toc15")}</h2>
        <div className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <p>{t("contactCompany")}</p>
          <p>{t("contactKvk")}</p>
          <p>{t("contactBtw")}</p>
          <p>{t("contactAddr")}</p>
          <p>
            {t("contactGeneral")}{" "}
            <a href="mailto:peter@jabaki.nl" className="text-brand-blue underline">peter@jabaki.nl</a>
          </p>
          <p>
            {t("contactPrivacy")}{" "}
            <a href="mailto:privacy@jabaki.nl" className="text-brand-blue underline">privacy@jabaki.nl</a>
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
