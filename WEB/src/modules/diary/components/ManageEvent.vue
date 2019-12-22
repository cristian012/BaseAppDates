<template lang="pug">
    v-dialog(v-model="manageEvent" max-width="800" persistent)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal
                .v-modal-title
                    v-btn.v-btn-close(icon flat color="primary" @click="manageEvent = false")
                        v-icon $vuetify.icons.close
                    h2 {{$t('Evento')}}

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
                            v-flex(xs12)
                                v-text-field(v-model="place" :label="$t('Lugar')" color="success" :rules="$store.state.rules" required)
                            v-flex(xs12)
                                v-combobox(
                                    v-model="guests"
                                    :filter="filter"
                                    :hide-no-data="!search"
                                    :items="items"
                                    :search-input.sync="search"
                                    hide-selected
                                    :label="$t('Correos electrónicos de invitados')"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    multiple
                                    small-chips
                                    :rules="[guests.length || this.$t('Agrega uno o más invitados')]" 
                                    required)
                                    template(v-slot:no-data)
                                        v-list-tile
                                            span.subheading Create
                                            v-chip(small) {{ search }}
                                    template(v-slot:selection="{ item, parent, selected }")
                                        v-chip(v-if="item === Object(item)" :selected="selected" small label outline)
                                            span.pr-2 {{ item.text }}
                                            v-icon(small @click="parent.selectItem(item)") $vuetify.icons.close
                                    template(v-slot:item="{ index, item }")
                                        v-list-tile-content
                                            v-text-field(
                                                v-if="editing === item"
                                                v-model="editing.text"
                                                autofocus
                                                flat
                                                background-color="transparent"
                                                hide-details
                                                solo
                                                @keyup.enter="edit(index, item)")
                                            v-list-tile-title {{ item.text }}
                                        v-spacer
                                        v-list-tile-action(@click.stop)
                                            v-btn(
                                                icon
                                                @click.stop.prevent="edit(index, item)")
                                                v-icon {{ editing !== item ? $vuetify.icons.edit : $vuetify.icons.check }} 

                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="manageEvent = false")
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
                place: '',
                guests: [],

                // Agregar invitados 
                activator: null,
                attach: null,
                editing: null,
                index: -1,
                items: [
                    { header: this.$t('Selecciona un correo o agrega uno') },
                    {
                        text: 'usuario@email.com',
                    },
                    {
                        text: 'persona@email.com',
                    }
                ],
                nonce: 1,
                menu: false,
                x: 0,
                search: null,
                y: 0,

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
                manageEvent: false
            }
        },

        watch: {
            datetime: function() {
                this.eventDate()
                this.eventime()
            },

            guests (val, prev) {
                if (val.length === prev.length) return

                this.guests = val.map(v => {
                if (typeof v === 'string') {
                    v = {
                        text: v
                    }

                    this.items.push(v)

                    this.nonce++
                }

                return v
                })
            }
        },

        methods:{
            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.manageEvent = false
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
                this.manageEvent = true
            },

            edit (index, item) {
                if (!this.editing) {
                    this.editing = item
                    this.index = index
                } else {
                    this.editing = null
                    this.index = -1
                }
            },
            filter (item, queryText, itemText) {
                if (item.header) return false

                const hasValue = val => val != null ? val : ''

                const text = hasValue(itemText)
                const query = hasValue(queryText)

                return text.toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
            }
        }
    };
</script>