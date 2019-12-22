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
            v-radio-group.ma-0.mb-3(v-model="filter.order" hide-details)
                v-radio(v-for="(item, n) in orderBy" :key="n" :label="$t(item.text)" :value="item.value" color="success")
        
        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Estados de oportunidad')}}

                v-layout(row wrap v-if="phases.length")
                    v-flex.d-flex.pos-r.overflow-hidden(v-for="(phase, i) in phases" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'")
                        .v-sheet-back-options
                            .v-btns.justify-center
                                v-btn(dark icon depressed color="success" @click="$refs.managePhase.open()")
                                    v-icon(small) $vuetify.icons.edit
                                v-btn(dark icon depressed color="error" @click="$refs.deletePhase.open()")
                                    v-icon(small) $vuetify.icons.delete

                        .v-sheet(v-touch="{ left: () => swipe('Left', i), right: () => swipe('Right', i) }" :class="[swipeDirection == 'Right'+i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '', phase.color]")
                            svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                g#Capa_2(data-name='Capa 2')
                                    g#Capa_1-2(data-name='Capa 1')
                                        path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z' :class="phase.color")
                                
                            .v-sheet-options
                                v-menu(left)
                                    v-btn(slot="activator" icon flat)
                                        v-icon.white--text $vuetify.icons.dots-vertical
                                    v-list.v-sheet-options-items(dark)
                                        v-list-tile(@click="$refs.managePhase.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.edit
                                            v-list-tile-title {{$t('Editar')}}
                                        v-list-tile(@click="$refs.deletePhase.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.delete
                                            v-list-tile-title {{$t('Eliminar')}}

                            .v-sheet-content.white--text
                                .set.mb-4
                                    label.white--text {{$t('Nombre')}}
                                    h2.pr-4 {{ phase.name }}
                                .v-sheet-select.mt-auto(v-show="$store.state.checkList")
                                    v-checkbox(v-model="massiveSelection" color="white" :value="phase.value" hide-details)
                    
                    v-flex.flex-full
                        infinite-loading

                not-found(v-else message="No se encontraron estados registrados")
                    v-btn(round depressed color="success" @click="$refs.managePhase.open()") {{$t('Agregar estado')}}

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        count-results(:current-counter="phases.length" :total-counter="phases.length" :filter="$store.state.filter")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

        btns-floating(right bottom :filter="$store.state.filter")
            v-tooltip(top)
                v-btn(icon large color="success" slot="activator" @click="$refs.managePhase.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar estado')}}

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

        manage-phase(ref="managePhase")

        confirm(
            ref="deletePhase"
            @action=""
            title="Eliminar estado"
            message="¿Realmente desea eliminar este estado?")

        confirm(
            ref="deleteMassiveSelection"
            @action=""
            title="Eliminar estados seleccionados"
            message="¿Realmente desea eliminar estos estados seleccionados?")
</template>

<script>
    import db from '@/db.json'
    import managePhase from './components/ManagePhase.vue'

    export default {
        name: 'OpportunityPhases',

        metaInfo() {
            return {
                title: this.$t('Estados de oportunidad'),
                meta: [
                    { name: 'description', content: this.$t('Estados de oportunidad SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                phases: db.phases,
                orderBy: db.orderBy,

                // Filtros
                filter: {
                    order: 0
                },

                // Selección masiva
                massiveSelection: [],

                // Touch direction
                swipeDirection: 'None',
            }
        },

        methods: {
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
            managePhase
        }
    };
</script>