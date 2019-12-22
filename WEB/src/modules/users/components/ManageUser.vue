<template lang="pug">
    v-dialog(v-model="manageUser" max-width="600" persistent)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal
                .v-modal-title
                    v-btn.v-btn-close(icon flat color="primary" @click="manageUser = false")
                        v-icon $vuetify.icons.close
                    h2 {{$t('Usuario')}}

                v-container.v-modal-content(fluid grid-list-lg)
                    .flex-0
                        v-layout(row wrap)
                            v-flex(xs12)
                                v-text-field(v-model="name" :label="$t('Nombre completo')" color="success" :rules="$store.state.rules" required)
                            v-flex(xs12)
                                v-text-field(v-model="user_name" :label="$t('Nombre de usuario')" color="success" :rules="$store.state.rules" required)
                            v-flex(xs12 sm6)
                                v-text-field(v-model="email" :label="$t('Correo electrónico')" color="success" :rules="$store.state.emailRules" required)
                            v-flex(xs12 sm6)
                                v-text-field(v-model="phone" :label="$t('Teléfono')" color="success")
                            v-flex(xs12)
                                v-autocomplete(
                                    v-model="permissions"
                                    :items="modules"
                                    :label="$t('Permisos')"
                                    item-text="name"
                                    item-value="uuid"
                                    color="success"
                                    multiple
                                    append-icon="$vuetify.icons.chevron-down")
                                    template(slot='selection' slot-scope='data')
                                        v-chip(:selected='data.selected' small label outline)
                                            span.pr-2 {{ data.item.name }}
                                            v-icon(small @click="remove(permissions, data.item)") $vuetify.icons.close
                            v-flex.d-switch.align-center(xs12)
                                label {{$t('Estado')}}
                                v-switch(:label="status ? $t('Activo') : $t('Inactivo')" color="success" v-model="status" hide-details)

                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="manageUser = false")
                            v-icon(small) $vuetify.icons.close
                        v-btn(round depressed color="primary" @click="save") {{$t('Guardar')}}
</template>

<script>
    import db from '@/db.json'

    export default {
        data() {
            return {
                // Formulario
                valid: true,
                name: '',
                user_name: '',
                email: '',
                phone: '',
                permissions: [],
                status: true,

                // JSON
                modules: db.modules,

                // Touch direction
                swipeDirection: 'None',
                
                // Modal
                manageUser: false,
            }
        },
        methods:{
            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.manageUser = false
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

            // Remover chips
            remove(list, item) {
                const index = list.indexOf(item.uuid)
                if (index >= 0) list.splice(index, 1)
            },

            // Abrir modal
            open(){
                this.manageUser = true
            },
        }
    };
</script>