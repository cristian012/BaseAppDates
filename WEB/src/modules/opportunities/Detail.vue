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
                        v-icon.mr-2(size="20") $vuetify.icons.activities
                        | {{ $t('Actividades') }} 
                        v-badge.ml-3
                            template(v-slot:badge) 
                                span 3
                    v-tab(@click="$vuetify.goTo('#section-2')")
                        v-icon.mr-2(size="20") $vuetify.icons.notes
                        | {{ $t('Notas') }} 
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
                    .detailpage-status(:class="phases.filter(phase => phase.value == opportunity.phase)[0].color")
                    h1 {{ opportunity.name }}
                    .d-flex.align-center
                        .v-state-circle.flex-0.mr-2(:class="phases.filter(phase => phase.value == opportunity.phase)[0].color")
                        span {{ phases.filter(phase => phase.value == opportunity.phase)[0].name }}

                v-layout(row wrap)
                    v-flex.d-flex.flex-300
                        v-card.ma-0(flat)
                            v-card-text
                                v-layout(row wrap)
                                    v-flex.flex-300-fixed
                                        .d-icon.mb-2
                                            v-icon.mr-2(size="26") $vuetify.icons.client
                                            div
                                                small {{ $t('Cliente') }}
                                                .caption {{ opportunity.client && clients.filter(item => item.uuid == opportunity.client )[0].name | placeholder('---') }}
                                    v-flex.flex-300-fixed
                                        .d-icon.mb-2
                                            v-icon.mr-2(size="26") $vuetify.icons.contacts
                                            div
                                                small {{ $t('Contacto') }}
                                                .caption {{ opportunity.contact && contacts.filter(item => item.uuid == opportunity.contact )[0].name | placeholder('---') }}
                                    v-flex.flex-300-fixed
                                        .d-icon
                                            v-icon.mr-2(size="26") $vuetify.icons.users
                                            div
                                                small {{ $t('Vendedor') }}
                                                .caption {{ opportunity.user && users.filter(item => item.uuid == opportunity.user )[0].name | placeholder('---') }}
                        
                    v-flex.d-flex.flex-300
                        v-card.ma-0(flat)
                            v-card-text
                                v-layout(row wrap)
                                    v-flex.flex-300-fixed
                                        .d-icon.mb-2
                                            v-icon.mr-2(size="26") $vuetify.icons.date
                                            div
                                                small {{ $t('Fecha de apertura') }}
                                                .caption {{ opportunity.dateOpening | formatDate('MMMM DD, YYYY') | capitalize | placeholder('---') }}
                                    v-flex.flex-300-fixed
                                        .d-icon.mb-2
                                            v-icon.mr-2(size="26") $vuetify.icons.date
                                            div
                                                small {{ $t('Fecha de cierre') }}
                                                .caption {{ opportunity.dateClosing | formatDate('MMMM DD, YYYY') | capitalize | placeholder('---') }}
                    
                    v-flex.d-flex.flex-700
                        v-card.ma-0(flat)
                            v-card-text
                                v-layout(row wrap)
                                    v-flex.flex-300-fixed
                                        small {{ $t('Costo') }}
                                        .headline {{ opportunity.cost | currency($store.state.currency, 0) | placeholder('---') }}
                                    v-flex.flex-300-fixed
                                        small {{ $t('Precio') }}
                                        .headline {{ opportunity.price | currency($store.state.currency, 0) | placeholder('---') }}
                                    v-flex.flex-300-fixed(:class="(opportunity.price - opportunity.cost) < 0 ? 'error--text' : 'success--text'")
                                        small {{ $t('Margen') }}
                                        .headline {{ opportunity.price - opportunity.cost | currency($store.state.currency, 0) | placeholder('---') }} / {{ ((opportunity.price - opportunity.cost) * 100) / opportunity.cost | currency('', 0) | placeholder('---') }}%

                #section-1
                v-divider.my-5
                activities
                
                #section-2
                v-divider.my-5
                notes

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
    import activities from '@/modules/activities/components/Section'
    import notes from '@/modules/notes/components/Section'
    import documents from '@/modules/documents/components/Section'

    export default {
        name: 'OpportunityDetail',
        mixins: [Vue2Filters.mixin],

        metaInfo() {
            return {
                title: this.$t('Oportunidad'),
                meta: [
                    { name: 'description', content: this.$t('Oportunidad SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                opportunities: db.opportunities,
                phases: db.phases,
                clients: db.clients,
                contacts: db.contacts,
                users: db.users,

                // Touch direction
                swipeDirection: 'None',

                // Datos
                opportunity: ''
            }
        },

        created(){
            this.opportunityDetail()
        },

        methods: {
            // Datos del contacto 
            opportunityDetail(){
                var opportunity_uuid = this.$route.params.uuid
                this.opportunity = this.opportunities.filter(item => item.uuid == opportunity_uuid )[0]
            },

            // Abrir opciones del Sheet
            swipe (direction, key) {
                this.swipeDirection = direction + key
            },
        },

        components: {
            activities,
            notes,
            documents
        }
    };
</script>