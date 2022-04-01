import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";

export const I18nLoader = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  const init = () =>
    i18n
      .use(Backend)
      .use(initReactI18next)
      .init({
        lng: "en",
        backend: {
          /* translation file path */
          loadPath: process.env.PUBLIC_URL + "/assets/i18n/{{ns}}/{{lng}}.json",
        },
        fallbackLng: "en",
        debug: false,
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false,
        interpolation: {
          escapeValue: false,
          formatSeparator: ",",
        },
        react: {
          wait: true,
        },
      });

  useEffect(() => {
    if (!i18n.isInitialized) {
      init().then(() => setInitialized(true));
    }
  }, []);

  if (initialized) return children;

  return null;
};

export default i18n;
