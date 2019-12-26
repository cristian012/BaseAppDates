<template lang="pug">
    .global-content
        toolbar

        v-content
            v-container(fluid).pgrs_pt_0.pgrs_home_head_sec
                v-layout(row)
                    v-flex(xl2 lg2)
                    v-flex(xl8 lg8)
                        global-search-bar()
                    v-flex(xl2 lg2)
            
            v-container(fluid)
                v-flex
                    v-container(grid-list-lg)
                        v-layout(row wrap)
                            v-flex( v-for='(item, index) in 4', :key='index' xl2, lg3, md4, sm4, xs12)
                                v-card(height='90px')
                                    | Card Info

        confirm(
            ref="changeCurrency"
            @action=""
            :title="$t('Cambiar moneda')"
            :message="$t('¿Realmente desea cambiar la moneda?. Al cambiar la moneda se actualizarán automáticamente todos los valores creados con anterioridad a la moneda elegida.')")
</template>

<script>
    import db from '@/db.json'
    import app from '../../mixins/app'
    import GlobalSearchBar from '../../components/GlogalSearchBar'

    export default {
        mixins : [app],
        name: 'Home',

        metaInfo() {
            return {
                title: this.$t('Inicio'),
                meta: [
                    { name: 'description', content: this.$t('Inicio Bookser') }
                ]
            }
        },
        components:{GlobalSearchBar},
        data() {
            return {
                // JSON
                userData: db.userData,
                coins: db.coins,

                // Moneda del sistema
                money: '40',
            }
        },

        computed: {
        },

        mounted () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // am4core.useTheme(am4themes_dark);
            // var darkTheme = store.state.darkTheme;
            if(this.darkTheme) {
                am4core.useTheme(am4themes_dark);
            };
            // Themes end

            // --------------- Gráfica Comportamiento --------------- //
            // Create chart instance
            var chartBehavior = am4core.create("chart-behavior", am4charts.XYChart);

            // language
            chartBehavior.language.locale = am4lang_es_ES;

            // Add data
            chartBehavior.data = [
                {
                    "date": "2019-01-01",
                    "costs": 5,
                    "sales": 6,
                    "profits": 1
                },
                {
                    "date": "2019-02-01",
                    "costs": 1,
                    "sales": 4,
                    "profits": 3
                },
                {
                    "date": "2019-03-01",
                    "costs": 6,
                    "sales": 9,
                    "profits": 3
                },
                {
                    "date": "2019-04-01",
                    "costs": 6,
                    "sales": 9,
                    "profits": 3
                },
                {
                    "date": "2019-05-01",
                    "costs": 9,
                    "sales": 1,
                    "profits": 8
                },
                {
                    "date": "2019-06-01",
                    "costs": 8,
                    "sales": 1,
                    "profits": 7
                },
                {
                    "date": "2019-07-01",
                    "costs": 1,
                    "sales": 8,
                    "profits": 7
                },
                {
                    "date": "2019-08-01",
                    "costs": 9,
                    "sales": 8,
                    "profits": 1
                },
                {
                    "date": "2019-09-01",
                    "costs": 7,
                    "sales": 4,
                    "profits": 3
                },
                {
                    "date": "2019-10-01",
                    "costs": 2,
                    "sales": 4,
                    "profits": 2
                },
                {
                    "date": "2019-11-01",
                    "costs": 3,
                    "sales": 2,
                    "profits": 1
                },
                {
                    "date": "2019-12-01",
                    "costs": 1,
                    "sales": 3,
                    "profits": 2
                }
            ];

            // Create axes
            var dateAxisBehavior = chartBehavior.xAxes.push(new am4charts.DateAxis());
            dateAxisBehavior.startLocation = 0.5;
            dateAxisBehavior.endLocation = 0.5;
            dateAxisBehavior.renderer.grid.template.disabled = true;
            dateAxisBehavior.renderer.minGridDistance = 60;
            dateAxisBehavior.fontSize = 0;

            var valueAxisBehavior = chartBehavior.yAxes.push(new am4charts.ValueAxis());
            valueAxisBehavior.renderer.grid.template.disabled = true;
            valueAxisBehavior.numberFormatter = new am4core.NumberFormatter();
            valueAxisBehavior.numberFormatter.numberFormat = ""; 
            valueAxisBehavior.renderer.inside = true;

            // Create series
            var seriesSales = chartBehavior.series.push(new am4charts.LineSeries());
            seriesSales.dataFields.valueY = "sales";
            seriesSales.dataFields.dateX = "date";
            seriesSales.name = this.$t('Ventas');
            seriesSales.stroke = "#179875";
            seriesSales.strokeWidth = 2;
            seriesSales.tensionX = 0.75;
            seriesSales.fill = "#179875";
            seriesSales.fillOpacity = 0.1;
            seriesSales.yAxis = valueAxisBehavior;
            seriesSales.tooltipText = "{name}\n[bold font-size: 16]${valueY}M[/]";

            // Add cursor
            chartBehavior.cursor = new am4charts.XYCursor();
            // chartBehavior.cursor.behavior = "panX";

            // --------------- Fin Gráfica Comportamiento --------------- //
        },

        methods: {
        }
    };
</script>
