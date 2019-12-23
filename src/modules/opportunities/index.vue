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
            v-checkbox.ma-0.mb-1(v-for="(i, k) in phases" :key="k" :label="i.name" :value="i.value" v-model="filter.phases" color="success" hide-details)
            v-divider.my-3
            v-autocomplete(
                v-model="filter.clients"
                :items="clients"
                :label="$t('Cliente')"
                item-text="name"
                item-value="uuid"
                color="success"
                :placeholder="$t('Seleccionar')"
                multiple
                append-icon="$vuetify.icons.chevron-down")
                template(slot='selection' slot-scope='data')
                    v-chip.v-chip--select-multi(:selected='data.selected' small label outline)
                        span.pr-2 {{ data.item.name }}
                        v-icon(small @click="remove(filter.clients, data.item)") $vuetify.icons.close
            v-autocomplete(
                v-model="filter.contacts"
                :items="contacts"
                :label="$t('Contacto')"
                item-text="name"
                item-value="uuid"
                color="success"
                :placeholder="$t('Seleccionar')"
                multiple
                hide-details
                append-icon="$vuetify.icons.chevron-down")
                template(slot='selection' slot-scope='data')
                    v-chip.v-chip--select-multi(:selected='data.selected' small label outline)
                        span.pr-2 {{ data.item.name }}
                        v-icon(small @click="remove(filter.contacts, data.item)") $vuetify.icons.close
            v-divider.my-3
            v-dialog(ref='dialogDateStart' v-model='modalDateStart' :return-value.sync='filter.dateStart' lazy full-width width='290px' content-class="v-dialog-center")
                v-text-field(slot='activator' :value="filter.dateStart | formatDate('MMMM DD, YYYY') | capitalize" :label="$t('Fecha inicial')" append-icon="$vuetify.icons.date" readonly color="success")
                v-date-picker(v-model='filter.dateStart' scrollable :locale="$store.state.lang" @input="$refs.dialogDateStart.save(filter.dateStart)" color="success")
            v-dialog(ref='dialogDateEnd' v-model='modalDateEnd' :return-value.sync='filter.dateEnd' lazy full-width width='290px' content-class="v-dialog-center")
                v-text-field(slot='activator' :value="filter.dateEnd | formatDate('MMMM DD, YYYY') | capitalize" :label="$t('Fecha final')" append-icon="$vuetify.icons.date" readonly color="success" hide-details)
                v-date-picker(v-model='filter.dateEnd' scrollable :locale="$store.state.lang" @input="$refs.dialogDateEnd.save(filter.dateEnd)" color="success")
            v-divider.my-3
            v-radio-group.ma-0.mb-3(v-model="filter.order" hide-details)
                v-radio(v-for="(item, n) in orderBy" :key="n" :label="$t(item.text)" :value="item.value" color="success")
        
        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Oportunidades')}}

                v-layout#grid.grid(row wrap v-if="opportunities.length")
                    v-flex.grid__item.d-flex.pos-r(v-for="(opportunity, i) in opportunities" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'")
                        .v-sheet-drag
                            v-icon $vuetify.icons.drag
                            .v-sheet-drag-content
                        .overflow-hidden.d-flex
                            .v-sheet-back-options
                                .v-btns.justify-center
                                    v-btn(dark icon depressed color="success" @click="openOpportunityDetail(opportunity.uuid)")
                                        v-icon(small) $vuetify.icons.detail
                                    v-btn(dark icon depressed color="success" @click="$refs.duplicateOpportunity.open()")
                                        v-icon(small) $vuetify.icons.duplicate
                                    v-btn(dark icon depressed color="success" @click="$refs.manageOpportunity.open()")
                                        v-icon(small) $vuetify.icons.edit
                                    v-btn(dark icon depressed color="error" @click="$refs.deleteOpportunity.open()")
                                        v-icon(small) $vuetify.icons.delete
                                        
                            .v-sheet(v-touch="{ left: () => swipe('Left', i), right: () => swipe('Right', i) }" :class="[swipeDirection == 'Right'+i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
                                svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                    g#Capa_2(data-name='Capa 2')
                                        g#Capa_1-2(data-name='Capa 1')
                                            path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                                
                                a.full-link(@click="openOpportunityDetail(opportunity.uuid)")

                                .v-sheet-options
                                    v-menu(left)
                                        v-btn(slot="activator" icon flat)
                                            v-icon $vuetify.icons.dots-vertical
                                        v-list.v-sheet-options-items
                                            v-list-tile(@click="openOpportunityDetail(opportunity.uuid)")
                                                v-list-tile-action 
                                                    v-icon $vuetify.icons.detail
                                                v-list-tile-title {{$t('Detalle')}}
                                            v-list-tile(@click="$refs.duplicateOpportunity.open()")
                                                v-list-tile-action 
                                                    v-icon $vuetify.icons.duplicate
                                                v-list-tile-title {{$t('Duplicar')}}
                                            v-list-tile(@click="$refs.manageOpportunity.open()")
                                                v-list-tile-action 
                                                    v-icon $vuetify.icons.edit
                                                v-list-tile-title {{$t('Editar')}}
                                            v-list-tile(@click="$refs.deleteOpportunity.open()")
                                                v-list-tile-action 
                                                    v-icon $vuetify.icons.delete
                                                v-list-tile-title {{$t('Eliminar')}}

                                .v-sheet-content
                                    .set.mb-1
                                        label {{$t('Nombre')}}
                                        h2.pr-4 {{ opportunity.name }}
                                    .set.mb-3.flex-100
                                        label {{$t('OID')}}
                                        h4 OID-{{ opportunity.oid }}
                                    .set.mb-1
                                        label {{$t('Cliente')}}
                                        .v-sheet-icon
                                            v-icon(size="16") $vuetify.icons.client
                                            h4
                                                template(v-for="client in clients.filter(item => item.uuid == opportunity.client)" ) {{ client.name }}
                                                template(v-if="!opportunity.client") ---
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
                                    .v-sheet-select.mt-3(v-show="$store.state.checkList")
                                        v-checkbox.ma-0(v-model="massiveSelection" color="success" :value="opportunity.uuid" hide-details)
                                    .v-sheet-phase.mt-3(v-for="phase in phases.filter(phase => phase.value == opportunity.phase)" :class="phase.color")
                                        span {{ phase.name }}
                    
                    v-flex.flex-full
                        infinite-loading

                not-found(v-else message="No se encontraron oportunidades registradas")
                    v-btn(round depressed color="success" @click="$refs.manageOpportunity.open()") {{$t('Agregar oportunidad')}}
                    
                #drop-area.drop-area
                    div
                        .drop-area__item(v-for="phase in phases" :class="phase.color") 
                            h2 {{ phase.name }}
                .drop-overlay

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        count-results(:current-counter="opportunities.length" :total-counter="opportunities.length" :filter="$store.state.filter")

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
                v-btn(icon large color="success" slot="activator" @click="$refs.manageOpportunity.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar oportunidad')}}

        btns-floating.options-bottom(v-show="$store.state.checkList && massiveSelection.length")
            .v-btns.justify-center
                v-tooltip(top)
                    v-btn(icon large color="success" slot="activator"): v-icon $vuetify.icons.check-all
                    span {{ $t('Seleccionar todos') }}
                v-tooltip(top)
                    v-btn(icon large color="error" slot="activator" @click="$refs.deleteMassiveSelection.open()"): v-icon $vuetify.icons.delete
                    span {{ $t('Eliminar') }}
                v-tooltip(top)
                    v-btn(icon large color="info" slot="activator" @click="$refs.duplicateMassiveSelection.open()"): v-icon $vuetify.icons.duplicate
                    span {{ $t('Duplicar') }}
                v-tooltip(top)
                    v-btn(icon large color="info" slot="activator"): v-icon $vuetify.icons.cached
                    span {{ $t('Cambiar estado') }}
                v-tooltip(top)
                    v-btn(icon large outline slot="activator" @click="closeMassiveselection"): v-icon(small) $vuetify.icons.close
                    span {{ $t('Cancelar') }}

        manage-opportunity(ref="manageOpportunity")

        confirm(
            ref="deleteOpportunity"
            @action=""
            title="Eliminar oportunidad"
            message="¿Realmente desea eliminar esta oportunidad?")
        
        confirm(
            ref="duplicateOpportunity"
            @action=""
            title="Duplicar oportunidad"
            message="¿Realmente desea duplicar esta oportunidad?")

        confirm(
            ref="deleteMassiveSelection"
            @action=""
            title="Eliminar oportunidades seleccionadas"
            message="¿Realmente desea eliminar estas oportunidades seleccionadas?")

        confirm(
            ref="duplicateMassiveSelection"
            @action=""
            title="Duplicar oportunidades seleccionadas"
            message="¿Realmente desea duplicar estas oportunidades seleccionadas?")
</template>

<script>
    import db from '@/db.json'
    import manageOpportunity from './components/ManageOpportunity.vue'

    export default {
        name: 'Opportunities',

        metaInfo() {
            return {
                title: this.$t('Oportunidades'),
                meta: [
                    { name: 'description', content: this.$t('Oportunidades SalesMan CRM') }
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
                orderBy: db.orderBy,

                // Filtros
                filter: {
                    phases: [1,2,3],
                    clients: [],
                    contacts: [],
                    dateStart: '',
                    dateEnd: '',
                    order: 0
                },

                // Datepicker modal
                modalDateStart: false,
                modalDateEnd: false,

                // Selección masiva
                massiveSelection: [],

                // Touch direction
                swipeDirection: 'None',
            }
        },

        methods: {
            // Abrir detalle
            openOpportunityDetail(uuid) {
                this.$router.push({
                    name: 'OpportunityDetail', 
                    params: { uuid: uuid }
                })
            },

            // Remover chips
            remove(list, item) {
                const index = list.indexOf(item.uuid)
                if (index >= 0) list.splice(index, 1)
            },

            // Abrir notas en detalle
            openNotes(){
                this.$refs.notes.open()
            },

            // Cerrar seleccion masiva
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

        mounted() {
            (function() {
                var body = document.body,
                    dropArea = document.getElementById( 'drop-area' ),
                    droppableArr = [], dropAreaTimeout;

                // initialize droppables
                [].slice.call( document.querySelectorAll( '#drop-area .drop-area__item' )).forEach( function( el ) {
                    droppableArr.push( new Droppable( el, {
                        onDrop : function( instance, draggableEl ) {
                            // show checkmark inside the droppabe element
                            classie.add( instance.el, 'drop-feedback' );
                            clearTimeout( instance.checkmarkTimeout );
                            instance.checkmarkTimeout = setTimeout( function() { 
                                classie.remove( instance.el, 'drop-feedback' );
                            }, 800 );
                            // ...
                        }
                    } ) );
                } );

                // initialize draggable(s)
                [].slice.call(document.querySelectorAll( '#grid .v-sheet-drag' )).forEach( function( el ) {
                    new Draggable( el, droppableArr, {
                        scroll : true,
                        scrollable : '#drop-area',
                        scrollSpeed : 40,
                        scrollSensitivity : 50,
                        draggabilly : { containment: document.body },
                        onStart : function() {
                            // add class 'drag-active' to body
                            classie.add( body, 'drag-active' );
                            // clear timeout: dropAreaTimeout (toggle drop area)
                            clearTimeout( dropAreaTimeout );
                            // show dropArea
                            classie.add( dropArea, 'show' );
                        },
                        onEnd : function( wasDropped ) {
                            var afterDropFn = function() {
                                // hide dropArea
                                classie.remove( dropArea, 'show' );
                                // remove class 'drag-active' from body
                                classie.remove( body, 'drag-active' );
                            };

                            if( !wasDropped ) {
                                afterDropFn();
                            }
                            else {
                                // after some time hide drop area and remove class 'drag-active' from body
                                clearTimeout( dropAreaTimeout );
                                dropAreaTimeout = setTimeout( afterDropFn, 400 );
                            }
                        }
                    } );
                } );
            })();
        },

        components: {
            manageOpportunity
        }
    };
</script>