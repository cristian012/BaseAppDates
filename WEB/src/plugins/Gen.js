import qs from 'querystring'

export default {
    
    install(Vue) {
        
        if (!Vue.prototype.hasOwnProperty('$qs')) {
            Object.defineProperty(Vue.prototype, '$qs', {
                value: qs
            });
        }
    }
}