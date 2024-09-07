import { createI18n } from "vue-i18n"

const i18n = createI18n({
  legacy: false,
  locale: "ja",
  fallbackLocale: "ja",
  messages: {
    en: {
      manga: "Manga",
      novel: "Novel",
    },
    ja: {
      manga: "漫画",
      novel: "小説",
    },
  },
})

export default i18n
