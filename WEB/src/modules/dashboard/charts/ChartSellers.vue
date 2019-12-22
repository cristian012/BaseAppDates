<template lang="pug">
    v-flex.flex-600.chart.chart-4
        h2 {{$t('Vendedores')}} 
            small.font-weight-regular {{ statementIncome[filterSeller].text }}
        .chart-box-small#chart-sellers
        .chart-legend#legend-sellers
        v-divider.my-3 
        .chart-filter
            v-radio-group.flex-0.pa-0.ma-0(v-model='filterSeller' hide-details)
                .chart-filter-period
                    .chart-filter-period-item(v-for='item in statementIncome' :class="{'success white--text' : item.value == filterSeller}")
                        span {{ item.text }}
                        v-radio(:label='item.text', :value='item.value')
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
                filterSeller: 0,
                filterPeriod: 3,

                statementIncome: [
                    { text: this.$t('Venta ponderada'), value: 0 },
                    { text: this.$t('Costo ponderado'), value: 1 },
                    { text: this.$t('Utilidad ponderada'), value: 2 },
                    { text: this.$t('Cantidad'), value: 3 },
                ],

                periods: [
                    { text: this.$t('1M'), value: 0 },
                    { text: this.$t('3M'), value: 1 },
                    { text: this.$t('6M'), value: 2 },
                    { text: this.$t('1A'), value: 3 },
                    { text: this.$t('Todo'), value: 4 },
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

            var chartSellers = am4core.create("chart-sellers", am4charts.PieChart);
            chartSellers.hiddenState.properties.opacity = 0; // this creates initial fade-in

            // language
            chartSellers.language.locale = am4lang_es_ES;

            chartSellers.data = [
                {
                    seller: "Michael Gaona Buitrago",
                    value: 401
                },
                {
                    seller: "Johan Gaona Buitrago",
                    value: 300
                },
                {
                    seller: "Oscar Jimenez",
                    value: 200
                },
                {
                    seller: "Jenny Lamprea",
                    value: 165
                },
                {
                    seller: "Jonathan Montoya",
                    value: 139
                },
                {
                    seller: "Carolina Beltran",
                    value: 128
                }
            ];

            chartSellers.radius = am4core.percent(70);
            chartSellers.innerRadius = am4core.percent(40);
            chartSellers.startAngle = 180;
            chartSellers.endAngle = 360;  

            var seriesSellers = chartSellers.series.push(new am4charts.PieSeries());
            seriesSellers.dataFields.value = "value";
            seriesSellers.dataFields.category = "seller";

            seriesSellers.slices.template.cornerRadius = 10;
            seriesSellers.slices.template.innerCornerRadius = 7;
            seriesSellers.slices.template.draggable = false;
            seriesSellers.slices.template.inert = true;
            seriesSellers.alignLabels = false;
            seriesSellers.colors.list = [
                // am4core.color("#420003"),
            ];

            //- Disable ticks and labels
            seriesSellers.labels.template.disabled = true;
            seriesSellers.ticks.template.disabled = true;
            seriesSellers.slices.template.tooltipText = "{seller}\n[bold font-size: 20]${value}M[/]\n{value.percent.formatNumber('###.#')}%";

            seriesSellers.hiddenState.properties.startAngle = 90;
            seriesSellers.hiddenState.properties.endAngle = 90;
            seriesSellers.legendSettings.valueText = " ";

            chartSellers.legend = new am4charts.Legend();
            chartSellers.legend.labels.template.text = "[font-size: 11]{seller}[/]\n[bold]${value}M[/]";
            var legendContainerSeller = am4core.create("legend-sellers", am4core.Container);
            legendContainerSeller.width = am4core.percent(100);
            legendContainerSeller.height = am4core.percent(100);
            chartSellers.legend.parent = legendContainerSeller;

            chartSellers.events.on("datavalidated", resizeLegend);
            chartSellers.events.on("maxsizechanged", resizeLegend);

            function resizeLegend(ev) {
                document.getElementById("legend-sellers").style.height = chartSellers.legend.contentHeight + "px";
            }

            // Add Export
            chartSellers.exporting.menu = new am4core.ExportMenu();
            chartSellers.exporting.menu.align = "right";
            chartSellers.exporting.menu.verticalAlign = "top";
        }
    }
</script>