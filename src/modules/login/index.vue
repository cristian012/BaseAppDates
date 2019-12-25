<template lang="pug">
    #pgrs_bg_login
        
        //- Compoent nav aplication
        toolbar()
            template(slot='login')
                div.pgrs_btn_login
                    v-btn(color='accent' round @click='toggleLogin = !toggleLogin') Iniciar Sesión

                    div.pgrs_float_login.pgrs_px_0(v-show='toggleLogin')
                        v-form(ref='formLogin')
                            v-container
                                v-text-field(dark v-model="email" :label="$t('Correo Electrónico')" :placeholder="$t('Dirección email')" color="secondary" :rules="[rules.required, rules.email]" required)
                                v-text-field(
                                    dark
                                    v-model="password"
                                    :append-icon="showPass ? '$vuetify.icons.hide' : '$vuetify.icons.show'"
                                    :rules="[rules.required, rules.min]"
                                    :type="showPass ? 'text' : 'password'"
                                    :label="$t('Contraseña')"
                                    :placeholder="$t('password')"
                                    :hint="$t('Al menos 8 carácteres')"
                                    browser-autocomplete="new-password"
                                    color="secondary"
                                    hide-details
                                    @click:append="showPass = !showPass")
                                v-btn(small flat dark block)
                                    v-icon(size='11px') $vuetify.icons.lock 
                                    | &nbsp; Olvide mi contraseña
                                v-btn.mt-2.mb-3.px-4(round depressed block color="secondary" @click="login" :loading="loaderSubmit") {{$t('Ingresar')}}
                                div.white--text.pgrs_center ¿ya tienes una cuenta? 
                                    a.secondary--text.pgrs_semibold Crear Una 
                                //- .v-btns.justify-center
                                //-     v-btn.px-4(round outline small depressed color="primary" @click="$refs.recoverPassword.open()") {{$t('Recuperar contraseña')}}
                                //-     //v-btn.px-4(round flat small depressed color="primary" to="/register") {{$t('Registrarse')}}

        v-content
            v-container(fluid fill-height)
                v-layout(row wrap fill-height)
                    v-flex(lg2)
                    v-flex(lg8)
                        v-layout(column, align-center, justify-center fill-height)
                            div.pgrs_relative.pgrs_full_width
                                #pgrs_circle_base
                                v-flex.white--text.pgrs_center.mb-4
                                    picture
                                        img(src='@/assets/img/logo_bookser.svg')
                                v-flex.white--text.pgrs_center.pgrs_p14 La forma inteligente de reservar citas
                                v-flex.secondary--text.pgrs_center.pgrs_semibold.pgrs_p14 + 100 Servicios disponibles
                            
                            div.pgrs_full_width.pt-4
                                v-layout.pgrs_finder_bar(row)
                                    v-flex.pgrs_input_cont
                                        v-layout(row, wrap)
                                            v-flex(lg7)
                                                v-text-field.pgrs_input_s(solo, label='Busca',placeholder='Filtra aquí lo que buscas...', hide-details)
                                            v-flex(lg3)
                                                v-select.pgrs_input_filter(solo, dense, v-model='city' :items='cities' label='Ciudad', placeholder='Ciudad', hide-details)
                                            v-flex(lg2)
                                                v-btn.pgrs_btn_s.pgrs_m_0(depressed, color='secondary')
                                                    v-icon $vuetify.icons.search &nbsp;
                                                    b Buscar

                            div.pgrs_full_width.pt-5
                                v-layout(row, justify-center).white--text
                                    div
                                        a.white--text.pgrs_p10.px-4 Políticas
                                    div
                                        a.white--text.pgrs_p10.px-4 Bookser - 2019
                                    div
                                        a.white--text.pgrs_p10.px-4 Términos
                            
                    v-flex(lg2)

        #pgrs_frame1
        #pgrs_frame2
        #pgrs_frame3
        #pgrs_base_f
        #pgrs_core_omp
        
        recover-password(ref="recoverPassword")
</template>

<script>
    import RecoverPassword from './components/RecoverPassword.vue'
    import app from '../../mixins/app'
    import Toolbar from '../../components/Toolbar'

    export default {
        mixins : [app],
        name: 'Login',
        metaInfo() {
            return {
                title: this.$t('Iniciar sesión'),
                meta: [
                    { name: 'description', content: this.$t('Iniciar sesión Bookser') }
                ]
            }
        },

        data() {
            return {
                // Formulario
                valid: true,
                email: '',
                password: '',
                city: '',
                toggleLogin: false,

                // Mostrar contraseña
                showPass: false,

                // Validación
                rules: {
                    required: value => !!value || this.$t('Este campo es requerido'),
                    min: v => v.length >= 8 || this.$t('Min. 8 caracteres'),
                    email: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('Este correo electrónico debe ser válido')
                },
            }
        },

        methods:{
            // Formulario
            // async login(){
            //     if (this.$refs.form.validate()) {
            //         this.loaderSubmit = true	
                    
            //         let params = { 
            //             url:"/login",
            //             form:{ 
            //                 email    : this.email, 
            //                 password : this.password
            //             }
            //         }
            //         let data =  await this.sendPost(params)  
            //         if(data.response){
            //             this.$setItem('profile_log', data.profile).then((r)=>{
            //                 this.$setItem('salesman', data.data, () => this.$router.push({ path: 'dashboard' }))
            //             }) 
            //         }
            //         else{
            //             this.manageAlert(false,data.message)
            //         }
            //         this.loaderSubmit = false
            //     } 
            //     else{
            //         this.manageAlert(false,"Faltan campos por completar.")
            //     }            
            // },
            async login(){
                if (this.$refs.form.validate()) {
                    
                    this.loaderSubmit = true	
                    
                    setTimeout(() => {
                        this.$router.push({ path: 'dashboard' })
                        this.manageAlert(true,"Bienvenido.")
                    }, 1000);  

                } 
                else{
                    this.manageAlert(false,"Faltan campos por completar.")
                }            
            },
            reset() {
                this.$refs.form.reset()
            },
        },

        components: {
            RecoverPassword, Toolbar
        }
    };
</script>