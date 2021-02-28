import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translation.json';

export const resources = {
  en: {
    translation: en,
  },
} as const;

i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === "development",
  lng: 'en',
  keySeparator: false,
  nsSeparator: false,
  resources,
});