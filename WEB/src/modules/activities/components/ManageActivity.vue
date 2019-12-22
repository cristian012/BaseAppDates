<template lang="pug">
    v-dialog(v-model="manageActivity" max-width="800" persistent)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal
                .v-modal-title
                    v-btn.v-btn-close(icon flat color="primary" @click="manageActivity = false")
                        v-icon $vuetify.icons.close
                    h2 {{$t('Actividad')}}
                        //- small {{ date | formatDate('MMMM DD, YYYY') | capitalize | placeholder('---') }} • {{ time | placeholder('---') }}

                v-container.v-modal-content(fluid grid-list-lg)
                    .flex-0
                        VueCtkDateTimePicker(
                            v-model="datetime" 
                            no-value-to-custom-elem 
                            no-keyboard 
                            no-header 
                            inline 
                            color="" 
                            error
                            :button-now-translation="$t('Ahora')"
                            format="YYYY-MM-DD H:mm" 
                            :dark="$store.state.darkTheme")
                            v-text-field(:value="datetime | formatDate('MMMM DD, YYYY • H:mm') | capitalize" :label="$t('Fecha')" readonly solo flat color="success" @change="eventime" :rules="$store.state.dateRules" required)
                        v-layout(row wrap)
                            v-flex(xs12)
                                v-text-field(v-model="title" :label="$t('Titulo')" color="success" :rules="$store.state.rules" required)
                            v-flex(xs12)
                                v-textarea(v-model="details" :label="$t('Descripción')" color="success" rows="3" auto-grow :rules="$store.state.rules" required)
                            v-flex(xs12 sm6)
                                v-autocomplete(
                                    v-model="opportunity"
                                    :items="opportunities"
                                    :label="$t('Oportunidad')"
                                    item-text="name"
                                    item-value="uuid"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    persistent-hint
                                    :rules="$store.state.rules" 
                                    required)
                            v-flex(xs12 sm6)
                                v-autocomplete(
                                    v-model="user_manager"
                                    :items="users"
                                    :label="$t('Usuario encargado')"
                                    item-text="name"
                                    item-value="uuid"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    persistent-hint
                                    :rules="$store.state.rules" 
                                    required)
                            v-flex(xs12 sm6)
                                v-select(
                                    v-model="phase"
                                    :items="phasesActivity"
                                    :label="$t('Estado')"
                                    item-text="name"
                                    item-value="uuid"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    persistent-hint
                                    :rules="$store.state.rules" 
                                    required)

                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="manageActivity = false")
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
                // Modelo para capturar date y time por separado
                datetime: '',

                // Formulario
                valid: true,
                title: '',
                details: '',
                date: '',
                time: '',
                opportunity: '',
                user_manager: '',
                phase: '',

                // Datepicker modal
                modalDate: false,

                // JSON
                opportunities: db.opportunities,
                phases: db.phases,
                users: db.users,
                phasesActivity: db.phasesActivity,

                // Touch direction
                swipeDirection: 'None',
                
                // Modal
                manageActivity: false,
            }
        },

        watch: {
            datetime: function() {
                this.eventDate()
                this.eventime()
            }
        },

        methods:{
            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.manageActivity = false
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
            
            // Capturar date
            eventDate(){
                this.date = this.datetime.substr(0, 10)
            },

            // Capturar time
            eventime(){
                this.time = this.datetime.substr(11)
            },

            // Abrir modal
            open(){
                this.manageActivity = true
            },
        }
    };
</script>