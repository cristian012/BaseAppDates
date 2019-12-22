import currentLang from '../scripts/lang'
import config from '../scripts/const'
import moment from 'moment'
import helper from './helper';

export default {
    mixins: [helper],
    computed: {
        
        /** Continuar a la URL */
        continueQuery(){
            let query = this.$route.query
            if (query.hasOwnProperty('continue')) {
                return query.continue
            } else {
                return false
            }
        }
    },

    // beforeCreate() {
        
    //     this.$root.preload = true

    //     //establecer idioma por defecto
    //     let lang = currentLang(this.$root.languages, this.$root.fallbackLanguage)
    //     //this.$root.setLanguage(lang)

    //     let routeMeta = this.$route.meta
    //     let routeName = this.$route.name
    //     let route = this.$route
        
    //     //excluir rutas especiales
    //     if (routeMeta.hasOwnProperty('exclude') && routeMeta.exclude) {
    //         this.$root.loader = false
    //         return
    //     }

    //     //validar sesión
    //     return this.$api(this, (xhr) => {
    //         return xhr.post('/profile').then((r) => {

    //             let data = r.data
    //             if (!data.response) {

    //                 //no requiere autenticación              
    //                 if (!routeMeta.auth){
    //                     this.$root.preload = false
    //                     return
    //                 } 
    //                 return this.$router.push({ name : "Login" }) 

    //             } else {
    //                 //datos del usuario
    //                 let profile = data.data 
    //                 this.authProfile(profile, routeMeta, routeName, route)
    //             }
    //         })
    //     })
    // },
    beforeCreate(){
        this.$root.preload = true;
        setTimeout(() => {
            this.$root.preload = false;
            this.loadPage = true;
            setTimeout(() => {
                this.loadPage = false
            }, 1000);
        }, 1000);
    },
    methods: {
        /**
         * Condicionales de autenticación
         * @param {object} profile - Perfil de usuario
         * @param {object} routeMeta - Información meta de la ruta
         * @param {string} routeName - Nombre de la ruta
         * @param {object} route - Información de la ruta
        */
        authProfile(profile, routeMeta, routeName, route) {

            //datos del usuario
            this.$root.profile = Object.assign(profile)

            //sin autenticación
            if (!routeMeta.auth){            
                if(!routeMeta.global) { //Pagina publica
                    return this.$router.push({path:'/'}) 
                }                             
            }
            
            //------Permisos por modulo-----------
            let can;
            if(routeMeta.subroute)
                can  = routeMeta.dependence.replace("/", "");
            else
                can = route.path.replace("/", "");

            if (!can) {
                this.$root.preload = false
                return
            } 

            if(!(can==="dashboard")){
              
                let modules = [];
                profile.can.forEach(element => {
                    if(typeof element.items === "undefined"){
                        modules.push(element)
                    }
                    else{
                        element.items.forEach(e => {
                            modules.push(e)
                        });
                    }
                });

                let hasCan = modules.find((i) => i.alias == can)

                if (!hasCan) {
                    return this.$router.push({ path: '/403' })
                }
                this.$root.activeModule = hasCan;
            } 

            this.$root.preload = false
        },

        /**
         * Inicio de sesión automatico
         */
        autoLogin(failed) {

            let query = this.$route.query
            if (query.hasOwnProperty('pauth')) {
                
                let token = query.pauth
                return this.$api(this).then((xhr) => {
                    return xhr.post('/regen', { t: token }).then((r) => {

                        let data      = r.data
                        let routeMeta = this.$route.meta
                        let routeName = this.$route.name
                        let route     = this.$route
                        
                        if (data.response) {
                            this.$setItem('crm-login', data.data.tokenAuth, () => {

                                //datos del usuario
                                let profile = data.data.profile
                                this.authProfile(profile, routeMeta, routeName, route)
                            }).catch(function(){})
                        } else {
                            failed()
                        }
                    })
                })
            } else {
                failed()
            }
        },

        notificationsGet(){
            //validamos las notificaciones
            return this.$api(this).then((xhr) => {
                return xhr.get('notifications/generate').then((r) => {
                    let data = r.data
                    
                    try{
                        //modal de oportunidades inactivas
                        if(data.inactives){
                            if(data.inactives.data){
                                if(data.inactives.data.length){

                                    var inactives = []
                                    data.inactives.data.map(function(not){
                                        
                                        if(not.readed == '0' && (moment(not.datecreated).format('YYYY MM DD') == moment().format('YYYY MM DD'))){
                                            inactives.push(not)
                                        }
                                    })
                                    if(inactives.length>0){
                                        this.$root.notificationInactivity = inactives
                                        $('#alert-0').modal({})
                                        $('#alert-0').modal('open')
                                    }
                                    this.$root.maxNotificationInactivity = data.inactives.max
                                }
                            }
                        }

                        //modal de oportunidades vecidas
                        if(data.lost){
                            if(data.lost.data){
                                if(data.lost.data.length){
                                    var lost = []
                                    data.lost.data.map(function(not){
                                        if(not.readed == '0' && (moment(not.datecreated).format('YYYY MM DD') == moment().format('YYYY MM DD'))){
                                            lost.push(not)
                                        }
                                    })
                                    if(lost.length>0){
                                        this.$root.notificationLost = lost
                                        $('#alert-1').modal({})
                                        $('#alert-1').modal('open')
                                    }
                                    this.$root.maxNotificationLost = data.lost.max
                                }
                            }
                        }

                        //modal de generación de leads
                        if(data.leads){
                            if(data.leads.data){
                                if(data.leads.data.length){

                                    var leads = []
                                    data.leads.data.map(function(not){
                                        if(not.readed == '0' && (moment(not.datecreated).format('YYYY MM DD') == moment().format('YYYY MM DD'))){
                                            leads.push(not)
                                        }
                                    })

                                    if(leads.length>0){
                                        this.$root.notificationLeads = leads
                                        $('#alert-3').modal({})
                                        $('#alert-3').modal('open')
                                    }
                                    this.$root.maxNotificationLeads = data.leads.max
                                }
                            }
                        }

                        //modal de generación de leads
                        if(data.clientsInactives){
                            if(data.clientsInactives.data){
                                if(data.clientsInactives.data.length){

                                    var clientsInactives = []
                                    data.clientsInactives.data.map(function(not){
                                        if(not.readed == '0' && (moment(not.datecreated).format('YYYY MM DD') == moment().format('YYYY MM DD'))){
                                            clientsInactives.push(not)
                                        }
                                    })

                                    if(clientsInactives.length>0){
                                        this.$root.notificationclientsInactives = clientsInactives
                                        $('#alert-2').modal({})
                                        $('#alert-2').modal('open')
                                    }

                                    this.$root.maxNotificationclientsInactives = data.clientsInactives.max
                                }
                            }
                        }

                        //cantidad de notificaciones
                        if(data.unread){
                            this.$root.notificationsQuantity = data.unread.data
                        }
                    }catch(e){
                        console.log(e)
                    }
                    
                })
            })
        },
    }
}