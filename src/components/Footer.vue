<template lang="pug">
    v-footer(
        color="transparent" 
        :class="[drawer ? 'menu-open' : '', drawer && mini ? 'menu-open-mini' : '', $store.state.backToTop && !drawer ? 'back-active' : '', $store.state.backToTop && drawer && !mini ? 'back-active-menu' : '', $store.state.backToTop && drawer && mini ? 'back-active-menu-mini' : '']")
        .v-footer-content
            a(href="http://www.progresus.co/" target="_blank")
                figure.progresus(:class="$store.state.darkTheme ? 'light' : ''")
                    span {{$t('Desarrollado por')}}
                    .symbol
                    .typography
            small © {{ new Date().getFullYear() }} • {{ $store.state.title }}
</template>

<script>
    export default {
        props: {
            drawer: {
                type: Boolean,
                default: false,
            },
            mini: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>