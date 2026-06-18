import "server-only";

const dictionaries = {
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export type Locale = "de" | "en";

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.de();
};
