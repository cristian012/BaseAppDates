<template lang="pug">
    .global-content.detailpage
        toolbar
            v-tooltip(bottom)
                v-btn(icon @click="$store.commit('changeView')" slot="activator")
                    v-icon {{ $store.state.viewList == 1 ? '$vuetify.icons.view-grid' : '$vuetify.icons.view-sequential' }}
                span {{ $store.state.viewList == 1 ? $t('Vista de cuadricula') : $t('Vista de Lista') }}
        
        v-content
            v-container(fluid grid-list-lg)
                v-tabs.detailpage-tabs(:class="{ 'detailpage-tabs-menu-open' : $store.state.drawer, 'detailpage-tabs-menu-open-mini' : $store.state.drawer && $store.state.mini }")
                    v-btn(icon @click="$router.go(-1)")
                        v-icon(size="20") $vuetify.icons.back
                    v-tab(@click="$vuetify.goTo(0)") 
                        v-icon.mr-2(size="20") $vuetify.icons.home
                        | {{ $t('Inicio') }} 
                    v-tab(@click="$vuetify.goTo('#section-1')")
                        v-icon.mr-2(size="20") $vuetify.icons.clients
                        | {{ $t('Clientes') }} 
                        v-badge.ml-3
                            template(v-slot:badge) 
                                span 3

                .detailpage-title
                    .detailpage-status(:class="{ 'success' : obj.status, 'error' : !obj.status }")
                    h1 {{ obj.name }}

                v-card(flat)
                    v-card-text
                        v-layout(row wrap)
                            v-flex.flex-300-fixed
                                .d-icon.mb-2
                                    v-icon.mr-2(size="26") $vuetify.icons.email
                                    div
                                        small {{ $t('Correo electrónico') }}
                                        .caption {{ obj.email | placeholder('---') }}
                            v-flex.flex-300-fixed
                                .d-icon.mb-2
                                    v-icon.mr-2(size="26") $vuetify.icons.phone
                                    div
                                        small {{ $t('Teléfono') }}
                                        .caption {{ obj.phone | placeholder('---') }}
                            v-flex.flex-300-fixed
                                .d-icon
                                    v-icon.mr-2(size="26") $vuetify.icons.work
                                    div
                                        small {{ $t('Cargo') }}
                                        .caption {{ obj.job | placeholder('---') }}


        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top
</template>

<script>
    import db from '@/db.json'
    import Vue2Filters from 'vue2-filters'
    import app from '../../mixins/app'

    export default {
        name: 'objDetail',
        mixins: [Vue2Filters.mixin,app],

        metaInfo() {
            return {
                title: this.$t('objo'),
                meta: [
                    { name: 'description', content: this.$t('objo SalesMan CRM') }
                ]
            }
        },

        data() {
            return {

                // Filtros
                filterClients: '',

                // Touch direction
                swipeDirection: 'None',

                // Datos
                obj: []
            }
        },

        created(){
            this.objDetail()
        },

        methods: {
            // Datos del objo 
            objDetail(){
                var obj_uuid = this.$route.params.uuid
                //this.obj = this.objs.filter(item => item.uuid == obj_uuid )[0]
            },

            // Abrir opciones del Sheet
            swipe (direction, key) {
                this.swipeDirection = direction + key
            },
        },

        components: {
        }
    };
</script>