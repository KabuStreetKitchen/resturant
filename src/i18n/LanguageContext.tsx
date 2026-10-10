import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_LANGUAGE,
  languages,
  translations,
  type LanguageCode,
  type LanguageMeta,
  type TranslationSchema,
} from "@/i18n/translations";

const STORAGE_KEY = "ksk-language";

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
  meta: LanguageMeta;
  /** Resolved translation object for the active language. */
  t: TranslationSchema;
  languages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLanguageCode = (value: string | null): value is LanguageCode =>
  !!value && value in translations;

const getInitialLang = (): LanguageCode => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLanguageCode(stored) ? stored : DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LanguageCode>(getInitialLang);

  const meta = useMemo(
    () => languages.find((language) => language.code === lang) ?? languages[0],
    [lang],
  );

  // Keep the document in sync so screen readers, hyphenation and RTL text work.
  useEffect(() => {
    document.documentElement.lang = meta.intlLocale;
    document.documentElement.dir = meta.dir;
  }, [meta]);

  const setLang = useCallback((code: LanguageCode) => {
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore storage failures (private mode etc.) - language still applies for the session.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, meta, t: translations[lang], languages }),
    [lang, setLang, meta],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within a LanguageProvider");
  return ctx;
};
