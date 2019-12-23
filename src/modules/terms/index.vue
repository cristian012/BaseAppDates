<template lang="pug">
    .global-content
        v-content
            v-container(grid-list-lg)
                .text-logo
                    //- Logo SalesMan
                    //- img(src="@/assets/img/logo-hor.svg" alt="Logo") 
                    //- Logo Memorial
                    img(src="@/assets/img/memorial/logo.svg" alt="Logo")
                h1 {{$t('Políticas de privacidad, términos y condiciones')}}
                .text-content(v-html="terms")

        footer-component.mx-auto

        btns-floating(left bottom)
            back-to-top

</template>

<script>
    import db from '@/db.json'

    export default {
        name: 'Terms',

        metaInfo() {
            return {
                title: this.$t('Términos y condiciones'),
                meta: [
                    { name: 'description', content: this.$t('Términos y condiciones SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                terms: db.terms
            }
        }
    };
</script>