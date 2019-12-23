<template lang="pug">
    .global-content
        toolbar
            v-btn(icon @click="$store.commit('openFilter')")
                v-icon {{ $store.state.filter ? '$vuetify.icons.chevron-right' : '$vuetify.icons.search' }}
        
        filter-component
            v-checkbox.ma-0.mb-1(v-for="(i, k) in historyStatus" :key="k" :label="i.name" v-model="filter.status" :value="i.value" color="success" hide-details)
            v-divider.my-3
            v-dialog(ref='dialogDateStart' v-model='modalDateStart' :return-value.sync='filter.dateStart' lazy full-width width='290px' content-class="v-dialog-center")
                v-text-field(slot='activator' :value="filter.dateStart | formatDate('MMMM DD, YYYY') | capitalize" :label="$t('Fecha inicial')" append-icon="$vuetify.icons.date" readonly color="success" :rules="rules" required)
                v-date-picker(v-model='filter.dateStart' scrollable :locale="$root.lang" @input="$refs.dialogDateStart.save(filter.dateStart)" color="success")
            v-dialog(ref='dialogDateEnd' v-model='modalDateEnd' :return-value.sync='filter.dateEnd' lazy full-width width='290px' content-class="v-dialog-center")
                v-text-field(slot='activator' :value="filter.dateEnd | formatDate('MMMM DD, YYYY') | capitalize" :label="$t('Fecha final')" append-icon="$vuetify.icons.date" readonly color="success" :rules="rules" required hide-details)
                v-date-picker(v-model='filter.dateEnd' scrollable :locale="$root.lang" @input="$refs.dialogDateEnd.save(filter.dateEnd)" color="success")
            v-divider.my-3
            v-radio-group.ma-0.mb-3(v-model="filter.order" hide-details)
                v-radio(v-for="(item, n) in orderByItems" :key="n" :label="$t(item.text)" :value="item.value" color="success")

        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Historial')}}

                v-timeline(v-if="history.length")
                    v-timeline-item(
                        v-for="(item, i) in orderBy(history, 'date', -1)"
                        :color="item.historyStatus == 0 ? 'error' : '' || item.historyStatus == 1 ? 'success' : '' || item.historyStatus == 2 ? 'info' : '' || item.historyStatus == 3 ? 'warning' : '' "
                        :icon="item.historyStatus == 0 ? '$vuetify.icons.delete' : '' || item.historyStatus == 1 ? '$vuetify.icons.add' : '' || item.historyStatus == 2 ? '$vuetify.icons.update' : '' || item.historyStatus == 3 ? '$vuetify.icons.remove' : '' "
                        :key="i"
                        fill-dot)
                        div(slot="opposite") 
                            h2 
                                span {{ item.date | formatDate('MMMM') | capitalize }} 
                                b {{ item.date | formatDate('DD') }} 
                                strong {{ item.date | formatDate('YYYY') }} 
                            h3 
                                v-icon(size="20") $vuetify.icons.time
                                span {{ item.date | formatDate('H:mm:ss') }}
                        v-card.mt-0
                            .v-sheet-content
                                .v-sheet-status(:class="item.historyStatus == 0 ? 'error' : '' || item.historyStatus == 1 ? 'success' : '' || item.historyStatus == 2 ? 'info' : '' || item.historyStatus == 3 ? 'warning' : '' ")
                                h3(v-for="user in users.filter(user => user.uuid == item.user)") {{ user.name }}
                                v-divider.my-2
                                h2.mb-2 {{ historyStatus[item.historyStatus].name }}
                                .list-line.grey
                                    h3 {{ item.module }}
                                    h3 {{ item.detailModule }}

                not-found(v-else message="No se encontró historial")

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

</template>

<script>
    import db from '@/db.json'
    import Vue2Filters from 'vue2-filters'

    export default {
        name: 'History',
        mixins: [Vue2Filters.mixin],

        metaInfo() {
            return {
                title: this.$t('Historial'),
                meta: [
                    { name: 'description', content: this.$t('Historial SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                users: db.users,
                orderByItems: db.orderBy,

                // Filtros
                // Filtros
                filter: {
                    status: [0, 1, 2, 3],
                    dateStart: '',
                    dateEnd: '',
                    order: 0
                },
                historyStatus: [
                    { name: this.$t('Eliminó'), value: 0 },
                    { name: this.$t('Creó'), value: 1 },
                    { name: this.$t('Actualizó'), value: 2 },
                    { name: this.$t('Desvinculó'), value: 3 },
                ],

                // Datepicker modal
                modalDateStart: false,
                modalDateEnd: false,

                history: [
                    {
                        "date": "2019-06-03 07:06:49",
                        "user": 2,
                        "historyStatus": 1,
                        "module": "Contacto",
                        "detailModule": "semper. Nam tempor"
                    },
                    {
                        "date": "2018-11-18 13:11:56",
                        "user": 3,
                        "historyStatus": 0,
                        "module": "Contacto",
                        "detailModule": "arcu"
                    },
                    {
                        "date": "2019-01-29 00:01:47",
                        "user": 2,
                        "historyStatus": 0,
                        "module": "Información empresarial",
                        "detailModule": "Nam ligula elit,"
                    },
                    {
                        "date": "2018-07-22 20:07:42",
                        "user": 2,
                        "historyStatus": 3,
                        "module": "Información empresarial",
                        "detailModule": "ad litora"
                    },
                    {
                        "date": "2019-03-03 02:03:24",
                        "user": 2,
                        "historyStatus": 1,
                        "module": "Moneda",
                        "detailModule": "velit dui,"
                    },
                    {
                        "date": "2020-01-20 14:01:30",
                        "user": 3,
                        "historyStatus": 3,
                        "module": "Información empresarial",
                        "detailModule": "amet,"
                    },
                    {
                        "date": "2019-03-10 16:03:36",
                        "user": 2,
                        "historyStatus": 3,
                        "module": "Contacto",
                        "detailModule": "lacus. Aliquam"
                    },
                    {
                        "date": "2019-08-03 05:08:21",
                        "user": 3,
                        "historyStatus": 2,
                        "module": "Moneda",
                        "detailModule": "sit amet ultricies"
                    },
                    {
                        "date": "2019-04-24 21:04:03",
                        "user": 1,
                        "historyStatus": 1,
                        "module": "Estado",
                        "detailModule": "Aliquam auctor, velit"
                    },
                    {
                        "date": "2018-10-17 10:10:19",
                        "user": 2,
                        "historyStatus": 2,
                        "module": "Información empresarial",
                        "detailModule": "diam nunc,"
                    },
                    {
                        "date": "2018-11-29 20:11:03",
                        "user": 2,
                        "historyStatus": 3,
                        "module": "Estado",
                        "detailModule": "Nulla tincidunt, neque"
                    },
                    {
                        "date": "2018-06-17 00:06:56",
                        "user": 1,
                        "historyStatus": 2,
                        "module": "Usuario",
                        "detailModule": "consectetuer rhoncus. Nullam velit"
                    },
                    {
                        "date": "2019-03-07 14:03:53",
                        "user": 1,
                        "historyStatus": 1,
                        "module": "Información empresarial",
                        "detailModule": "Integer urna. Vivamus molestie"
                    },
                    {
                        "date": "2019-04-23 11:04:21",
                        "user": 3,
                        "historyStatus": 0,
                        "module": "Moneda",
                        "detailModule": "nisl elementum"
                    },
                    {
                        "date": "2018-10-13 12:10:37",
                        "user": 2,
                        "historyStatus": 3,
                        "module": "Oportunidad",
                        "detailModule": "amet metus."
                    },
                    {
                        "date": "2020-02-01 10:02:11",
                        "user": 2,
                        "historyStatus": 0,
                        "module": "Oportunidad",
                        "detailModule": "ut, sem. Nulla interdum."
                    },
                    {
                        "date": "2019-11-27 02:11:47",
                        "user": 3,
                        "historyStatus": 0,
                        "module": "Oportunidad",
                        "detailModule": "dis parturient montes,"
                    },
                    {
                        "date": "2019-08-06 07:08:07",
                        "user": 3,
                        "historyStatus": 2,
                        "module": "Moneda",
                        "detailModule": "dui lectus rutrum"
                    },
                    {
                        "date": "2018-10-15 02:10:27",
                        "user": 2,
                        "historyStatus": 1,
                        "module": "Estado",
                        "detailModule": "sit amet,"
                    },
                    {
                        "date": "2019-05-20 15:05:01",
                        "user": 2,
                        "historyStatus": 2,
                        "module": "Oportunidad",
                        "detailModule": "elit. Nulla facilisi. Sed"
                    },
                    {
                        "date": "2018-12-27 06:12:33",
                        "user": 2,
                        "historyStatus": 0,
                        "module": "Estado",
                        "detailModule": "semper. Nam tempor"
                    },
                    {
                        "date": "2019-07-08 19:07:46",
                        "user": 1,
                        "historyStatus": 3,
                        "module": "Moneda",
                        "detailModule": "Quisque ornare tortor"
                    },
                    {
                        "date": "2018-09-23 17:09:54",
                        "user": 2,
                        "historyStatus": 1,
                        "module": "Cliente",
                        "detailModule": "tellus."
                    },
                    {
                        "date": "2019-04-06 19:04:14",
                        "user": 3,
                        "historyStatus": 1,
                        "module": "Información empresarial",
                        "detailModule": "pede. Praesent"
                    },
                    {
                        "date": "2019-09-17 07:09:02",
                        "user": 1,
                        "historyStatus": 1,
                        "module": "Moneda",
                        "detailModule": "non, lobortis quis,"
                    },
                    {
                        "date": "2018-07-22 04:07:22",
                        "user": 1,
                        "historyStatus": 0,
                        "module": "Usuario",
                        "detailModule": "Curabitur ut"
                    },
                    {
                        "date": "2019-01-22 02:01:11",
                        "user": 1,
                        "historyStatus": 0,
                        "module": "Estado",
                        "detailModule": "est, congue a,"
                    },
                    {
                        "date": "2018-08-08 15:08:14",
                        "user": 3,
                        "historyStatus": 3,
                        "module": "Cliente",
                        "detailModule": "libero. Integer"
                    },
                    {
                        "date": "2019-11-14 20:11:31",
                        "user": 1,
                        "historyStatus": 0,
                        "module": "Oportunidad",
                        "detailModule": "morbi tristique senectus"
                    },
                    {
                        "date": "2019-05-01 09:05:46",
                        "user": 1,
                        "historyStatus": 1,
                        "module": "Información empresarial",
                        "detailModule": "orci. Donec"
                    },
                    {
                        "date": "2018-11-13 11:11:19",
                        "user": 2,
                        "historyStatus": 3,
                        "module": "Oportunidad",
                        "detailModule": "Curabitur ut odio vel"
                    },
                    {
                        "date": "2018-04-30 23:04:59",
                        "user": 1,
                        "historyStatus": 2,
                        "module": "Oportunidad",
                        "detailModule": "placerat eget,"
                    },
                    {
                        "date": "2019-04-16 17:04:28",
                        "user": 1,
                        "historyStatus": 0,
                        "module": "Moneda",
                        "detailModule": "Phasellus"
                    },
                    {
                        "date": "2018-06-11 16:06:45",
                        "user": 2,
                        "historyStatus": 1,
                        "module": "Contacto",
                        "detailModule": "ut lacus."
                    },
                    {
                        "date": "2018-09-17 02:09:56",
                        "user": 3,
                        "historyStatus": 2,
                        "module": "Cliente",
                        "detailModule": "accumsan convallis,"
                    },
                    {
                        "date": "2019-11-02 21:11:11",
                        "user": 3,
                        "historyStatus": 2,
                        "module": "Usuario",
                        "detailModule": "consequat"
                    },
                    {
                        "date": "2018-12-06 05:12:55",
                        "user": 3,
                        "historyStatus": 0,
                        "module": "Cliente",
                        "detailModule": "augue scelerisque mollis. Phasellus"
                    },
                ],
            }
        }
    };
</script>