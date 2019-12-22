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
                h1 {{$t('Contactos')}}

                v-layout(row wrap v-if="contacts.length")
                    v-flex.d-flex.pos-r.overflow-hidden(v-for="(contact, i) in contacts" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'")
                        .v-sheet-back-options
                            .v-btns.justify-center
                                v-btn(dark icon depressed color="success" @click="openContactDetail(contact.uuid)")
                                    v-icon(small) $vuetify.icons.detail
                                v-btn(dark icon depressed color="success" @click="$refs.manageContact.open()")
                                    v-icon(small) $vuetify.icons.edit
                                v-btn(dark icon depressed color="error" @click="$refs.deleteContact.open()")
                                    v-icon(small) $vuetify.icons.delete

                        .v-sheet(v-touch="{ left: () => swipe('Left', i), right: () => swipe('Right', i) }" :class="[swipeDirection == 'Right'+i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
                            svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                g#Capa_2(data-name='Capa 2')
                                    g#Capa_1-2(data-name='Capa 1')
                                        path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                            
                            a.full-link(@click="openContactDetail(contact.uuid)")
                                
                            .v-sheet-options
                                v-menu(left)
                                    v-btn(slot="activator" icon flat)
                                        v-icon $vuetify.icons.dots-vertical
                                    v-list.v-sheet-options-items
                                        v-list-tile(@click="openContactDetail(contact.uuid)")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.detail
                                            v-list-tile-title {{$t('Detalle')}}
                                        v-list-tile(@click="$refs.manageContact.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.edit
                                            v-list-tile-title {{$t('Editar')}}
                                        v-list-tile(@click="$refs.deleteContact.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.delete
                                            v-list-tile-title {{$t('Eliminar')}}

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
                                .v-sheet-select.mt-auto(v-show="$store.state.checkList")
                                    v-checkbox(v-model="massiveSelection" color="success" :value="contact.uuid" hide-details)
                    
                    v-flex.flex-full
                        infinite-loading

                not-found(v-else message="No se encontraron contactos registrados")
                    v-btn(round depressed color="success" @click="$refs.manageContact.open()") {{$t('Agregar contacto')}}

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        count-results(:current-counter="contacts.length" :total-counter="contacts.length" :filter="$store.state.filter")

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
                v-btn(icon large color="success" slot="activator" @click="$refs.manageContact.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar contacto')}}

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

        manage-contact(ref="manageContact")

        confirm(
            ref="deleteContact"
            @action=""
            title="Eliminar contacto"
            message="¿Realmente desea eliminar este contacto?")

        confirm(
            ref="deleteMassiveSelection"
            @action=""
            title="Eliminar contactos seleccionados"
            message="¿Realmente desea eliminar estos contactos seleccionados?")
</template>

<script>
    import db from '@/db.json'
    import manageContact from './components/ManageContact.vue'

    export default {
        name: 'Contacts',

        metaInfo() {
            return {
                title: this.$t('Contactos'),
                meta: [
                    { name: 'description', content: this.$t('Contactos SalesMan CRM') }
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
            openContactDetail(uuid) {
                this.$router.push({
                    name: 'ContactDetail', 
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
            manageContact
        }
    };
</script>