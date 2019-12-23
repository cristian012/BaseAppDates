<template lang="pug">
    v-dialog(v-model="manageModal" max-width="600" persistent)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal
                .v-modal-title
                    v-btn.v-btn-close(icon flat color="primary" @click="clear(false)")
                        v-icon $vuetify.icons.close
                    h2 {{$t('Perfil')}}
                
                v-progress-circular.mr-3(indeterminate width="2", v-if="loadModal")
                v-container.v-modal-content(fluid grid-list-lg, v-else)
                    .flex-0
                        v-flex.fix-padding
                            v-layout.container-table(mt-2)
                                v-tabs.full-width(v-model='active', slider-color='primary')    
                                    v-tab(v-for='(item, index) in listFields', :key='index', ripple, active-class="default-class active-tab")
                                        | {{ item }}
                                    v-tab-item()
                                        v-layout(row, wrap)
                                            v-flex.field-cont(lg12, md12, sm12, xs12, v-if="(obj.uuid!==$root.superAdmon)&&(obj.uuid!==$root.profile.uuid_profile)")
                                                v-flex.field-cont.secundary-title-section estado
                                                v-switch(v-model='statusObj', label='Activo', color='primary', hide-details, height='22')
                                            v-flex(xs12)
                                                v-text-field(v-model="obj.name_profile" :label="$t('Nombre')" color="success" :rules="$store.state.rules" required)
                                            v-flex(xs12)
                                                v-textarea(v-model="obj.description" :label="$t('Descripción')" color="success" rows="3" auto-grow)
                                            v-flex(lg12, md12, sm12, xs12).field-cont
                                                small Los campos marcados con * son obligatorios.

                                    v-tab-item()
                                        v-layout(row, wrap, mt-3)
                                            v-flex()
                                                v-layout(v-if="typeof obj.uuid==='undefined'") * Guarde primero el perfil para asignar permisos
                                                template()                  
                                                    v-layout(row, align-center,v-for="item in modules" :key="item.name")
                                                        v-flex(ml-3)
                                                            v-layout(row)
                                                                v-flex(lg5, md5, sm5, xs12, mt-2)
                                                                    div.secundary-title-small Modulo
                                                                    div.p11.semibold(style="font-weight:bold") {{ item.name }}
                                                                v-flex(lg5, md5, sm5, xs12, mt-2, pr-4 style='text-align: right')
                                                                    v-checkbox(v-model='item.active', label='Acceso', value='1', color='#09004E', height="3")
                                                                v-flex(lg5, md5, sm5, xs12, mt-2, pr-4 style='text-align: right')
                                                                    v-checkbox(v-model='item.manage', label='Administrar', value='1', color='#09004E', height="3", :disabled="!item.active")

                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="clear(false)")
                            v-icon(small) $vuetify.icons.close
                        v-btn(round depressed color="primary" @click="save" :loading="loaderSubmit") {{$t('Guardar')}}
</template>

<script>
    import helper from '../../../mixins/helper'
    import Vue2Filters from 'vue2-filters'

    export default {
        mixins: [Vue2Filters.mixin,helper],
        data() {
            return {           
                //Data
                active: 0,      
                listFields: [
                    'Datos',
                    'Permisos'
                ],
                modules:[],
                permissions:[]
            }
        },
        methods:{
            async open(model){
                this.loadModal = true;
                setTimeout(() => {
                    this.loadModal = false;
                }, 500);
                if(typeof model !=="undefined"){
                    this.uuid = model.uuid             
                    await this.fetch()
                    this.statusObj = this.obj.status
                }
                this.manageModal = true
            },

            async fetch(){
                this.uuidPartner=null
                this.loadPage = true
                let params = { 
                    url:"/profiles",
                    form : { 
                        filter: JSON.stringify({
                            "uuid":this.uuid
                        }),
                        order : JSON.stringify({})
                    },
                    object: "obj",
                }
                await this.loadObject(params); 

                let itemsRender = {
                    url:"/modules"
                }
          
                let data = await this.sendGet(itemsRender);
                if(data.response){
                    this.modules = data.data;
                    let i=0;
                    this.modules.forEach(mod => {                    
                        this.obj.permissions.forEach(perm => {
                            if(mod.uuid===perm.canid){
                                this.modules[i]["active"] = "1";
                                if(perm.manage===1){
                                    this.modules[i]["manage"] = "1";
                                }
                            }
                        });
                        i++;
                    });
                }

                this.loadPage = false; 
            }, 

            async save(){
                if(this.$refs.form.validate())
                {
                    this.loaderSubmit = true;
                    let params = {
                        url:"/profiles/update/", 
                        form : Object.assign(this.obj,{
                            status: this.statusObj?1:0
                        })
                    }
                    let data = await this.sendPost(params)
                    if(data.response)
                    {
                        if(typeof this.obj.uuid==="undefined"){
                            this.$emit("update");
                            this.open(data)
                            this.loaderSubmit = false;  
                            return false;
                        }
                        let params = {
                            url:"permissions/add", 
                            form : Object.assign({
                                    uuid:this.obj.uuid,
                                    modules: JSON.stringify(
                                        this.modules
                                    )
                                })
                            }
                            let data1 = await this.sendPost(params)
                            if(data1.response)
                            {
                                this.reloadApp()
                                this.$emit("update");
                                this.clear(false)
                                this.manageAlert(true) 
                            }
                            else
                            {
                                this.manageAlert(false,data1.message)
                            }
                            this.loaderSubmit = false;                   
                    }
                    else
                    {
                        this.manageAlert(false,data.message)
                        this.loaderSubmit = false;   
                    }                             
                } 
                else {
                    this.manageAlert(false,"Faltan campos por completar")
                }  
            },
            clear(val){
                this.statusObj = true;
                this.obj={}
                this.uuid=null
                this.$refs.form.reset()
                this.manageModal = val
                //
                this.modules = []
                this.active = 0
            }  
        }
    };
</script>