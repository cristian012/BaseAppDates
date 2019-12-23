import UUID from 'uuid-js'

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$uuid', { value: UUID });
    }
}