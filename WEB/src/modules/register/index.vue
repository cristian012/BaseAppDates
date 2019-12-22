<template lang="pug">
    .global-content
        v-content
            v-container.register(light fluid grid-list-lg)
                .register__content
                    figure.register__logo.mb-4
                        //- Logo SalesMan
                        img(src="@/assets/img/logo-hor.svg" alt="Logo") 
                        //- Logo Memorial
                        //- img(src="@/assets/img/memorial/logo.svg" alt="Logo")
                    h1 {{$t('Registro')}}
                    v-form(ref="form" v-model="valid" lazy-validation)
                        v-layout(row wrap)
                            v-flex.flex-full.py-0
                                v-text-field(v-model="obj.name" :label="$t('Nombre')" light color="success" :rules="[rules.required]" required)
                            v-flex.flex-300.py-0
                                v-text-field(v-model="obj.email" :label="$t('Correo electrónico')" light color="success" :rules="[rules.required, rules.email]" required)
                            v-flex.flex-300.py-0
                                v-text-field(v-model="obj.phone" :label="$t('Teléfono')" light color="success" required)
                            v-flex.flex-300.py-0
                                v-text-field(
                                    v-model="password"
                                    :append-icon="showPass ? '$vuetify.icons.hide' : '$vuetify.icons.show'"
                                    :rules="[rules.required, rules.min]"
                                    :type="showPass ? 'text' : 'password'"
                                    :label="$t('Contraseña')"
                                    :hint="$t('Al menos 8 carácteres')"
                                    browser-autocomplete="new-password"
                                    light
                                    @click:append="showPass = !showPass")
                            v-flex.flex-300.py-0
                                v-text-field.mb-3(
                                    v-model="passwordConfirm"
                                    :append-icon="showPassConfirm ? '$vuetify.icons.hide' : '$vuetify.icons.show'"
                                    :rules="[rules.required, rules.min]"
                                    :type="showPassConfirm ? 'text' : 'password'"
                                    :label="$t('Confirmar contraseña')"
                                    :hint="$t('Al menos 8 carácteres')"
                                    light
                                    @click:append="showPassConfirm = !showPassConfirm")
                        p {{ $t('Al hacer click en Registrarse, aceptas los ') }}
                            a(href="/terms" target="_blank") {{ $t('políticas de privacidad, términos y condiciones') }} 
                            | {{ $t('de') }} {{ $store.state.title }}
                        v-btn.mb-3.px-5(round depressed color="primary" @click="register") {{$t('Registrarse')}}
                        .v-btns.justify-center
                            v-btn.px-4(round flat small depressed color="primary" to="/login") {{$t('Iniciar sesión')}}
                    v-divider.my-3
                    footer-component
                    
</template>

<script>
    import app from '../../mixins/app'
    export default {
        mixins : [app],
        name: 'Register',

        metaInfo() {
            return {
                title: this.$t('Registro'),
                meta: [
                    { name: 'description', content: this.$t('Registro SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // Formulario
                valid: true,    
                obj:{},
                password: '',
                passwordConfirm: '',
                // Mostrar contraseña
                showPass: false,
                showPassConfirm: false,

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
            async register() {
                if (this.$refs.form.validate()) {

                    let params = { 
                        url:"/register",
                        form: Object.assign(this.obj,{
                            password:this.password,
                            passwordConfirm:this.passwordConfirm
                        })
                    }
                    let data =  await this.sendPost(params)  
                    if(data.response){
                        this.$setItem('profile_log', data.profile).then((r)=>{
                            this.$setItem('pisa', data.data, () => this.$router.push({ path: 'dashboard' }))
                        }) 
                    }
                    else{
                        this.manageAlert(false,data.message)
                    }
                    
                } else {
                    this.manageAlert(false,"Faltan campos por completar.")
                }
            },
            reset() {
                this.$refs.form.reset()
            },
        }
    };
</script>