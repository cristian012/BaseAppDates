<template lang="pug">
    v-flex.flex-full.chart.chart-1
        h2 {{$t('Comportamiento')}}
        .chart-box#chart-behavior
        v-divider.my-3
        .chart-filter
            .chart-filter-date
                v-dialog(ref='dialogDateStart' v-model='modalDateStart' :return-value.sync='dateStart' lazy full-width width='290px' content-class="v-dialog-center")
                    v-text-field(slot='activator' :value="dateStart | formatDate('MMM DD, YYYY') | capitalize" :label="$t('Fecha inicial')" solo flat readonly hide-details)
                    v-date-picker(v-model='dateStart' scrollable :locale="$store.state.lang" @input="$refs.dialogDateStart.save(dateStart)" color="success")
            .chart-filter-date
                v-dialog(ref='dialogDateEnd' v-model='modalDateEnd' :return-value.sync='dateEnd' lazy full-width width='290px' content-class="v-dialog-center")
                    v-text-field(slot='activator' :value="dateEnd | formatDate('MMM DD, YYYY') | capitalize" :label="$t('Fecha final')" solo flat readonly hide-details)
                    v-date-picker(v-model='dateEnd' scrollable :locale="$store.state.lang" @input="$refs.dialogDateEnd.save(dateEnd)" color="success")
            v-spacer
            v-radio-group.flex-0.pa-0.ma-0(v-model='filterPeriod' hide-details)
                .chart-filter-period
                    .chart-filter-period-item(v-for='item in periods' :class="{'success white--text' : item.value == filterPeriod}")
                        span {{ item.text }}
                        v-radio(:label='item.text', :value='item.value')
</template>

<script>
    export default {
        data() {
            return {
                // Filtros
                dateStart: '2018-01-01',
                dateEnd: '2019-01-01',
                filterPeriod: 3,

                periods: [
                    { text: this.$t('1M'), value: 0 },
                    { text: this.$t('3M'), value: 1 },
                    { text: this.$t('6M'), value: 2 },
                    { text: this.$t('1A'), value: 3 },
                    { text: this.$t('Todo'), value: 4 },
                ],

                // Datepicker modal
                modalDateStart: false,
                modalDateEnd: false,
            }
        },

        methods: {
            chartheme(){
                if(!this.$store.state.darkTheme) {
                    am4core.unuseTheme(am4themes_dark);
                } else {
                    am4core.useTheme(am4themes_dark);
                }
            }
        },

        mounted() {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            this.chartheme();
            // Themes end

            // Create chart instance
            var chartBehavior = am4core.create("chart-behavior", am4charts.XYChart);

            // language
            chartBehavior.language.locale = am4lang_es_ES;

            // Add data
            chartBehavior.data = [
                {
                    "date": "2017-01-01",
                    "costs": 8,
                    "sales": 7,
                    "profits": 1
                },
                {
                    "date": "2017-02-01",
                    "costs": 4,
                    "sales": 4,
                    "profits": 0
                },
                {
                    "date": "2017-03-01",
                    "costs": 1,
                    "sales": 10,
                    "profits": 9
                },
                {
                    "date": "2017-04-01",
                    "costs": 10,
                    "sales": 7,
                    "profits": 3
                },
                {
                    "date": "2017-05-01",
                    "costs": 3,
                    "sales": 3,
                    "profits": 0
                },
                {
                    "date": "2017-06-01",
                    "costs": 7,
                    "sales": 3,
                    "profits": 4
                },
                {
                    "date": "2017-07-01",
                    "costs": 7,
                    "sales": 7,
                    "profits": 0
                },
                {
                    "date": "2017-08-01",
                    "costs": 9,
                    "sales": 6,
                    "profits": 3
                },
                {
                    "date": "2017-09-01",
                    "costs": 10,
                    "sales": 5,
                    "profits": 5
                },
                {
                    "date": "2017-10-01",
                    "costs": 5,
                    "sales": 1,
                    "profits": 4
                },
                {
                    "date": "2017-11-01",
                    "costs": 8,
                    "sales": 9,
                    "profits": 1
                },
                {
                    "date": "2017-12-01",
                    "costs": 5,
                    "sales": 7,
                    "profits": 2
                },
                {
                    "date": "2018-01-01",
                    "costs": 5,
                    "sales": 6,
                    "profits": 1
                },
                {
                    "date": "2018-02-01",
                    "costs": 1,
                    "sales": 4,
                    "profits": 3
                },
                {
                    "date": "2018-03-01",
                    "costs": 6,
                    "sales": 9,
                    "profits": 3
                },
                {
                    "date": "2018-04-01",
                    "costs": 6,
                    "sales": 9,
                    "profits": 3
                },
                {
                    "date": "2018-05-01",
                    "costs": 9,
                    "sales": 1,
                    "profits": 8
                },
                {
                    "date": "2018-06-01",
                    "costs": 8,
                    "sales": 1,
                    "profits": 7
                },
                {
                    "date": "2018-07-01",
                    "costs": 1,
                    "sales": 8,
                    "profits": 7
                },
                {
                    "date": "2018-08-01",
                    "costs": 9,
                    "sales": 8,
                    "profits": 1
                },
                {
                    "date": "2018-09-01",
                    "costs": 7,
                    "sales": 4,
                    "profits": 3
                },
                {
                    "date": "2018-10-01",
                    "costs": 2,
                    "sales": 4,
                    "profits": 2
                },
                {
                    "date": "2018-11-01",
                    "costs": 3,
                    "sales": 2,
                    "profits": 1
                },
                {
                    "date": "2018-12-01",
                    "costs": 1,
                    "sales": 3,
                    "profits": 2
                },
                {
                    "date": "2019-01-01",
                    "costs": 4,
                    "sales": 6,
                    "profits": 2
                },
            ];

            // Create axes
            var dateAxisBehavior = chartBehavior.xAxes.push(new am4charts.DateAxis());
            dateAxisBehavior.startLocation = 0.5;
            dateAxisBehavior.endLocation = 0.5;
            dateAxisBehavior.renderer.grid.template.disabled = true;
            dateAxisBehavior.renderer.minGridDistance = 60;
            dateAxisBehavior.fontSize = 10;
            // dateAxisBehavior.renderer.grid.template.location = 0;
            // dateAxisBehavior.baseInterval = {
            //     timeUnit: "year",
            //     count: 1
            // };

            var valueAxisBehavior = chartBehavior.yAxes.push(new am4charts.ValueAxis());
            valueAxisBehavior.numberFormatter = new am4core.NumberFormatter();
            valueAxisBehavior.numberFormatter.numberFormat = "[font-size: 10]$#,###.##M[/]"; 
            // valueAxisBehavior.renderer.inside = true;

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
            seriesSales.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";
            // seriesSales.stroke = chartBehavior.colors.getIndex(0).lighten(0.5);
            // seriesSales.strokeDasharray = "3,3";

            var bulletSales = seriesSales.bullets.push(new am4charts.Bullet());
            var circleSales = bulletSales.createChild(am4core.Circle);
            circleSales.width = 4;
            circleSales.height = 4;
            circleSales.strokeWidth = 1;
            circleSales.fill = "#fff";
            circleSales.horizontalCenter = "middle";
            circleSales.verticalCenter = "middle";

            var seriesCosts = chartBehavior.series.push(new am4charts.LineSeries());
            seriesCosts.dataFields.valueY = "costs";
            seriesCosts.dataFields.dateX = "date";
            seriesCosts.name = this.$t('Costos');
            seriesCosts.stroke = "#98171D";
            seriesCosts.strokeWidth = 2;
            seriesCosts.tensionX = 0.75;
            seriesCosts.fill = "#98171D";
            seriesCosts.fillOpacity = 0.1;
            seriesCosts.yAxis = valueAxisBehavior;
            seriesCosts.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";

            var bulletCosts = seriesCosts.bullets.push(new am4charts.Bullet());
            var circleCost = bulletCosts.createChild(am4core.Circle);
            circleCost.width = 4;
            circleCost.height = 4;
            circleCost.strokeWidth = 1;
            circleCost.fill = "#fff";
            circleCost.horizontalCenter = "middle";
            circleCost.verticalCenter = "middle";

            var seriesProfits = chartBehavior.series.push(new am4charts.LineSeries());
            seriesProfits.dataFields.valueY = "profits";
            seriesProfits.dataFields.dateX = "date";
            seriesProfits.name = this.$t('Utilidades');
            seriesProfits.stroke = "#177398";
            seriesProfits.strokeWidth = 2;
            seriesProfits.tensionX = 0.75;
            seriesProfits.fill = "#177398";
            seriesProfits.fillOpacity = 0.1;
            seriesProfits.yAxis = valueAxisBehavior;
            seriesProfits.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";

            var bulletProfits = seriesProfits.bullets.push(new am4charts.Bullet());
            var circleProfits = bulletProfits.createChild(am4core.Circle);
            circleProfits.width = 4;
            circleProfits.height = 4;
            circleProfits.strokeWidth = 1;
            circleProfits.fill = "#fff";
            circleProfits.horizontalCenter = "middle";
            circleProfits.verticalCenter = "middle";

            // Add cursor
            chartBehavior.cursor = new am4charts.XYCursor();
            // chartBehavior.cursor.behavior = "panX";

            // Add legend
            chartBehavior.legend = new am4charts.Legend();
            chartBehavior.legend.useDefaultMarker = true;
            chartBehavior.legend.position = "top";
            chartBehavior.legend.contentAlign = "left";
            chartBehavior.legend.marginBottom = 20;

            // Add scrollbar
            chartBehavior.scrollbarX = new am4charts.XYChartScrollbar();
            chartBehavior.scrollbarX.series.push(seriesSales);
            chartBehavior.scrollbarX.parent = chartBehavior.bottomAxesContainer;
            chartBehavior.scrollbarX.hideGrips = true;


            // Add Export
            chartBehavior.exporting.menu = new am4core.ExportMenu();
            chartBehavior.exporting.menu.align = "right";
            chartBehavior.exporting.menu.verticalAlign = "top";
            
            var dateStart = this.dateStart
            var dateEnd = this.dateEnd

            chartBehavior.events.on("ready", function () {
                dateAxisBehavior.zoomToDates(dateStart, dateEnd);
            });
        }
    }
</script>