import { createI18n } from "vue-i18n";
import zhHans from "./locales/zh-Hans.json";
import en from "./locales/en.json";

// 实例化I18n
const i18n = createI18n({
    locale: "English",
    globalInjection: true,
    fallbackLocale: "English",
    legacy: false,
    messages: {
        "简体中文": zhHans,
        "English": en,
    },
})

export default i18n