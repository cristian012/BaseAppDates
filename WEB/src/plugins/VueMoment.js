import timezone from 'moment-timezone'

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$moment', { value: timezone });
    }
}