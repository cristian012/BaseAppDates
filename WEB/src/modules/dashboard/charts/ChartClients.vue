<template lang="pug">
    v-flex.flex-600.chart.chart-2
        h2 {{$t('Clientes')}} 
            small.font-weight-regular {{ statementIncome[filterClient].text }}
        .chart-box-small#chart-clients
        .chart-legend#legend-clients
        v-divider.my-3 
        .chart-filter
            v-radio-group.flex-0.pa-0.ma-0(v-model='filterClient' hide-details)
                .chart-filter-period
                    .chart-filter-period-item(v-for='item in statementIncome' :class="{'success white--text' : item.value == filterClient}")
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
                filterClient: 0,
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

            var chartClients = am4core.create("chart-clients", am4charts.PieChart);
            chartClients.hiddenState.properties.opacity = 0; // this creates initial fade-in

            // language
            chartClients.language.locale = am4lang_es_ES;

            chartClients.data = [
                {
                    client: "Montes Nascetur Ridiculus LLC",
                    value: 800
                },
                {
                    client: "Dolor Elit Pellentesque Industries",
                    value: 650
                },
                {
                    client: "Eros Nam Consequat Associates",
                    value: 420
                },
                {
                    client: "Vitae Odio Sagittis Limited",
                    value: 315
                },
                {
                    client: "Blandit At PC",
                    value: 201
                },
                {
                    client: "Dapibus Quam Quis PC",
                    value: 150
                }
            ];

            chartClients.radius = am4core.percent(70);
            chartClients.innerRadius = am4core.percent(40);
            chartClients.startAngle = 180;
            chartClients.endAngle = 360;  

            var seriesClients = chartClients.series.push(new am4charts.PieSeries());
            seriesClients.dataFields.value = "value";
            seriesClients.dataFields.category = "client";

            seriesClients.slices.template.cornerRadius = 10;
            seriesClients.slices.template.innerCornerRadius = 7;
            seriesClients.slices.template.draggable = false;
            seriesClients.slices.template.inert = true;
            seriesClients.alignLabels = false;
            seriesClients.colors.list = [
                // am4core.color("#092F3E"),
            ];

            //- Disable ticks and labels
            seriesClients.labels.template.disabled = true;
            seriesClients.ticks.template.disabled = true;
            seriesClients.slices.template.tooltipText = "{client}\n[bold font-size: 20]${value}M[/]\n{value.percent.formatNumber('###.#')}%";

            seriesClients.hiddenState.properties.startAngle = 90;
            seriesClients.hiddenState.properties.endAngle = 90;
            seriesClients.legendSettings.valueText = " ";

            chartClients.legend = new am4charts.Legend();
            chartClients.legend.labels.template.text = "[font-size: 11]{client}[/]\n[bold]${value}M[/]";
            var legendContainerClient = am4core.create("legend-clients", am4core.Container);
            legendContainerClient.width = am4core.percent(100);
            legendContainerClient.height = am4core.percent(100);
            chartClients.legend.parent = legendContainerClient;

            chartClients.events.on("datavalidated", resizeLegend);
            chartClients.events.on("maxsizechanged", resizeLegend);

            function resizeLegend(ev) {
                document.getElementById("legend-clients").style.height = chartClients.legend.contentHeight + "px";
            }

            // Add Export
            chartClients.exporting.menu = new am4core.ExportMenu();
            chartClients.exporting.menu.align = "right";
            chartClients.exporting.menu.verticalAlign = "top";
        }
    }
</script>