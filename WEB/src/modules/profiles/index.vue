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

        filter-component(@clear="clearFilter", :filter-model.sync="filter")
            v-checkbox.ma-0.mb-1(v-for="(i, k) in status" :key="k" :label="$t(i.name)" :value="i.value" v-model="filter.status" color="success" hide-details)
            v-divider.my-3
            v-radio-group.ma-0.mb-3(v-model="filter.order" hide-details)
                v-radio(v-for="(item, n) in itemsOrder" :key="n" :label="$t(item.text)" :value="item.value" color="success")
        
        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Perfiles')}}
                v-progress-circular.mr-3(indeterminate width="2" v-if="loadPage")
                v-layout(row wrap v-else-if="objects.length")
                    v-flex.d-flex.pos-r.overflow-hidden(v-for="(client, i) in objects" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'")
                        .v-sheet-back-options
                            .v-btns.justify-center
                                //- v-btn(dark icon depressed color="success" @click="$refs.detailClient.open(client)")
                                v-btn(dark icon depressed color="success" @click="openDetail(client.uuid)")
                                    v-icon(small) $vuetify.icons.detail
                                v-btn(dark icon depressed color="success" @click="$refs.manageItem.open()")
                                    v-icon(small) $vuetify.icons.edit
                                v-btn(dark icon depressed color="error" @click="$refs.deleteClient.open()")
                                    v-icon(small) $vuetify.icons.delete

                        .v-sheet(v-touch="{ left: () => swipe('Left', i), right: () => swipe('Right', i) }" :class="[swipeDirection == 'Right'+i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
                            svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                g#Capa_2(data-name='Capa 2')
                                    g#Capa_1-2(data-name='Capa 1')
                                        path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                            
                            a.full-link(@click="openDetail(client.uuid)")
                                
                            .v-sheet-options
                                v-menu(left)
                                    v-btn(slot="activator" icon flat)
                                        v-icon $vuetify.icons.dots-vertical
                                    v-list.v-sheet-options-items
                                        v-list-tile(@click="openDetail(client.uuid)")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.detail
                                            v-list-tile-title {{$t('Detalle')}}
                                        v-list-tile(@click="$refs.manageItem.open(client)")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.edit
                                            v-list-tile-title {{$t('Editar')}}
                                        v-list-tile(@click='deleteElement(client.uuid,"/profile/delete",fetch)')
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.delete
                                            v-list-tile-title {{$t('Eliminar')}}

                            .v-sheet-content
                                .v-sheet-status(:class="client.status ? 'success' : 'error'")
                                .set
                                    label {{$t('Nombre')}}
                                    h2.pr-4 {{ client.name_profile }}
                                .set.mb-3
                                    label {{$t('Descripción')}}
                                    h4.pr-4 {{ client.description | placeholder('---') }}

                                .v-sheet-select.mt-auto(v-show="$store.state.checkList")
                                    v-checkbox(v-model="massiveSelection" color="success" :value="client.uuid" hide-details)
                    
                    v-flex.flex-full
                        infinite-loading(v-if="objects.length != 0 && infiniteLoad && !loadPage" :infinite="infinite" ref="infinite")
                
                
                not-found(v-else message="No se encontraron datos registrados")
                    v-btn(round depressed color="success" @click="$refs.manageItem.open()") {{$t('Agregar')}}
                
                

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        count-results(:current-counter="objects.length" :total-counter="total" :filter="$store.state.filter")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

        btns-floating(right bottom :filter="$store.state.filter")
            v-tooltip(top)
                v-btn(icon large color="success" slot="activator" @click="$refs.manageItem.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar')}}

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

        manage-item(ref="manageItem", @update="fetch")

</template>

<script>
    import manageItem from './components/Manage.vue'
    import app from '../../mixins/app'

    export default {
        mixins : [app],
        name: 'Profiles',
        metaInfo() {
            return {
                title: this.$t('Perfiles'),
                meta: [
                    { name: 'description', content: this.$t('Perfiles SalesMan CRM') }
                ]
            }
        },
        data() {
            return {
                //Campos para la consulta del filtro
                fieldsQuery:{
                    name:"name_profile",
                    date:"datecreated",
                    query:[
                        "name_profile[~]",
                        "datecreated[~]"
                    ]
                }
            }
        },
        components: {
            manageItem
        },
        created(){
            this.fetch();
        },
        methods: {
            deleteMassiveSelection(){
            },
            openDetail(uuid) {
                this.$router.push({
                    name: 'ProfileDetail', 
                    params: { uuid: uuid }
                })
            },
            closeMassiveselection() {
                this.massiveSelection = []
                this.$store.state.checkList = false
            },
            async fetch(filter = {}, infinite = false, search = false,loader = false){
                if(infinite){
                    this.offset += this.limit
                }else{
                    this.preload = true
                    this.portfolios = []
                    this.offset = 0
                    this.infiniteLoad = true
                    this.$refs.infinite && this.$refs.infinite.reset()
                }
                
                let params = { 
                    url:"/profiles",
                    form : { 
                        filter : JSON.stringify(Object.assign(this.filterQuery,{
                        })),
                        order :JSON.stringify(this.order),
                        limit : this.limit,
                        offset: this.offset,
                    },
                    arrayLocal: "objects",
                }

                this.loadPage = loader
                let data =  await this.sendGet(params)
                if(!infinite) this.preload = false

                if(infinite){ 
                    if(data.response){
                        this[params.arrayLocal]  = this.addForgetKeys(this[params.arrayLocal].concat(data.data));
                        this.$refs.infinite && this.$refs.infinite.loaded()
                    }else{
                        this.$refs.infinite && this.$refs.infinite.complete()
                        this.infiniteLoad = false
                    }
                }else{ 
                    this[params.arrayLocal] = this.addForgetKeys(data.response ? data.data : [])
                    this.total = data.response ? data.total : 0
                }
                this.loadPage = false 
            },
        }
    };
</script>