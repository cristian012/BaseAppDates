<template lang="pug">
    v-dialog(v-model="manageOpportunity" max-width="800" persistent)
        v-form(ref="form" v-model="valid" lazy-validation)
            .v-modal
                .v-modal-title
                    v-btn.v-btn-close(icon flat color="primary" @click="manageOpportunity = false")
                        v-icon $vuetify.icons.close
                    h2 {{$t('Oportunidad')}}

                v-container.v-modal-content(fluid grid-list-lg)
                    .flex-0
                        v-layout(row wrap)
                            v-flex(xs12)
                                v-text-field(v-model="name" :label="$t('Nombre')" color="success" :rules="$store.state.rules" required)
                            v-flex(xs12 sm6)
                                v-autocomplete(
                                    v-model="client"
                                    :items="clients"
                                    :label="$t('Cliente')"
                                    item-text="name"
                                    item-value="uuid"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    persistent-hint
                                    :rules="$store.state.rules" 
                                    required)
                            v-flex(xs12 sm6)
                                v-autocomplete(
                                    v-model="contact"
                                    :items="contacts"
                                    :label="$t('Contacto')"
                                    item-text="name"
                                    item-value="uuid"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    persistent-hint)
                            v-flex(xs12 sm6)
                                v-autocomplete(
                                    v-model="phase"
                                    :items="phases"
                                    :label="$t('Estado')"
                                    item-text="name"
                                    item-value="value"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    persistent-hint
                                    :rules="$store.state.rules" 
                                    required)
                                    template(slot='item', slot-scope='data')
                                        v-list-tile-title.d-flex.align-center
                                            .v-state-circle.mr-2.flex-0(:class="data.item.color")
                                            | {{ data.item.name }}
                            v-flex(xs12 sm6)
                                v-autocomplete(
                                    v-model="user"
                                    :items="users"
                                    :label="$t('Vendedor')"
                                    item-text="name"
                                    item-value="uuid"
                                    color="success"
                                    append-icon="$vuetify.icons.chevron-down"
                                    persistent-hint
                                    :rules="$store.state.rules" 
                                    required)
                            v-flex(xs12 sm6)
                                v-dialog(ref='dialogDateClosing' v-model='modalDateClosing' :return-value.sync='dateClosing' lazy full-width width='290px' content-class="v-dialog-center")
                                    v-text-field(slot='activator' :value="dateClosing | formatDate('MMMM DD, YYYY') | capitalize" :label="$t('Fecha de cierre estimada')" color="success" append-icon="$vuetify.icons.date" readonly :rules="$store.state.rules" required)
                                    v-date-picker(v-model='dateClosing' scrollable :locale="$store.state.lang" @input="$refs.dialogDateClosing.save(dateClosing)")
                        v-divider.mt-3.mb-4
                        h3 {{$t('Valor de la oportunidad')}}
                        v-layout(row wrap)
                            v-flex(xs12 sm6)
                                cleave(v-model="cost" :label="$t('Costo')" prefix="$" color="success" :rules="$store.state.rules" required)
                            v-flex(xs12 sm6)
                                cleave(v-model="price" :label="$t('Precio')" prefix="$" color="success" :rules="$store.state.rules" required)


                        ul.list-line.mt-3
                            li: h4.title.font-weight-regular.error--text {{$t('Costo')}}: {{ cost | currency($store.state.currency, 0) }}
                            li: h4.title.font-weight-regular {{$t('Precio')}}: {{ price | currency($store.state.currency, 0) }}
                            li: h4.headline.font-weight-bold(:class="(price - cost) < 0 ? 'error--text' : 'success--text'") {{$t('Margen')}}: {{ price - cost | currency($store.state.currency, 0) }} / {{ ((price - cost) * 100) / cost | currency('', 0) }}%

                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="manageOpportunity = false")
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
                client: '',
                contact: '',
                phase: '',
                user: '',
                dateClosing: '',
                cost: '',
                price: '',

                // Datepicker modal
                modalDateClosing: false,

                // JSON
                contacts: db.contacts,
                clients: db.clients,
                phases: db.phases,
                users: db.users,

                // Touch direction
                swipeDirection: 'None',
                
                // Modal
                manageOpportunity: false,
            }
        },
        methods:{
            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.manageOpportunity = false
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
                this.manageOpportunity = true
            },
        }
    };
</script>