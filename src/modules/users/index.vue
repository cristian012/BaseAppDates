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
            v-select(
                v-model="filter.permissions"
                :items="modules"
                :label="$t('Permisos')"
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
                        v-icon(small @click="remove(filter.permissions, data.item)") $vuetify.icons.close
            v-divider.my-3
            v-radio-group.ma-0.mb-3(v-model="filter.order" hide-details)
                v-radio(v-for="(item, n) in orderBy" :key="n" :label="$t(item.text)" :value="item.value" color="success")
        
        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Usuarios')}}

                v-layout(row wrap v-if="users.length")
                    v-flex.d-flex.pos-r.overflow-hidden(v-for="(user, i) in users" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'")
                        .v-sheet-back-options
                            .v-btns.justify-center
                                v-btn(dark icon depressed color="success" @click="$refs.manageUser.open()")
                                    v-icon(small) $vuetify.icons.edit
                                v-btn(dark icon depressed color="error" @click="$refs.deleteUser.open()")
                                    v-icon(small) $vuetify.icons.delete

                        .v-sheet(v-touch="{ left: () => swipe('Left', i), right: () => swipe('Right', i) }" :class="[swipeDirection == 'Right'+i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
                            svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                g#Capa_2(data-name='Capa 2')
                                    g#Capa_1-2(data-name='Capa 1')
                                        path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                                
                            .v-sheet-options
                                v-menu(left)
                                    v-btn(slot="activator" icon flat)
                                        v-icon $vuetify.icons.dots-vertical
                                    v-list.v-sheet-options-items
                                        v-list-tile(@click="$refs.manageUser.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.edit
                                            v-list-tile-title {{$t('Editar')}}
                                        v-list-tile(@click="$refs.deleteUser.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.delete
                                            v-list-tile-title {{$t('Eliminar')}}

                            .v-sheet-content
                                .v-sheet-status(:class="user.status ? 'success' : 'error'")
                                .set
                                    label {{$t('Nombre')}}
                                    h2.pr-4 {{ user.name }}
                                .set.mb-3
                                    label {{$t('Correo electrónico')}}
                                    h4.pr-4 {{ user.email | placeholder('---') }}
                                .set
                                    label {{$t('Teléfono')}}
                                    .v-sheet-icon
                                        v-icon(size="16") $vuetify.icons.phone
                                        h4 {{ user.phone | placeholder('---') }}
                                .v-sheet-select.mt-auto(v-show="$store.state.checkList")
                                    v-checkbox(v-model="massiveSelection" color="success" :value="user.uuid" hide-details)
                    
                    v-flex.flex-full
                        infinite-loading

                not-found(v-else message="No se encontraron usuarios registrados")
                    v-btn(round depressed color="success" @click="$refs.manageUser.open()") {{$t('Agregar usuario')}}

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        count-results(:current-counter="users.length" :total-counter="users.length" :filter="$store.state.filter")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

        btns-floating(right bottom :filter="$store.state.filter")
            v-tooltip(top)
                v-btn(icon large color="success" slot="activator" @click="$refs.manageUser.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar usuario')}}

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

        manage-user(ref="manageUser")

        confirm(
            ref="deleteUser"
            @action=""
            title="Eliminar usuario"
            message="¿Realmente desea eliminar este usuario?")

        confirm(
            ref="deleteMassiveSelection"
            @action=""
            title="Eliminar usuarios seleccionados"
            message="¿Realmente desea eliminar estos usuarios seleccionados?")
</template>

<script>
    import db from '@/db.json'
    import manageUser from './components/ManageUser.vue'

    export default {
        name: 'Users',

        metaInfo() {
            return {
                title: this.$t('Usuarios'),
                meta: [
                    { name: 'description', content: this.$t('Usuarios SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                users: db.users,
                status: db.status,
                modules: db.modules,
                orderBy: db.orderBy,

                // Filtros
                filter: {
                    status: [0, 1],
                    permissions: [],
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

            // Remover chips
            remove(list, item) {
                const index = list.indexOf(item.uuid)
                if (index >= 0) list.splice(index, 1)
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
            manageUser
        }
    };
</script>