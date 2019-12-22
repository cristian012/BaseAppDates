<template lang="pug">
    .global-content
        toolbar
            v-tooltip(bottom)
                v-btn(icon @click="$store.commit('checkList')" slot="activator")
                    v-icon {{ $store.state.checkList ? '$vuetify.icons.checkbox-marked' : '$vuetify.icons.checkbox-blank-outline' }}
                span {{ $t('Multi-selección') }}
            v-tooltip(bottom)
                v-btn(icon @click="$store.commit('changeView')" slot="activator")
                    v-icon {{ $store.state.viewList == 1 ? '$vuetify.icons.view-grid' : '$vuetify.icons.view-sequential' }}
                span {{ $store.state.viewList == 1 ? $t('Vista de cuadricula') : $t('Vista de Lista') }}
            v-btn(icon @click="$store.commit('openFilter')")
                v-icon {{ $store.state.filter ? '$vuetify.icons.chevron-right' : '$vuetify.icons.search' }}

        filter-component
            v-checkbox.ma-0.mb-1(v-for="(i, k) in status" :key="k" :label="$t(i.name)" :value="i.value" v-model="filter.status" color="success" hide-details)
            v-divider.my-3
            v-radio-group.ma-0.mb-3(v-model="filter.order" hide-details)
                v-radio(v-for="(item, n) in orderBy" :key="n" :label="$t(item.text)" :value="item.value" color="success")
        
        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Clientes')}}

                v-layout(row wrap v-if="clients.length")
                    v-flex.d-flex.pos-r.overflow-hidden(v-for="(client, i) in clients" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'")
                        .v-sheet-back-options
                            .v-btns.justify-center
                                //- v-btn(dark icon depressed color="success" @click="$refs.detailClient.open(client)")
                                v-btn(dark icon depressed color="success" @click="openClientDetail(client.uuid)")
                                    v-icon(small) $vuetify.icons.detail
                                v-btn(dark icon depressed color="success" @click="$refs.manageClient.open()")
                                    v-icon(small) $vuetify.icons.edit
                                v-btn(dark icon depressed color="error" @click="$refs.deleteClient.open()")
                                    v-icon(small) $vuetify.icons.delete

                        .v-sheet(v-touch="{ left: () => swipe('Left', i), right: () => swipe('Right', i) }" :class="[swipeDirection == 'Right'+i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
                            svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                g#Capa_2(data-name='Capa 2')
                                    g#Capa_1-2(data-name='Capa 1')
                                        path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                            
                            a.full-link(@click="openClientDetail(client.uuid)")
                                
                            .v-sheet-options
                                v-menu(left)
                                    v-btn(slot="activator" icon flat)
                                        v-icon $vuetify.icons.dots-vertical
                                    v-list.v-sheet-options-items
                                        v-list-tile(@click="openClientDetail(client.uuid)")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.detail
                                            v-list-tile-title {{$t('Detalle')}}
                                        v-list-tile(@click="$refs.manageClient.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.edit
                                            v-list-tile-title {{$t('Editar')}}
                                        v-list-tile(@click="$refs.deleteClient.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.delete
                                            v-list-tile-title {{$t('Eliminar')}}

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
                                .v-sheet-select.mt-auto(v-show="$store.state.checkList")
                                    v-checkbox(v-model="massiveSelection" color="success" :value="client.uuid" hide-details)
                    
                    v-flex.flex-full
                        infinite-loading

                not-found(v-else message="No se encontraron clientes registrados")
                    v-btn(round depressed color="success" @click="$refs.manageClient.open()") {{$t('Agregar cliente')}}

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        count-results(:current-counter="clients.length" :total-counter="clients.length" :filter="$store.state.filter")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

        btns-floating(right bottom :filter="$store.state.filter")
            v-tooltip(top)
                v-btn(icon large color="primary" slot="activator")
                     v-icon $vuetify.icons.import
                span {{$t('Importar')}}
            v-tooltip(top)
                v-btn(icon large color="primary" slot="activator")
                    v-icon $vuetify.icons.export
                span {{$t('Exportar')}}
            v-tooltip(top)
                v-btn(icon large color="success" slot="activator" @click="$refs.manageClient.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar cliente')}}

        btns-floating.options-bottom(v-show="$store.state.checkList && massiveSelection.length")
            .v-btns.justify-center
                v-tooltip(top)
                    v-btn(icon large color="success" slot="activator"): v-icon $vuetify.icons.check-all
                    span {{ $t('Seleccionar todos') }}
                v-tooltip(top)
                    v-btn(icon large color="error" slot="activator" @click="$refs.deleteMassiveSelection.open()"): v-icon $vuetify.icons.delete
                    span {{ $t('Eliminar') }}
                v-tooltip(top)
                    v-btn(icon large outline slot="activator" @click="closeMassiveselection"): v-icon(small) $vuetify.icons.close
                    span {{ $t('Cancelar') }}

        manage-client(ref="manageClient")

        confirm(
            ref="deleteClient"
            @action=""
            title="Eliminar cliente"
            message="¿Realmente desea eliminar este cliente?")

        confirm(
            ref="deleteMassiveSelection"
            @action=""
            title="Eliminar clientes seleccionados"
            message="¿Realmente desea eliminar estos clientes seleccionados?")
</template>

<script>
    import db from '@/db.json'
    import manageClient from './components/ManageClient.vue'
    import app from '../../mixins/app'

    export default {
        mixins : [app],
        name: 'Clients',

        metaInfo() {
            return {
                title: this.$t('Clientes'),
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
                status: db.status,
                orderBy: db.orderBy,

                // Filtros
                filter: {
                    status: [0, 1],
                    order: 0
                },

                // Selección masiva
                massiveSelection: [],

                // Touch direction
                swipeDirection: 'None',
            }
        },

        methods: {
            openClientDetail(uuid) {
                this.$router.push({
                    name: 'ClientDetail', 
                    params: { uuid: uuid }
                })
            },

            closeMassiveselection() {
                this.massiveSelection = []
                this.$store.state.checkList = false
            },

            // Abrir opciones del Sheet
            swipe (direction, key) {
                this.swipeDirection = direction + key
            },
            openCloseSheet (key) {
                if(this.swipeDirection == 'Left' + key) {
                    return this.swipeDirection = 'Right' + key
                }
                else {
                    return this.swipeDirection = 'Left' + key
                }
            },
        },

        components: {
            manageClient
        }
    };
</script>