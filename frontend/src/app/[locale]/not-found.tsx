import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-heading text-6xl font-bold text-deep-blue">404</h1>
      <p className="mt-4 text-lg text-gray-600">{t("title")}</p>
      <p className="mt-2 text-sm text-gray-500">{t("description")}</p>
      <Link href="/" className="mt-6 text-brand-blue hover:underline">
        {t("backHome")}
      </Link>
    </main>
  );
}
