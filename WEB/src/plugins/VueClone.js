import cloneDeep from 'clone-deep'

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$cloneDeep', { value: cloneDeep });
    }
}