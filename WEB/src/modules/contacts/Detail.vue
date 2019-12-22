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
                    .detailpage-status(:class="{ 'success' : contact.status, 'error' : !contact.status }")
                    h1 {{ contact.name }}

                v-card(flat)
                    v-card-text
                        v-layout(row wrap)
                            v-flex.flex-300-fixed
                                .d-icon.mb-2
                                    v-icon.mr-2(size="26") $vuetify.icons.email
                                    div
                                        small {{ $t('Correo electrónico') }}
                                        .caption {{ contact.email | placeholder('---') }}
                            v-flex.flex-300-fixed
                                .d-icon.mb-2
                                    v-icon.mr-2(size="26") $vuetify.icons.phone
                                    div
                                        small {{ $t('Teléfono') }}
                                        .caption {{ contact.phone | placeholder('---') }}
                            v-flex.flex-300-fixed
                                .d-icon
                                    v-icon.mr-2(size="26") $vuetify.icons.work
                                    div
                                        small {{ $t('Cargo') }}
                                        .caption {{ contact.job | placeholder('---') }}
                #section-1
                v-divider.my-5
                .detailpage-section
                    .detailpage-section-title
                        .flex-300
                            h2 {{$t('Clientes')}}
                        v-text-field.detailpage-section-search(v-if="contact.client != 0" color="success" :label="$t('Buscar') + '...'" append-icon="$vuetify.icons.search" v-model="filterClients" clearable solo flat hide-details)
                    v-layout(row wrap)
                        template(v-for="item in contact.client")
                            v-flex.d-flex.pos-r.overflow-hidden(v-for="(client, i) in filterBy(clients, filterClients)" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'" v-if="client.uuid == item") 
                                .v-sheet-back-options
                                    .v-btns.justify-center
                                        v-btn(dark icon depressed color="success" @click="")
                                            v-icon(small) $vuetify.icons.detail
                                        v-btn(dark icon depressed color="success" @click="")
                                            v-icon(small) $vuetify.icons.edit
                                        v-btn(dark icon depressed color="error" @click="")
                                            v-icon(small) $vuetify.icons.remove
                                .v-sheet(v-touch="{ left: () => swipe('LeftCont', i), right: () => swipe('RightCont', i) }" :class="[swipeDirection == 'RightCont' + i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
                                    svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                        g#Capa_2(data-name='Capa 2')
                                            g#Capa_1-2(data-name='Capa 1')
                                                path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                                    a.full-link(@click="")
                                    .v-sheet-options
                                        v-menu(left)
                                            v-btn(slot="activator" icon flat)
                                                v-icon $vuetify.icons.dots-vertical
                                            v-list.v-sheet-options-items
                                                v-list-tile(@click="")
                                                    v-list-tile-action 
                                                        v-icon $vuetify.icons.detail
                                                    v-list-tile-title {{$t('Detalle')}}
                                                v-list-tile(@click="")
                                                    v-list-tile-action 
                                                        v-icon $vuetify.icons.edit
                                                    v-list-tile-title {{$t('Editar')}}
                                                v-list-tile(@click="")
                                                    v-list-tile-action 
                                                        v-icon $vuetify.icons.remove
                                                    v-list-tile-title {{$t('Desvincular')}}
                                    .v-sheet-content
                                        .v-sheet-status(:class="client.status ? 'success' : 'error'")
                                        .set
                                            label {{$t('Nombre')}}
                                            h2.pr-4 {{ client.name }}
                                        .set.mb-3
                                            label {{$t('Correo electrónico')}}
                                            h4.pr-4 {{ client.email | placeholder('---') }}
                                        .set.mb-1
                                            label {{$t('Dirección')}}
                                            .v-sheet-icon
                                                v-icon(size="16") $vuetify.icons.place
                                                h4 {{ client.address | placeholder('---') }}
                                        .set
                                            label {{$t('Teléfono')}}
                                            .v-sheet-icon
                                                v-icon(size="16") $vuetify.icons.phone
                                                h4 {{ client.phone | placeholder('---') }}
                    not-found(
                        small
                        v-if="!filterBy(clients, filterClients).length || contact.client == 0" 
                        message="No se encontraron clientes"
                        icon="$vuetify.icons.search")

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top
</template>

<script>
    import db from '@/db.json'
    import Vue2Filters from 'vue2-filters'

    export default {
        name: 'ContactDetail',
        mixins: [Vue2Filters.mixin],

        metaInfo() {
            return {
                title: this.$t('Contacto'),
                meta: [
                    { name: 'description', content: this.$t('Contacto SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                clients: db.clients,
                contacts: db.contacts,

                // Filtros
                filterClients: '',

                // Touch direction
                swipeDirection: 'None',

                // Datos
                contact: ''
            }
        },

        created(){
            this.contactDetail()
        },

        methods: {
            // Datos del contacto 
            contactDetail(){
                var contact_uuid = this.$route.params.uuid
                this.contact = this.contacts.filter(item => item.uuid == contact_uuid )[0]
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