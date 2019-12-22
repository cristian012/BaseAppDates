/**
 * Cuando el DOM ha sido cargado
 * @callback cb
 */

/**
 * Cargar elemento al DOM
 * @param {cb} cb - Cuando el DOM ha sido cargado
 */
export default function (cb) {
    
    if (document.readyState !== 'loading') {
        this.$nextTick(() => cb())
    } else {
        document.addEventListener('DOMContentLoaded', () => cb())
    }
}