<template lang="pug">
    .global-content
        toolbar
        
        v-content
            v-container.dashboard.pa-0(fluid)
                v-layout(row wrap)
                    v-flex.chart-data.flex-200(v-for="(item, i) in generalPerspective" :key="i" :class="item.color")
                        h2 {{ item.name }}
                        h3(v-if="item.percent") {{ item.value }}%
                        h3(v-else-if="item.days") {{ item.value }} {{ item.value | pluralize( $t('día'), $t('días') ) }}
                        h3(v-else-if="item.number") {{ item.value }}
                        h3(v-else) {{ item.value | currency($root.money , 0) }}
                    
                    //- Gráfica comportamiento
                    chart-behavior

                    //- Gráfica balance de ventas
                    chart-balance

                    //- Gráfica proyección de ventas
                    chart-projection

                    //- Gráfica vendedores
                    chart-sellers

                    //- Gráfica clientes
                    chart-clients

                    //- Gráfica radar de oportunidades
                    chart-radar

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

</template>

<script>
    import db from '@/db.json'
    import ChartBehavior from './charts/ChartBehavior.vue'
    import ChartBalance from './charts/ChartBalance.vue'
    import ChartProjection from './charts/ChartProjection.vue'
    import ChartSellers from './charts/ChartSellers.vue'
    import ChartClients from './charts/ChartClients.vue'
    import ChartRadar from './charts/ChartRadar.vue'
    import app from '../../mixins/app'

    export default {
        name: 'Dashboard',
        mixins : [app],
        metaInfo() {
            return {
                title: this.$t('Panel de control'),
                meta: [
                    { name: 'description', content: this.$t('Panel de control SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // JSON
                opportunities: db.opportunities,
                clients: db.clients,
                users: db.users,
                phases: db.phases,

                // Filtros
                dateStart: '2018-01-01',
                dateEnd: '2019-01-01',
                filterPeriod: 3,
                filterYears: [2016, 2017, 2018],
                filterYear: 2017,
                filterSeller: 0,
                filterClient: 0,
                filterRadar: '',
                filterRadarClient: '',
                filterRadarSeller: '',
                filterOpportunities: 0,
                dateStartRadar: '2018-01-01',
                dateEndRadar: '2019-01-01',

                generalPerspective: [
                    { color: 'lime--text text--darken-1', name: this.$t('Venta proyectada'), value: 25149000 },
                    { color: 'light-green--text', name: this.$t('Utilidad bruta proyectada'), value: 11039000 },
                    { color: 'green--text', name: this.$t('Margen promedio'), value: 43.89, percent: true },
                    { color: 'teal--text', name: this.$t('Ticket promedio'), value: 4841667 },
                    { color: 'cyan--text', name: this.$t('Ciclo de vida'), value: 58, days: true },
                    { color: 'blue--text', name: this.$t('Oportunidades cerradas'), value: 2, number: true },
                ],

                periods: [
                    { text: this.$t('1M'), value: 0 },
                    { text: this.$t('3M'), value: 1 },
                    { text: this.$t('6M'), value: 2 },
                    { text: this.$t('1A'), value: 3 },
                    { text: this.$t('Todo'), value: 4 },
                ],

                years: [
                    2016, 2017, 2018
                ],

                statementIncome: [
                    { text: this.$t('Venta ponderada'), value: 0 },
                    { text: this.$t('Costo ponderado'), value: 1 },
                    { text: this.$t('Utilidad ponderada'), value: 2 },
                    { text: this.$t('Cantidad'), value: 3 },
                ],

                statementIncomeOpportunities: [
                    { text: this.$t('Venta'), value: 0 },
                    { text: this.$t('Margen'), value: 1 }
                ],

                // Datepicker modal
                modalDateStart: false,
                modalDateEnd: false,
                modalDateStartRadar: false,
                modalDateEndRadar: false,
            }
        },

        components: {
            ChartBehavior,
            ChartBalance,
            ChartProjection,
            ChartSellers,
            ChartClients,
            ChartRadar
        }
    };
</script>