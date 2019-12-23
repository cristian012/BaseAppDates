<template lang="pug">
    v-flex.flex-full.chart.chart-1
        h2 {{$t('Radar de oportunidades')}}
        .chart-box-small#chart-radar
        v-divider.my-3 
        .chart-filter
            .chart-filter-box
                v-autocomplete(
                    v-model="filterRadar"
                    :items="[this.$t('Vendedor'), this.$t('Cliente')]"
                    :label="$t('Filtrar por')"
                    color="success"
                    solo
                    flat
                    hide-details
                    clearable
                    append-icon="$vuetify.icons.chevron-down")
            .chart-filter-box(v-show="filterRadar == this.$t('Vendedor')")
                v-autocomplete(
                    v-model="filterRadarSeller"
                    :items="users"
                    :label="$t('Vendedor')"
                    item-text="name"
                    item-value="uuid"
                    color="success"
                    solo
                    flat
                    hide-details
                    clearable
                    append-icon="$vuetify.icons.chevron-down")
            .chart-filter-box(v-show="filterRadar == this.$t('Cliente')")
                v-autocomplete(
                    v-model="filterRadarClient"
                    :items="clients"
                    :label="$t('Cliente')"
                    item-text="name"
                    item-value="uuid"
                    color="success"
                    solo
                    flat
                    hide-details
                    clearable
                    append-icon="$vuetify.icons.chevron-down")
            .chart-filter-date
                v-dialog(ref='dialogDateStartRadar' v-model='modalDateStartRadar' :return-value.sync='dateStartRadar' lazy full-width width='290px' content-class="v-dialog-center")
                    v-text-field(slot='activator' :value="dateStartRadar | formatDate('MMM DD, YYYY') | capitalize" :label="$t('Fecha inicial')" solo flat readonly hide-details)
                    v-date-picker(v-model='dateStartRadar' scrollable :locale="$store.state.lang" @input="$refs.dialogDateStartRadar.save(dateStartRadar)" color="success")
            .chart-filter-date
                v-dialog(ref='dialogDateEndRadar' v-model='modalDateEndRadar' :return-value.sync='dateEndRadar' lazy full-width width='290px' content-class="v-dialog-center")
                    v-text-field(slot='activator' :value="dateEndRadar | formatDate('MMM DD, YYYY') | capitalize" :label="$t('Fecha final')" solo flat readonly hide-details)
                    v-date-picker(v-model='dateEndRadar' scrollable :locale="$store.state.lang" @input="$refs.dialogDateEndRadar.save(dateEndRadar)" color="success")
            v-spacer
            v-radio-group.flex-0.pa-0.ma-0(v-model='filterPeriod' hide-details)
                .chart-filter-period
                    .chart-filter-period-item(v-for='item in periods' :class="{'success white--text' : item.value == filterPeriod}")
                        span {{ item.text }}
                        v-radio(:label='item.text', :value='item.value')
</template>

<script>
    import db from '@/db.json'

    export default {
        data() {
            return {
                // JSON
                clients: db.clients,
                users: db.users,

                // Filtros
                filterPeriod: 3,
                filterRadar: '',
                filterRadarClient: '',
                filterRadarSeller: '',
                dateStartRadar: '2018-01-01',
                dateEndRadar: '2019-01-01',

                periods: [
                    { text: this.$t('1M'), value: 0 },
                    { text: this.$t('3M'), value: 1 },
                    { text: this.$t('6M'), value: 2 },
                    { text: this.$t('1A'), value: 3 },
                    { text: this.$t('Todo'), value: 4 },
                ],

                // Datepicker modal
                modalDateStartRadar: false,
                modalDateEndRadar: false,
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

            var chartRadar = am4core.create("chart-radar", am4charts.XYChart);
            chartRadar.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chartRadar.language.locale = am4lang_es_ES;

            // chartRadar.paddingRight = 30;
            chartRadar.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

            chartRadar.data = [ 
                {
                    "oid": "OID-1",
                    "opportunity": "quam. Pellentesque habitant morbi",
                    "client": "Eu Dui Cum Corp.",
                    "seller": "Jenny Lamprea",
                    "start": "2018-04-28",
                    "end": "2018-12-27",
                    "color": "#179875",
                    "price": 462
                },
                {
                    "oid": "OID-2",
                    "opportunity": "Sed molestie. Sed",
                    "client": "Maecenas Institute",
                    "seller": "Jenny Lamprea",
                    "start": "2018-04-27",
                    "end": "2018-10-12",
                    "color": "#179875",
                    "price": 308
                },
                {
                    "oid": "OID-3",
                    "opportunity": "Donec egestas. Duis",
                    "client": "Urna LLC",
                    "seller": "Jenny Lamprea",
                    "start": "2018-08-12",
                    "end": "2018-09-03",
                    "color": "#179875",
                    "price": 75
                },
                {
                    "oid": "OID-4",
                    "opportunity": "Pellentesque ut",
                    "client": "Suspendisse Foundation",
                    "seller": "Jenny Lamprea",
                    "start": "2018-03-31",
                    "end": "2018-08-30",
                    "color": "#f75353",
                    "price": 495
                },
                {
                    "oid": "OID-5",
                    "opportunity": "eu augue",
                    "client": "Sit Amet Risus Incorporated",
                    "seller": "Jenny Lamprea",
                    "start": "2018-03-20",
                    "end": "2018-07-14",
                    "color": "#179875",
                    "price": 237
                },
                {
                    "oid": "OID-6",
                    "opportunity": "sed",
                    "client": "Convallis Est LLP",
                    "seller": "Jenny Lamprea",
                    "start": "2018-01-24",
                    "end": "2018-03-05",
                    "color": "#179875",
                    "price": 374
                },
                {
                    "oid": "OID-7",
                    "opportunity": "diam.",
                    "client": "Ligula Consectetuer Consulting",
                    "seller": "Jenny Lamprea",
                    "start": "2018-09-20",
                    "end": "2018-10-21",
                    "color": "#ffbe00",
                    "price": 455
                },
                {
                    "oid": "OID-8",
                    "opportunity": "ipsum. Suspendisse non leo.",
                    "client": "Nec Orci Donec LLC",
                    "seller": "Jenny Lamprea",
                    "start": "2018-09-03",
                    "end": "2018-10-15",
                    "color": "#179875",
                    "price": 54
                },
                {
                    "oid": "OID-9",
                    "opportunity": "Nullam",
                    "client": "Enim Condimentum Associates",
                    "seller": "Jenny Lamprea",
                    "start": "2018-04-04",
                    "end": "2018-08-26",
                    "color": "#179875",
                    "price": 233
                },
                {
                    "oid": "OID-10",
                    "opportunity": "malesuada malesuada. Integer",
                    "client": "Consectetuer Cursus Incorporated",
                    "seller": "Jenny Lamprea",
                    "start": "2018-09-13",
                    "end": "2018-11-20",
                    "color": "#f75353",
                    "price": 385
                },
                {
                    "oid": "OID-11",
                    "opportunity": "vehicula.",
                    "client": "Felis Consulting",
                    "seller": "Jenny Lamprea",
                    "start": "2018-01-11",
                    "end": "2018-06-19",
                    "color": "#179875",
                    "price": 399
                },
                {
                    "oid": "OID-12",
                    "opportunity": "cubilia Curae; Donec",
                    "client": "Egestas Corp.",
                    "seller": "Jenny Lamprea",
                    "start": "2018-05-02",
                    "end": "2018-06-29",
                    "color": "#ffbe00",
                    "price": 346
                },
                {
                    "oid": "OID-13",
                    "opportunity": "Donec",
                    "client": "Vel Pede PC",
                    "seller": "Jenny Lamprea",
                    "start": "2018-11-19",
                    "end": "2018-12-04",
                    "color": "#f75353",
                    "price": 413
                },
                {
                    "oid": "OID-14",
                    "opportunity": "nec, eleifend",
                    "client": "Rutrum Eu Corp.",
                    "seller": "Jenny Lamprea",
                    "start": "2018-05-28",
                    "end": "2018-07-13",
                    "color": "#f75353",
                    "price": 155
                },
                {
                    "oid": "OID-15",
                    "opportunity": "feugiat placerat",
                    "client": "Non Enim Institute",
                    "seller": "Jenny Lamprea",
                    "start": "2018-02-09",
                    "end": "2018-08-14",
                    "color": "#ffbe00",
                    "price": 421
                },
                {
                    "oid": "OID-16",
                    "opportunity": "gravida. Praesent eu nulla",
                    "client": "Montes PC",
                    "seller": "Jenny Lamprea",
                    "start": "2018-09-30",
                    "end": "2018-10-15",
                    "color": "#179875",
                    "price": 118
                },
            ];

            chartRadar.dateFormatter.dateFormat = "yyyy-MM-dd";
            chartRadar.dateFormatter.inputDateFormat = "yyyy-MM-dd";

            var categoryAxisRadar = chartRadar.yAxes.push(new am4charts.CategoryAxis());
            categoryAxisRadar.dataFields.category = "oid";
            categoryAxisRadar.renderer.grid.template.location = 0;
            categoryAxisRadar.renderer.inversed = true;
            categoryAxisRadar.fontSize = 10;

            var dateAxisRadar = chartRadar.xAxes.push(new am4charts.DateAxis());
            dateAxisRadar.fontSize = 10;
            dateAxisRadar.renderer.minGridDistance = 70;
            dateAxisRadar.baseInterval = { count: 1, timeUnit: "day" };
            // dateAxisRadar.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
            //dateAxisRadar.strictMinMax = true;
            dateAxisRadar.renderer.tooltipLocation = 0;

            var seriesRadar = chartRadar.series.push(new am4charts.ColumnSeries());
            seriesRadar.columns.template.width = am4core.percent(20);
            seriesRadar.columns.template.tooltipText = "{oid}\n{opportunity}\n[font-size: 12]{openDateX.formatDate('MMM dd, YYYY')} - {dateX.formatDate('MMM dd, YYYY')}[/]\n[bold]${price.formatNumber('#,###.#')}M[/]\n[font-size: 10]Cliente: {client}[/]\n[font-size: 10]Vendedor: {seller}[/]";

            seriesRadar.dataFields.openDateX = "start";
            seriesRadar.dataFields.dateX = "end";
            seriesRadar.dataFields.categoryY = "oid";
            seriesRadar.columns.template.propertyFields.fill = "color"; // get color from data
            seriesRadar.columns.template.propertyFields.stroke = "color";
            seriesRadar.columns.template.strokeOpacity = 1;

            var columnTemplateRadar = seriesRadar.columns.template;
            columnTemplateRadar.column.cornerRadiusTopLeft = 20;
            columnTemplateRadar.column.cornerRadiusTopRight = 20;
            columnTemplateRadar.column.cornerRadiusBottomLeft = 20;
            columnTemplateRadar.column.cornerRadiusBottomRight = 20;

            chartRadar.scrollbarX = new am4core.Scrollbar();
            chartRadar.scrollbarY = new am4core.Scrollbar();

            // Add cursor
            chartRadar.cursor = new am4charts.XYCursor();
            chartRadar.cursor.behavior = "zoomX";
        }
    }
</script>