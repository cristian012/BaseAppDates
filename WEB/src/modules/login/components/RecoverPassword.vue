<template lang="pug">
    v-dialog(v-model="recoverPassword" max-width="600" content-class="v-dialog-center" light)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal.light.dark--text
                .v-modal-title
                    h2 {{$t('Recuperar contraseña')}}

                v-container.v-modal-content(fluid grid-list-lg)
                    p {{$t('Escriba el correo con el que registro su cuenta')}}
                    v-text-field(v-model="email" :label="$t('Correo electrónico')" color="success" :rules="[rules.required, rules.email]" required)

                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="recoverPassword = false")
                            v-icon(small) $vuetify.icons.close
                        v-btn(round depressed color="primary" @click="save") {{$t('Enviar')}}
</template>

<script>
    export default {
        data() {
            return {
                // Formulario
                valid: true,
                email: '',

                // Validación
                rules: {
                    required: value => !!value || this.$t('Este campo es requerido'),
                    min: v => v.length >= 8 || this.$t('Min. 8 caracteres'),
                    email: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('Este correo electrónico debe ser válido')
                },

                // Modal
                recoverPassword: false,
            }
        },
        methods:{
            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.recoverPassword = false
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Datos enviados exitosamente')
                    this.$store.state.alertColor = 'success'
                } else {
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Faltan campos por completar')
                    this.$store.state.alertColor = 'error'
                }
            },
            reset() {
                this.$refs.form.reset()
            },

            // Abrir modal
            open(){
                this.recoverPassword = true
            },
        }
    };
</script>