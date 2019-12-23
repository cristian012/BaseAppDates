<template lang="pug">
    .global-content
        toolbar
        
        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Notificaciones')}}

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

</template>

<script>
    import db from '@/db.json'

    export default {
        name: 'Notifications',

        metaInfo() {
            return {
                title: this.$t('Notificaciones'),
                meta: [
                    { name: 'description', content: this.$t('Notificaciones SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                userData: db.userData
            }
        }
    };
</script>