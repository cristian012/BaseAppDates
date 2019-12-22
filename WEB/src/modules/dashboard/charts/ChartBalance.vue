<template lang="pug">
    v-flex.flex-600.chart.chart-2
        h2 {{$t('Balance de ventas año a año')}} 
        .chart-box#chart-balance
        v-divider.my-3 
        v-autocomplete(
            v-model="filterYears"
            :items="years"
            :label="$t('Años')"
            color="success"
            solo
            flat
            multiple
            hide-details
            append-icon="$vuetify.icons.chevron-down")
            template(slot='selection' slot-scope='data')
                v-chip(:selected='data.selected' small label outline)
                    span.pr-2 {{ data.item }}
                    v-icon(small @click="remove(filterYears, data.item)") $vuetify.icons.close
</template>

<script>
    export default {
        data() {
            return {
                // Filtros
                filterYears: [2016, 2017, 2018],
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
            },

            // Remover chips años
            remove(list, item) {
                const index = list.indexOf(item)
                if (index >= 0) list.splice(index, 1)
            },
        },

        mounted() {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            this.chartheme();
            // Themes end

            // Create chart instance
            var chartBalance = am4core.create("chart-balance", am4charts.XYChart);

            // language
            chartBalance.language.locale = am4lang_es_ES;

            // Add data
            chartBalance.data = [
                {
                    "year": "2016",
                    "costs": 10.5,
                    "sales": 15,
                    "profits": 4.5
                }, {
                    "year": "2017",
                    "costs": 9,
                    "sales": 17.7,
                    "profits": 8.7
                }, {
                    "year": "2018",
                    "costs": 8.8,
                    "sales": 20.9,
                    "profits": 12.1
                }
            ];

            // Add cursor
            chartBalance.cursor = new am4charts.XYCursor();

            // Add legend
            chartBalance.legend = new am4charts.Legend();
            chartBalance.legend.position = "top";
            chartBalance.legend.contentAlign = "left";
            chartBalance.legend.marginBottom = 10;

            // Create axes
            var categoryAxisBalance = chartBalance.yAxes.push(new am4charts.CategoryAxis());
            categoryAxisBalance.dataFields.category = "year";
            categoryAxisBalance.renderer.grid.template.opacity = 0;

            var valueAxisBalance = chartBalance.xAxes.push(new am4charts.ValueAxis());
            valueAxisBalance.min = 0;
            valueAxisBalance.renderer.grid.template.opacity = 0;
            valueAxisBalance.renderer.ticks.template.strokeOpacity = 0.5;
            valueAxisBalance.renderer.ticks.template.stroke = am4core.color("#495C43");
            valueAxisBalance.renderer.ticks.template.length = 10;
            valueAxisBalance.renderer.line.strokeOpacity = 0.5;
            valueAxisBalance.renderer.baseGrid.disabled = true;
            valueAxisBalance.renderer.minGridDistance = 40;
            valueAxisBalance.numberFormatter = new am4core.NumberFormatter(0);
            valueAxisBalance.numberFormatter.numberFormat = "[font-size: 10]$#,###.##M[/]"; 

            // Create series
            function createSeries(field, name, color) {
                var series = chartBalance.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueX = field;
                series.dataFields.categoryY = "year";
                series.stacked = true;
                series.name = name;
                series.stroke = color;
                series.fill = color;
                // series.tooltipText = "{name}\n[bold font-size: 20]${valueX}M[/]";

                var labelBullet = series.bullets.push(new am4charts.LabelBullet());
                labelBullet.locationX = 0.5;
                labelBullet.label.text = "[medium]${valueX}M[/]";
                labelBullet.label.fill = am4core.color("#fff");
            }

            createSeries("sales", this.$t('Ventas'), "#179875");
            createSeries("costs", this.$t('Costos'), "#98171D");
            createSeries("profits", this.$t('Utilidades'), "#177398");

            // Add Export
            chartBalance.exporting.menu = new am4core.ExportMenu();
            chartBalance.exporting.menu.align = "right";
            chartBalance.exporting.menu.verticalAlign = "top";
        }
    }
</script>