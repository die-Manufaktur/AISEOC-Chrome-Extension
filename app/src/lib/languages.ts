import type { LanguageConfig } from "@/types/seo";

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "fr", name: "French", nativeName: "Fran\u00e7ais", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "es", name: "Spanish", nativeName: "Espa\u00f1ol", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "ja", name: "Japanese", nativeName: "\u65E5\u672C\u8A9E", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "pt", name: "Portuguese", nativeName: "Portugu\u00eas", flag: "\u{1F1F5}\u{1F1F9}" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "\u{1F1F3}\u{1F1F1}" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "\u{1F1F5}\u{1F1F1}" },
];

export const DEFAULT_LANGUAGE_CODE = "en";

export function getLanguageByCode(code: string): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
}

export function detectLanguage(htmlLang: string): string {
  if (!htmlLang) return DEFAULT_LANGUAGE_CODE;
  const code = htmlLang.toLowerCase().split("-")[0];
  const supported = SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
  return supported ? supported.code : DEFAULT_LANGUAGE_CODE;
}

export function getFallbackMessage(langCode: string): string {
  const messages: Record<string, string> = {
    fr: "Impossible de g\u00e9n\u00e9rer une recommandation pour le moment. Veuillez r\u00e9essayer.",
    de: "Kann derzeit keine Empfehlung generieren. Bitte versuchen Sie es erneut.",
    es: "No se puede generar una recomendaci\u00f3n en este momento. Por favor, int\u00e9ntelo de nuevo.",
    it: "Impossibile generare un consiglio al momento. Si prega di riprovare.",
    ja: "\u73FE\u5728\u304A\u3059\u3059\u3081\u3092\u751F\u6210\u3067\u304D\u307E\u305B\u3093\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
    pt: "N\u00e3o \u00e9 poss\u00edvel gerar uma recomenda\u00e7\u00e3o neste momento. Tente novamente.",
    nl: "Kan momenteel geen aanbeveling genereren. Probeer het opnieuw.",
    pl: "Nie mo\u017cna wygenerowa\u0107 rekomendacji w tym momencie. Spr\u00f3buj ponownie.",
  };
  return messages[langCode] ?? "Unable to generate recommendation at this time. Please try again.";
}
