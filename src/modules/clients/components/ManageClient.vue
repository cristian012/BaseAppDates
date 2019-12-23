<template lang="pug">
    v-dialog(v-model="manageClient" max-width="600" persistent)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal
                .v-modal-title
                    v-btn.v-btn-close(icon flat color="primary" @click="manageClient = false")
                        v-icon $vuetify.icons.close
                    h2 {{$t('Cliente')}}

                v-container.v-modal-content(fluid grid-list-lg)
                    .flex-0
                        v-layout(row wrap)
                            v-flex(xs12)
                                v-text-field(v-model="name" :label="$t('Nombre')" color="success" :rules="$store.state.rules" required)
                            v-flex(xs12 sm6)
                                v-text-field(v-model="id" :label="$t('Identificación')" color="success")
                            v-flex(xs12 sm6)
                                v-text-field(v-model="email" :label="$t('Correo electrónico')" color="success")
                            v-flex(xs12 sm6)
                                v-text-field(v-model="phone" :label="$t('Teléfono')" color="success")
                            v-flex(xs12 sm6)
                                v-text-field(v-model="address" :label="$t('Dirección')" color="success")
                            v-flex.d-switch.align-center(xs12)
                                label {{$t('Estado')}}
                                v-switch(:label="status ? $t('Activo') : $t('Inactivo')" color="success" v-model="status" hide-details)

                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="manageClient = false")
                            v-icon(small) $vuetify.icons.close
                        v-btn(round depressed color="primary" @click="save") {{$t('Guardar')}}
</template>

<script>
    import db from '@/db.json'
    import Vue2Filters from 'vue2-filters'

    export default {
        mixins: [Vue2Filters.mixin],
        data() {
            return {
                // Formulario
                valid: true,
                name: '',
                id: '',
                email: '',
                phone: '',
                address: '',
                status: true,

                // JSON
                contacts: db.contacts,

                // Touch direction
                swipeDirection: 'None',
                
                // Modal
                manageClient: false,
            }
        },
        methods:{
            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.manageClient = false
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Datos guardados exitosamente')
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
                this.manageClient = true
            },
        }
    };
</script>