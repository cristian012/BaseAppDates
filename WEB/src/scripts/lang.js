import CRM from '../scripts/const'

export default (langs, fallback) => {

    if (!process.browser) {
        return
    }

    let nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;
    
    //idioma por defecto
    let currentLanguage = CRM.LANG;
    
    //navegadores con soporte HTML5
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
            currentLanguage = language;
            break;
        }
      }
    }

    //navegadores sin soporte de HTML5
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        currentLanguage = language;
        break;
      }
    }

    let lang = currentLanguage.substring(0, 2)
    if (langs != undefined) {
      return langs.indexOf(lang) != -1 ? lang : fallback
    } else {
      return fallback
    }
}