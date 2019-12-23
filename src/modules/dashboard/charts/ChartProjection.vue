<template lang="pug">
    v-flex.flex-600.chart.chart-3
        h2 {{ $t('Proyección de ventas durante el año') }} {{ filterYear }}
        .chart-box#chart-projection
        v-divider.my-3 
        v-autocomplete(
            v-model="filterYear"
            :items="years"
            :label="$t('Años')"
            color="success"
            solo
            flat
            hide-details
            append-icon="$vuetify.icons.chevron-down")
</template>

<script>
    export default {
        data() {
            return {
                // Filtros
                filterYear: 2017,
                years: [
                    2016, 2017, 2018
                ],
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
            var chartProjection = am4core.create("chart-projection", am4charts.XYChart);

            // language
            chartProjection.language.locale = am4lang_es_ES;

            // Add data
            chartProjection.data = [
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
                }
            ];

            // Create axes
            var dateAxisProjection = chartProjection.xAxes.push(new am4charts.DateAxis());
            dateAxisProjection.renderer.grid.template.disabled = true;
            dateAxisProjection.renderer.minGridDistance = 60;
            dateAxisProjection.fontSize = 10; 

            var valueAxisProjection = chartProjection.yAxes.push(new am4charts.ValueAxis());
            valueAxisProjection.numberFormatter = new am4core.NumberFormatter();
            valueAxisProjection.numberFormatter.numberFormat = "[font-size: 10]$#,###.##M[/]"; 

            // Create series
            var seriesSalesProjection = chartProjection.series.push(new am4charts.ColumnSeries());
            seriesSalesProjection.dataFields.valueY = "sales";
            seriesSalesProjection.dataFields.dateX = "date";
            seriesSalesProjection.name = this.$t('Ventas');
            seriesSalesProjection.stroke = "#179875";
            seriesSalesProjection.strokeWidth = 0;
            seriesSalesProjection.fill = "#179875";
            seriesSalesProjection.yAxis = valueAxisProjection;
            seriesSalesProjection.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";

            var seriesCostsProjection = chartProjection.series.push(new am4charts.ColumnSeries());
            seriesCostsProjection.dataFields.valueY = "costs";
            seriesCostsProjection.dataFields.dateX = "date";
            seriesCostsProjection.name = this.$t('Costos');
            seriesCostsProjection.stroke = "#98171D";
            seriesCostsProjection.strokeWidth = 0;
            seriesCostsProjection.fill = "#98171D";
            seriesCostsProjection.yAxis = valueAxisProjection;
            seriesCostsProjection.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";

            var seriesProfitsProjection = chartProjection.series.push(new am4charts.ColumnSeries());
            seriesProfitsProjection.dataFields.valueY = "profits";
            seriesProfitsProjection.dataFields.dateX = "date";
            seriesProfitsProjection.name = this.$t('Utilidades');
            seriesProfitsProjection.stroke = "#177398";
            seriesProfitsProjection.strokeWidth = 0;
            seriesProfitsProjection.fill = "#177398";
            seriesProfitsProjection.yAxis = valueAxisProjection;
            seriesProfitsProjection.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";

            // Add cursor
            chartProjection.cursor = new am4charts.XYCursor();

            // Add legend
            chartProjection.legend = new am4charts.Legend();
            chartProjection.legend.position = "top";
            chartProjection.legend.contentAlign = "left";
            chartProjection.legend.marginBottom = 20;

            // Add scrollbar
            chartProjection.scrollbarX = new am4charts.XYChartScrollbar();
            chartProjection.scrollbarX.series.push(seriesSalesProjection);
            chartProjection.scrollbarX.parent = chartProjection.bottomAxesContainer;
            chartProjection.scrollbarX.hideGrips = true;

            // Add Export
            chartProjection.exporting.menu = new am4core.ExportMenu();
            chartProjection.exporting.menu.align = "right";
            chartProjection.exporting.menu.verticalAlign = "top";
        }
    }
</script>