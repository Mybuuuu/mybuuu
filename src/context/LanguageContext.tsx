'use client';

import React, { createContext, useContext, useState, useEffect, useTransition, useCallback, useMemo } from 'react';
import idTranslations from '../../messages/id.json';

interface LanguageContextType {
  locale: string;
  t: (key: string) => string;
  changeLanguage: (lang: string) => void;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper for resolving nested JSON paths like "hero.typewriter.hello"
const getNestedValue = (obj: unknown, path: string): unknown => {
  if (!obj) return path;
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return current;
};

export const LanguageProvider = ({
  locale: initialLocale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState(initialLocale);
  const [dictionary, setDictionary] = useState<unknown>(idTranslations);
  const [isPending, startTransition] = useTransition();

  // Load translations on locale change
  useEffect(() => {
    const loadDict = async () => {
      try {
        let dict: unknown;
        if (locale === 'id') {
          dict = idTranslations;
        } else {
          // Dynamic import for code-splitting and lazy-loading
          const mod = await import(`../../messages/${locale}.json`);
          dict = mod.default;
        }
        setDictionary(dict);
        
        // Dynamically update document properties
        if (typeof document !== 'undefined') {
          document.documentElement.lang = locale;
          
          // Update Page Title
          const title = getNestedValue(dict, 'seo.title');
          document.title = typeof title === 'string' ? title : 'Denny | Management Student & Web Developer';
          
          // Update Meta Description
          const desc = getNestedValue(dict, 'seo.description');
          if (typeof desc === 'string' && desc !== 'seo.description') {
            document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
          }
        }
      } catch (err) {
        console.error('Failed to load dictionary for locale:', locale, err);
      }
    };
    loadDict();
  }, [locale]);

  const changeLanguage = useCallback((lang: string) => {
    startTransition(() => {
      // Save user preference
      localStorage.setItem('portfolio_locale', lang);
      document.cookie = `portfolio_locale=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Update browser URL without reload
      const hash = window.location.hash;
      window.history.pushState(null, '', `/${lang}${hash}`);
      
      // Update state to trigger client-side re-render
      setLocale(lang);
    });
  }, []);

  const t = useCallback((key: string): string => {
    const val = getNestedValue(dictionary, key);
    // If it's an array, return it as string or let key handle it (fallback)
    return typeof val === 'string' ? val : key;
  }, [dictionary]);

  const contextValue = useMemo(() => ({
    locale,
    t,
    changeLanguage,
    isPending
  }), [locale, t, changeLanguage, isPending]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
