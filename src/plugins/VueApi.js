import { api, http, API_URL } from '../scripts/http'

export default {
    
    install(Vue) {
        if (!Vue.prototype.hasOwnProperty('$api')) {
            Object.defineProperty(Vue.prototype, '$api', { value: api });
        }
        if (!Vue.prototype.hasOwnProperty('$http')) { 
            Object.defineProperty(Vue.prototype, '$http', { value: http });
        }
        if (!Vue.prototype.hasOwnProperty('$apiurl')) { 
            Object.defineProperty(Vue.prototype, '$apiurl', { value: API_URL });
        }
    }
}