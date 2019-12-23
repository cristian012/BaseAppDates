<template lang="pug">
    .global-content
        toolbar
            v-btn(icon @click="$store.commit('openFilter')")
                v-icon {{ $store.state.filter ? '$vuetify.icons.chevron-right' : '$vuetify.icons.search' }}

        filter-component
            v-date-picker.date-filter(v-model="start" :events="events.map(a => a.date)" event-color="success" color="success" :locale="$store.state.lang" no-title full-width scrollable)
            v-divider.my-3
        
        v-content
            v-container(fluid grid-list-lg)
                .v-sheet-calendar
                    .v-sheet-calendar-title
                        .v-sheet-calendar-title-content
                            h1 {{$t('Agenda')}} 
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
                                                .set.flex-full
                                                    label {{ $t('Detalle') }}
                                                    h4 {{ event.details | placeholder('---') }}
                                                .set.flex-full
                                                    label {{ $t('Lugar') }}
                                                    h4 {{ event.place | placeholder('---') }}
                                                .set.flex-full(v-if="event.guests && event.guests.length")
                                                    label {{ $t('Invitados') }}
                                                    .v-chips
                                                        v-chip(v-for="(invited, i) in event.guests" :key="i" small label) {{ invited.text }}
                                                .set.flex-full
                                                    .v-btns.justify-end.mt-2
                                                        v-btn(small round flat @click="$refs.cancelEvent.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.close
                                                            | {{ $t('Cancelar') }}
                                                        v-btn(small round flat @click="$refs.manageEvent.open()")
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
                                                .set.flex-full
                                                    label {{ $t('Detalle') }}
                                                    h4 {{ event.details | placeholder('---') }}
                                                .set.flex-full
                                                    label {{ $t('Lugar') }}
                                                    h4 {{ event.place | placeholder('---') }}
                                                .set.flex-full(v-if="event.guests && event.guests.length")
                                                    label {{ $t('Invitados') }}
                                                    .v-chips
                                                        v-chip(v-for="(invited, i) in event.guests" :key="i" small label) {{ invited.text }}
                                                .set.flex-full
                                                    .v-btns.justify-end
                                                        v-btn(small round flat @click="$refs.cancelEvent.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.close
                                                            | {{ $t('Cancelar') }}
                                                        v-btn(small round flat @click="$refs.manageEvent.open()")
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
                                                .set.flex-full
                                                    label {{ $t('Detalle') }}
                                                    h4 {{ event.details | placeholder('---') }}
                                                .set.flex-full
                                                    label {{ $t('Lugar') }}
                                                    h4 {{ event.place | placeholder('---') }}
                                                .set.flex-full(v-if="event.guests && event.guests.length")
                                                    label {{ $t('Invitados') }}
                                                    .v-chips
                                                        v-chip(v-for="(invited, i) in event.guests" :key="i" small label) {{ invited.text }}
                                                .set.flex-full
                                                    .v-btns.justify-end
                                                        v-btn(small round flat @click="$refs.cancelEvent.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.close
                                                            | {{ $t('Cancelar') }}
                                                        v-btn(small round flat @click="$refs.manageEvent.open()")
                                                            v-icon.mr-2(small) $vuetify.icons.edit
                                                            | {{ $t('Editar') }}

        //- footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

        btns-floating(right bottom :filter="$store.state.filter")
            v-tooltip(top)
                v-btn(icon large color="success" slot="activator" @click="$refs.manageEvent.open()")
                    v-icon $vuetify.icons.add
                span {{$t('Agregar cliente')}}

        manage-event(ref="manageEvent")

        confirm(
            ref="cancelEvent"
            @action=""
            title="Cancelar evento"
            message="¿Realmente desea cancelar este evento?")
</template>

<script>
    import db from '@/db.json'
    import manageEvent from './components/ManageEvent.vue'

    export default {
        name: 'Diary',

        metaInfo() {
            return {
                title: this.$t('Agenda'),
                meta: [
                    { name: 'description', content: this.$t('Agenda SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                users: db.users,
                events: db.events,

                // Filtros
                filter: {
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
                this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
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
            manageEvent
        }
    };
</script>