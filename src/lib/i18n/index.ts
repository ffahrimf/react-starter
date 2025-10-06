import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./lang/en.json";
import translationId from "./lang/id.json";

const resources = {
  en: {
    translation: translationEn,
  },
  id: {
    translation: translationId,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "id",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
