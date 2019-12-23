<template lang="pug">
    .global-content
        toolbar
            v-btn(icon @click="$store.commit('openFilter')")
                v-icon {{ $store.state.filter ? '$vuetify.icons.chevron-right' : '$vuetify.icons.search' }}

        filter-component
            v-date-picker.date-filter(v-model="start" :events="activities.map(a => a.date)" event-color="success" color="success" :locale="$store.state.lang" no-title full-width scrollable)
            v-divider.my-3
            v-checkbox.ma-0.mb-1(v-for="(i, k) in phasesActivity" :key="k" :label="i.name" :value="i.value" v-model="filter.phases" color="success" hide-details)
            v-divider.my-3
        
        v-content
            v-container(fluid grid-list-lg)
                .v-sheet-calendar
                    .v-sheet-calendar-title
                        .v-sheet-calendar-title-content
                            h1 {{$t('Actividades')}} 
                            h2 {{ start | formatDate('MMMM • YYYY') | capitalize }}
                            v-spacer
                            v-autocomplete(
                                v-model="type"
                                :items="typeOptions"
                                :label="$t('Tipo')"
                                dark
                                flat
                                solo
                                background-color="tertiary"
                                color="success"
                                hide-details
                                append-icon="$vuetify.icons.chevron-down")
                        .v-sheet-calendar-title-action
                            .v-btns
                                v-btn(round outline dark @click="todayAction()") {{ $t('Hoy') }}
                                v-btn(icon dark @click="$refs.calendar.prev()")
                                    v-icon $vuetify.icons.chevron-left
                                v-btn(icon dark @click="$refs.calendar.next()")
                                    v-icon $vuetify.icons.chevron-right

                    .v-sheet-calendar-content
                        v-calendar(
                            ref="calendar"
                            v-model="start"
                            :type="type"
                            :end="end"
                            color="primary"
                            :locale="$store.state.lang")
                            template(v-slot:day="{ date }")
                                template(v-for="event in eventsMap[date]")
                                    v-menu(:key="event.title" v-model="event.open")
                                        template(v-slot:activator="{ on }")
                                            div(v-ripple class="my-event" v-on="on" v-html="event.title")
                                        .v-sheet.v-sheet-row.mxw-400
                                            .v-sheet-content.ma-0.pa-2.pt-3
                                                .set.flex-full
                                                    h2.mb-2.subheading {{ event.title }}
                                                    .d-icon
                                                        v-icon.mr-2(small) $vuetify.icons.date
                                                        h3 {{ event.date | formatDate('MMM DD, YYYY') | capitalize }} 
                                                            template(v-if="event.time") - {{ event.time }}
                                                .set.flex-full(v-show="event.details")
                                                    label {{ $t('Detalle') }}
                                                    h4 {{ event.details }}
                                                .set.flex-full(v-show="event.opportunity")
                                                    label {{ $t('Oportunidad') }}
                                                    h4 
                                                        | OID-{{ event.opportunity && opportunities.filter(item => item.uuid == event.opportunity)[0].oid | placeholder('---') }}
                                                        | {{ event.opportunity && opportunities.filter(item => item.uuid == event.opportunity)[0].name | placeholder('---') }}
                                                .set.flex-full(v-show="event.user_manager")
                                                    label {{ $t('Encargado') }}
                                                    h4 {{ event.user_manager && users.filter(item => item.uuid == event.user_manager)[0].name | placeholder('---') }}
                                                .set.flex-full
                                                    .v-chips
                                                        v-chip(small label) {{ phasesActivity.filter(item => item.value == event.phase)[0].name }}
                                                .set.flex-full
                                                    .v-btns.justify-end
                                                        v-btn(small round flat @click="$refs.deleteActivity.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.delete
                                                            | {{ $t('Eliminar') }}
                                                        v-btn(small round flat @click="$refs.manageActivity.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.edit
                                                            | {{ $t('Editar') }}
                            template(v-slot:dayHeader="{ date }")
                                template(v-for="event in eventsMap[date]")
                                    v-menu(:key="event.title" v-model="event.open")
                                        template(v-slot:activator="{ on }")
                                            div(v-if="event.allDay" :key="event.title" class="my-event" v-on="on" v-html="event.title")
                                        .v-sheet.v-sheet-row(:class="type == 'day' || type == '4day' ? '' : 'mxw-400'")
                                            .v-sheet-content.ma-0.pa-2.pt-3
                                                .set.flex-full
                                                    h2.mb-2.subheading {{ event.title }}
                                                    .d-icon
                                                        v-icon.mr-2(small) $vuetify.icons.date
                                                        h3 {{ event.date | formatDate('MMM DD, YYYY') | capitalize }} 
                                                            template(v-if="event.time") - {{ event.time }}
                                                .set.flex-full(v-show="event.details")
                                                    label {{ $t('Detalle') }}
                                                    h4 {{ event.details }}
                                                .set.flex-full(v-show="event.opportunity")
                                                    label {{ $t('Oportunidad') }}
                                                    h4 
                                                        | OID-{{ event.opportunity && opportunities.filter(item => item.uuid == event.opportunity)[0].oid | placeholder('---') }}
                                                        | {{ event.opportunity && opportunities.filter(item => item.uuid == event.opportunity)[0].name | placeholder('---') }}
                                                .set.flex-full(v-show="event.user_manager")
                                                    label {{ $t('Encargado') }}
                                                    h4 {{ event.user_manager && users.filter(item => item.uuid == event.user_manager)[0].name | placeholder('---') }}
                                                .set.flex-full
                                                    .v-chips
                                                        v-chip(small label) {{ phasesActivity.filter(item => item.value == event.phase)[0].name }}
                                                .set.flex-full
                                                    .v-btns.justify-end
                                                        v-btn(small round flat @click="$refs.deleteActivity.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.delete
                                                            | {{ $t('Eliminar') }}
                                                        v-btn(small round flat @click="$refs.manageActivity.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.edit
                                                            | {{ $t('Editar') }}
                            template(v-slot:dayBody="{ date, timeToY, minutesToPixels }")
                                template(v-for="event in eventsMap[date]")
                                    v-menu(:key="event.title" v-model="event.open")
                                        template(v-slot:activator="{ on }")
                                            div(v-if="!event.allDay" :key="event.title" :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }" class="my-event with-time" v-on="on" v-html="event.title")
                                        .v-sheet.v-sheet-row(:class="type == 'day' || type == '4day' ? '' : 'mxw-400'")
                                            .v-sheet-content.ma-0.pa-2.pt-3
                                                .set.flex-full
                                                    h2.mb-2.subheading {{ event.title }}
                                                    .d-icon
                                                        v-icon.mr-2(small) $vuetify.icons.date
                                                        h3 {{ event.date | formatDate('MMM DD, YYYY') | capitalize }} 
                                                            template(v-if="event.time") - {{ event.time }}
                                                .set.flex-full(v-show="event.details")
                                                    label {{ $t('Detalle') }}
                                                    h4 {{ event.details }}
                                                .set.flex-full(v-show="event.opportunity")
                                                    label {{ $t('Oportunidad') }}
                                                    h4 
                                                        | OID-{{ event.opportunity && opportunities.filter(item => item.uuid == event.opportunity)[0].oid | placeholder('---') }}
                                                        | {{ event.opportunity && opportunities.filter(item => item.uuid == event.opportunity)[0].name | placeholder('---') }}
                                                .set.flex-full(v-show="event.user_manager")
                                                    label {{ $t('Encargado') }}
                                                    h4 {{ event.user_manager && users.filter(item => item.uuid == event.user_manager)[0].name | placeholder('---') }}
                                                .set.flex-full
                                                    .v-chips
                                                        v-chip(small label) {{ phasesActivity.filter(item => item.value == event.phase)[0].name }}
                                                .set.flex-full
                                                    .v-btns.justify-end
                                                        v-btn(small round flat @click="$refs.deleteActivity.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.delete
                                                            | {{ $t('Eliminar') }}
                                                        v-btn(small round flat @click="$refs.manageActivity.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.edit
                                                            | {{ $t('Editar') }}

        //- footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

        btns-floating(right bottom :filter="$store.state.filter")
            v-tooltip(top)
                v-btn(icon large color="success" slot="activator" @click="$refs.manageActivity.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar cliente')}}

        manage-activity(ref="manageActivity")

        confirm(
            ref="deleteActivity"
            @action=""
            title="Eliminar actividad"
            message="¿Realmente desea eliminar esta actividad?")
</template>

<script>
    import db from '@/db.json'
    import manageActivity from './components/ManageActivity.vue'

    export default {
        name: 'Activities',

        metaInfo() {
            return {
                title: this.$t('Actividades'),
                meta: [
                    { name: 'description', content: this.$t('Actividades SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                clients: db.clients,
                contacts: db.contacts,
                opportunities: db.opportunities,
                users: db.users,
                activities: db.activities,
                phasesActivity: db.phasesActivity,

                // Filtros
                filter: {
                    phases: [1, 2]
                },

                // Calendario
                type: 'month',
                today: new Date().toISOString().substr(0, 10),
                start: new Date().toISOString().substr(0, 10),
                end: '2019-12-31',
                typeOptions: [
                    { text: this.$t('Día'), value: 'day' },
                    { text: this.$t('4 Días'), value: '4day' },
                    { text: this.$t('Semana'), value: 'week' },
                    { text: this.$t('Mes'), value: 'month' },
                    // { text: this.$t('Diario'), value: 'custom-daily' },
                    // { text: this.$t('Semanal'), value: 'custom-weekly' }
                ],


                // Touch direction
                swipeDirection: 'None',
            }
        },

        computed: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {}
                this.activities.forEach(e => (map[e.date] = map[e.date] || []).push(e))
                return map
            }
        },

        mounted () {
            this.$refs.calendar.scrollToTime('08:00')
        },

        methods: {
            openClientDetail(uuid) {
                this.$router.push({
                    name: 'ClientDetail', 
                    params: { uuid: uuid }
                })
            },

            // Abrir opciones del Sheet
            swipe(direction, key) {
                this.swipeDirection = direction + key
            },

            open(event) {
                // alert(event.title)
            },

            todayAction() {
                this.start = new Date().toISOString().substr(0, 10)
            }
        },

        components: {
            manageActivity
        }
    };
</script>