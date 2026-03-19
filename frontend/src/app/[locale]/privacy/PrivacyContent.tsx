"use client";

import { useTranslations } from "next-intl";
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
              <th
                key={h}
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100 even:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const gdprRights = [
  { icon: "📋", key: "access" },
  { icon: "✏️", key: "rectify" },
  { icon: "🗑️", key: "erase" },
  { icon: "📦", key: "port" },
  { icon: "⛔", key: "restrict" },
  { icon: "🚫", key: "object" },
] as const;

export default function PrivacyContent() {
  const t = useTranslations("PrivacyPage");

  const tocItems = [
    { id: "who-we-are", label: t("toc1") },
    { id: "data-we-collect", label: t("toc2") },
    { id: "why-we-collect", label: t("toc3") },
    { id: "cookies", label: t("toc4") },
    { id: "third-party", label: t("toc5") },
    { id: "data-storage", label: t("toc6") },
    { id: "your-rights", label: t("toc7") },
    { id: "children", label: t("toc8") },
    { id: "changes", label: t("toc9") },
    { id: "contact", label: t("toc10") },
  ];

  return (
    <LegalPageLayout
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      intro={t("intro")}
      tocTitle={t("tocTitle")}
      tocItems={tocItems}
    >
      {/* 1. Who we are */}
      <section id="who-we-are">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc1")}
        </h2>
        <div className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <p>{t("whoWeAreText")}</p>
          <p>{t("whoWeAreAddress")}</p>
          <p>
            {t("whoWeAreEmail")}{" "}
            <a href="mailto:privacy@jabaki.nl" className="text-brand-blue underline">
              privacy@jabaki.nl
            </a>
          </p>
        </div>
      </section>

      {/* 2. Data we collect */}
      <section id="data-we-collect">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc2")}
        </h2>
        <div className="mt-4">
          <DataTable
            headers={[t("dataTypeHeader"), t("dataExamplesHeader"), t("dataRequiredHeader")]}
            rows={[
              [t("dataType1"), t("dataExamples1"), t("dataRequired1")],
              [t("dataType2"), t("dataExamples2"), t("dataRequired2")],
              [t("dataType3"), t("dataExamples3"), t("dataRequired3")],
              [t("dataType4"), t("dataExamples4"), t("dataRequired4")],
              [t("dataType5"), t("dataExamples5"), t("dataRequired5")],
            ]}
          />
        </div>
      </section>

      {/* 3. Why we collect it */}
      <section id="why-we-collect">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc3")}
        </h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <li>• {t("legalBasis1")}</li>
          <li>• {t("legalBasis2")}</li>
          <li>• {t("legalBasis3")}</li>
          <li>• {t("legalBasis4")}</li>
        </ul>
      </section>

      {/* 4. Cookies */}
      <section id="cookies">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc4")}
        </h2>
        <div className="mt-4">
          <DataTable
            headers={[t("cookieNameHeader"), t("cookiePurposeHeader"), t("cookieTypeHeader"), t("cookieDurationHeader")]}
            rows={[
              [t("cookie1Name"), t("cookie1Purpose"), t("cookie1Type"), t("cookie1Duration")],
              [t("cookie2Name"), t("cookie2Purpose"), t("cookie2Type"), t("cookie2Duration")],
              [t("cookie3Name"), t("cookie3Purpose"), t("cookie3Type"), t("cookie3Duration")],
              [t("cookie4Name"), t("cookie4Purpose"), t("cookie4Type"), t("cookie4Duration")],
              [t("cookie5Name"), t("cookie5Purpose"), t("cookie5Type"), t("cookie5Duration")],
            ]}
          />
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            {t("cookieNote")}
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
            className="mt-3 rounded-lg border border-brand-blue px-4 py-2 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-blue/5"
          >
            {t("manageCookies")}
          </button>
        </div>
      </section>

      {/* 5. Third-party services */}
      <section id="third-party">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc5")}
        </h2>
        <div className="mt-4">
          <DataTable
            headers={[t("serviceHeader"), t("servicePurposeHeader"), t("serviceDataHeader")]}
            rows={[
              [t("service1Name"), t("service1Purpose"), t("service1Data")],
              [t("service2Name"), t("service2Purpose"), t("service2Data")],
              [t("service3Name"), t("service3Purpose"), t("service3Data")],
              [t("service4Name"), t("service4Purpose"), t("service4Data")],
              [t("service5Name"), t("service5Purpose"), t("service5Data")],
              [t("service6Name"), t("service6Purpose"), t("service6Data")],
            ]}
          />
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            {t("thirdPartyNote")}
          </p>
        </div>
      </section>

      {/* 6. Data storage & retention */}
      <section id="data-storage">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc6")}
        </h2>
        <div className="mt-4">
          <DataTable
            headers={[t("storageDataHeader"), t("storageLocationHeader"), t("storageRetentionHeader")]}
            rows={[
              [t("storage1Data"), t("storage1Location"), t("storage1Retention")],
              [t("storage2Data"), t("storage2Location"), t("storage2Retention")],
              [t("storage3Data"), t("storage3Location"), t("storage3Retention")],
              [t("storage4Data"), t("storage4Location"), t("storage4Retention")],
            ]}
          />
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
            <li>• {t("storageNote1")}</li>
            <li>• {t("storageNote2")}</li>
            <li>• {t("storageNote3")}</li>
            <li>• {t("storageNote4")}</li>
            <li>• {t("storageNote5")}</li>
          </ul>
        </div>
      </section>

      {/* 7. Your rights */}
      <section id="your-rights">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc7")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          {t("rightsIntro")}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gdprRights.map(({ icon, key }) => (
            <div
              key={key}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center"
            >
              <span className="text-2xl" role="img" aria-hidden="true">
                {icon}
              </span>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                {t(`right_${key}_title`)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {t(`right_${key}_desc`)}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base leading-relaxed text-gray-700">
          {t("rightsContact")}{" "}
          <a href="mailto:privacy@jabaki.nl" className="text-brand-blue underline">
            privacy@jabaki.nl
          </a>
          . {t("rightsResponse")}
        </p>
        <p className="mt-2 text-base leading-relaxed text-gray-700">
          {t("rightsComplaint")}
        </p>
      </section>

      {/* 8. Children's privacy */}
      <section id="children">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc8")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          {t("childrenText")}
        </p>
      </section>

      {/* 9. Changes to this policy */}
      <section id="changes">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc9")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          {t("changesText")}
        </p>
      </section>

      {/* 10. Contact us */}
      <section id="contact">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          {t("toc10")}
        </h2>
        <div className="mt-4 space-y-2 text-base leading-relaxed text-gray-700">
          <p>{t("contactText")}</p>
          <p>
            {t("contactEmailLabel")}{" "}
            <a href="mailto:privacy@jabaki.nl" className="text-brand-blue underline">
              privacy@jabaki.nl
            </a>
          </p>
          <p>{t("contactAddress")}</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
