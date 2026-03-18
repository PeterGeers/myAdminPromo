import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Deep-merge source into target (target values take precedence)
function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...source };
  for (const key of Object.keys(target)) {
    if (
      typeof target[key] === "object" &&
      target[key] !== null &&
      typeof result[key] === "object" &&
      result[key] !== null
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        result[key] as Record<string, unknown>
      );
    } else {
      result[key] = target[key];
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Fallback chain: active locale → EN → NL → key name
  // Load NL as the base, then EN on top, then active locale on top
  const nlMessages = (await import(`../../messages/nl.json`)).default;
  const enMessages = (await import(`../../messages/en.json`)).default;

  let messages: Record<string, unknown>;
  if (locale === "nl") {
    // NL is active: NL → EN → NL (NL wins, EN fills gaps)
    messages = deepMerge(nlMessages, enMessages);
  } else if (locale === "en") {
    // EN is active: EN → NL (EN wins, NL fills gaps)
    messages = deepMerge(enMessages, nlMessages);
  } else {
    // Future locales: active → EN → NL
    const localeMessages = (await import(`../../messages/${locale}.json`))
      .default;
    const base = deepMerge(enMessages, nlMessages);
    messages = deepMerge(localeMessages, base);
  }

  return {
    locale,
    messages,
    timeZone: "Europe/Amsterdam",
  };
});
