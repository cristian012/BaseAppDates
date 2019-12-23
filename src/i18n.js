import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './i18n/en.json'
import es from './i18n/es.json'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    'en': en,
    'es': es
  },
  silentTranslationWarn: true
})