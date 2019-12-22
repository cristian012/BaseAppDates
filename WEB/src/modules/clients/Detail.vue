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
                        v-icon.mr-2(size="20") $vuetify.icons.contacts
                        | {{ $t('Contactos') }} 
                        v-badge.ml-3
                            template(v-slot:badge) 
                                span 3
                    v-tab(@click="$vuetify.goTo('#section-2')") 
                        v-icon.mr-2(size="20") $vuetify.icons.opportunities
                        | {{ $t('Oportunidades') }} 
                        v-badge.ml-3
                            template(v-slot:badge) 
                                span 3
                    v-tab(@click="$vuetify.goTo('#section-3')")
                        v-icon.mr-2(size="20") $vuetify.icons.documents
                        | {{ $t('Documentos') }} 
                        v-badge.ml-3
                            template(v-slot:badge) 
                                span 3

                .detailpage-title
                    .detailpage-status(:class="{ 'success' : client.status, 'error' : !client.status }")
                    h1 {{ client.name }}
                    small.success--text ID: {{ client.id | placeholder('---') }}

                v-card(flat)
                    v-card-text
                        v-layout(row wrap)
                            v-flex.flex-300-fixed
                                .d-icon.mb-2
                                    v-icon.mr-2(size="26") $vuetify.icons.email
                                    div
                                        small {{ $t('Correo electrónico') }}
                                        .caption {{ client.email | placeholder('---') }}
                            v-flex.flex-300-fixed
                                .d-icon.mb-2
                                    v-icon.mr-2(size="26") $vuetify.icons.phone
                                    div
                                        small {{ $t('Teléfono') }}
                                        .caption {{ client.phone | placeholder('---') }}
                            v-flex.flex-300-fixed
                                .d-icon
                                    v-icon.mr-2(size="26") $vuetify.icons.place
                                    div
                                        small {{ $t('Dirección') }}
                                        .caption {{ client.address | placeholder('---') }}
                #section-1
                v-divider.my-5
                .detailpage-section
                    .detailpage-section-title
                        .flex-300
                            h2 {{$t('Contactos')}}
                            .v-btns
                                v-btn(outline round small color="success")
                                    v-icon.mr-2(small) $vuetify.icons.add
                                    | {{$t('Agregar contacto')}}
                        v-text-field.detailpage-section-search(v-if="client.contact != 0" color="success" :label="$t('Buscar') + '...'" append-icon="$vuetify.icons.search" v-model="filterContacts" clearable solo flat hide-details)
                    v-layout(row wrap)
                        template(v-for="item in client.contact")
                            v-flex.d-flex.pos-r.overflow-hidden(v-for="(contact, i) in filterBy(contacts, filterContacts)" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'" v-if="contact.uuid == item") 
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
                                        .v-sheet-status(:class="contact.status ? 'success' : 'error'")
                                        .set
                                            label {{$t('Nombre')}}
                                            h2.pr-4 {{ contact.name }}
                                        .set.mb-3
                                            label {{$t('Correo electrónico')}}
                                            h4.pr-4 {{ contact.email | placeholder('---') }}
                                        .set.mb-1
                                            label {{$t('Cargo')}}
                                            .v-sheet-icon
                                                v-icon(size="16") $vuetify.icons.work
                                                h4 {{ contact.job | placeholder('---') }}
                                        .set
                                            label {{$t('Teléfono')}}
                                            .v-sheet-icon
                                                v-icon(size="16") $vuetify.icons.phone
                                                h4 {{ contact.phone | placeholder('---') }}
                    not-found(
                        small
                        v-if="!filterBy(contacts, filterContacts).length || client.contact == 0" 
                        message="No se encontraron contactos"
                        icon="$vuetify.icons.search")
                
                #section-2
                v-divider.my-5
                .detailpage-section
                    .detailpage-section-title
                        .flex-300
                            h2 {{$t('Oportunidades')}}
                            .v-btns
                                v-btn(outline round small color="success")
                                    v-icon.mr-2(small) $vuetify.icons.add
                                    | {{$t('Agregar oportunidad')}}
                        v-text-field.detailpage-section-search(v-if="client.opportunity != 0" color="success" :label="$t('Buscar') + '...'" append-icon="$vuetify.icons.search" v-model="filterOpportunities" clearable solo flat hide-details)
                    v-layout(row wrap)
                        template(v-for="item in client.opportunity")
                            v-flex.d-flex.pos-r.overflow-hidden(v-for="(opportunity, i) in filterBy(opportunities, filterOpportunities)" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'" v-if="opportunity.uuid == item") 
                                .v-sheet-back-options.dark.lighten-1
                                    .v-btns.justify-center
                                        v-btn(dark icon depressed color="success" @click="")
                                            v-icon(small) $vuetify.icons.detail
                                        v-btn(dark icon depressed color="success" @click="")
                                            v-icon(small) $vuetify.icons.edit
                                .v-sheet(v-touch="{ left: () => swipe('LeftOppo', i), right: () => swipe('RightOppo', i) }" :class="[swipeDirection == 'RightOppo' + i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
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
                                                v-list-tile(@click="$refs.detailClient.open(client)")
                                                    v-list-tile-action 
                                                        v-icon $vuetify.icons.detail
                                                    v-list-tile-title Detalle
                                                v-list-tile(@click="")
                                                    v-list-tile-action 
                                                        v-icon $vuetify.icons.edit
                                                    v-list-tile-title Editar
                                    .v-sheet-content
                                        .set.mb-1
                                            label {{$t('Nombre')}}
                                            h2.pr-4 {{ opportunity.name }}
                                        .set.mb-3.flex-100
                                            label {{$t('OID')}}
                                            h4 OID-{{ opportunity.oid }}
                                        .set
                                            label {{$t('Precio')}}
                                            .v-sheet-icon
                                                v-icon(size="16") $vuetify.icons.money
                                                h4 {{ opportunity.price | currency($store.state.currency, 2, { thousandsSeparator: ',' }) | placeholder('---') }}
                                        v-divider.my-3
                                        .set
                                            label {{$t('Fecha de cierre')}}
                                            h5.v-sheet-label {{$t('Fecha de cierre')}}: 
                                            h4 {{ opportunity.dateClosing | formatDate('MMMM DD, YYYY') | capitalize | placeholder('---') }}
                                        v-divider.transparent.mt-auto
                                        .v-sheet-phase.mt-3(v-for="phase in phases.filter(phase => phase.value == opportunity.phase)" :class="phase.color")
                                            span {{ phase.name }}
                    not-found(
                        small
                        v-if="!filterBy(opportunities, filterOpportunities).length || client.opportunity == 0" 
                        message="No se encontraron oportunidades"
                        icon="$vuetify.icons.search")

                #section-3
                v-divider.my-5
                documents

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top
</template>

<script>
    import db from '@/db.json'
    import Vue2Filters from 'vue2-filters'
    import documents from '@/modules/documents/components/Section'

    export default {
        name: 'ClientDetail',
        mixins: [Vue2Filters.mixin],

        metaInfo() {
            return {
                title: this.$t('Cliente'),
                meta: [
                    { name: 'description', content: this.$t('Clientes SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                clients: db.clients,
                contacts: db.contacts,
                opportunities: db.opportunities,
                phases: db.phases,

                // Filtros
                filterContacts: '',
                filterOpportunities: '',

                // Touch direction
                swipeDirection: 'None',

                // Datos
                client: ''
            }
        },

        created(){
            this.clientDetail()
        },

        methods: {
            // Datos del cliente 
            clientDetail(){
                var client_uuid = this.$route.params.uuid
                this.client = this.clients.filter(item => item.uuid == client_uuid )[0]
            },

            // Abrir opciones del Sheet
            swipe (direction, key) {
                this.swipeDirection = direction + key
            },
        },

        components: {
            documents
        }
    };
</script>