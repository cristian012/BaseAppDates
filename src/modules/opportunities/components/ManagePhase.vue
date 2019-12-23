<template lang="pug">
    v-dialog(v-model="managePhase" max-width="600" persistent)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal
                .v-modal-title
                    v-btn.v-btn-close(icon flat color="primary" @click="managePhase = false")
                        v-icon $vuetify.icons.close
                    h2 {{$t('Estado')}}

                v-container.v-modal-content(fluid grid-list-lg)
                    .flex-0
                        v-layout(row wrap)
                            v-flex(xs12)
                                v-text-field(v-model="name" :label="$t('Nombre')" color="success" :rules="rules" required)
                            v-flex(xs12)
                                h3 {{$t('Color')}}
                                slider-picker(v-model="color")
                        v-divider.transparent.my-2
                        v-sheet(:style="'background:' + color.hex" height="150")
                            .v-sheet-content.align-center.justify-center
                                h2.white--text {{$t('Estado de oportunidad')}}


                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="managePhase = false")
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
                color: {
                    "hsl": {
                        "h": 186.61764705882354,
                        "s": 0.5,
                        "l": 0.5,
                        "a": 1
                    },
                    "hex": "#40B1BF",
                    "hex8": "#40B1BFFF",
                    "rgba": {
                        "r": 64,
                        "g": 177,
                        "b": 191,
                        "a": 1
                    },
                    "hsv": {
                        "h": 186.61764705882354,
                        "s": 0.6666666666666666,
                        "v": 0.75,
                        "a": 1
                    },
                    "oldHue": 186.61764705882354,
                    "source": "hsl",
                    "a": 1
                },

                // Validación
                rules: [
                    v => !!v || this.$t('Este campo es requerido')
                ],

                // Touch direction
                swipeDirection: 'None',
                
                // Modal
                managePhase: false,
            }
        },
        methods:{
            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.managePhase = false
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
                this.managePhase = true
            },
        }
    };
</script>