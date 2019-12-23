<template lang="pug">
    .global-content
        toolbar

        v-content.home
            v-container(fluid)
                h1 {{$t('Bienvenido')}}
                    small {{ userData.name }}
                p {{ $store.state.title }} {{$t('está feliz de que estés aquí, elige por dónde quieres empezar.')}}
                
                .home__menu
                    router-link.home__menu__item(to="/company")
                        v-icon.mb-3(size="40") $vuetify.icons.clipboard-text
                        h2 {{$t('Completa / Actualiza los datos de tu negocio')}}
                        .home__menu__item__content.success--text
                            v-icon(size="70" color="success") $vuetify.icons.check
                            p {{$t('Datos actualizados')}}
                        small {{$t('Ir a información empresarial')}}
                        v-icon.bg $vuetify.icons.clipboard-text

                    router-link.home__menu__item(to="/opportunity-phases")
                        v-icon.mb-3(size="40") $vuetify.icons.flag
                        h2 {{$t('Personaliza tus estados de venta')}}
                        .home__menu__item__content.success--text
                            h3 3
                            p {{$t('Estados creados')}}
                        small {{$t('Ir a estados de oportunidad')}}
                        v-icon.bg $vuetify.icons.flag

                    router-link.home__menu__item(to="/users")
                        v-icon.mb-3(size="40") $vuetify.icons.account-circle
                        h2 {{$t('Invita a tu equipo')}}
                        .home__menu__item__content.success--text
                            h3 3
                            p {{$t('Usuarios registrados')}}
                        small {{$t('Ir a usuarios')}}
                        v-icon.bg $vuetify.icons.account-circle

                    router-link.home__menu__item(to="/clients")
                        v-icon.mb-3(size="40") $vuetify.icons.clients
                        h2 {{$t('Crea tus clientes')}}
                        .home__menu__item__content.success--text
                            h3 10
                            p {{$t('Clientes registrados')}}
                        small {{$t('Ir a clientes')}}
                        v-icon.bg $vuetify.icons.clients

                .home__menu.home__menu--sales
                    h2 {{$t('Controla tus ventas')}}

                    .home__menu__item
                        v-icon.mb-3(size="40") $vuetify.icons.currency-usd
                        h2 {{$t('Selecciona tu moneda')}}
                        .home__menu__item__content
                            v-select(
                                :items="coins"
                                v-model="money"
                                menu-props="auto"
                                :label="$t('Moneda')"
                                item-text="country"
                                item-value="value"
                                color="success"
                                hide-details
                                solo
                                flat
                                append-icon="keyboard_arrow_down"
                                single-line)
                                template(slot='selection', slot-scope='data') {{ data.item.symbol }}
                                template(slot='item', slot-scope='data')
                                    v-list-tile-title.d-flex.align-center 
                                        span.flex-0.mr-2 {{ data.item.symbol }} 
                                        v-spacer 
                                        span.text-xs-right.caption {{ data.item.country }} • {{ data.item.iso }}
                        small
                            template(v-for="coin in coins.filter(coin => coin.value == money)" ) {{ coin.country }} • {{ coin.iso }} • {{ coin.symbol }}
                        .v-btns.justify-center.mt-2
                            v-btn(round depressed small color="success" @click="$refs.changeCurrency.open()") {{$t('Guardar')}}
                        v-icon.bg $vuetify.icons.currency-usd

                    router-link.home__menu__item(to="/opportunities")
                        v-icon.mb-3(size="40") $vuetify.icons.opportunities
                        h2 {{$t('Registra / Actualiza oportunidades de negocio')}}
                        .home__menu__item__content.success--text
                            h3 10
                            p {{$t('Oportunidades registradas')}}
                        small {{$t('Ir aoportunidades')}}
                        v-icon.bg $vuetify.icons.opportunities

                    router-link.home__menu__item(to="/dashboard")
                        v-icon.mb-3(size="40") $vuetify.icons.dashboard
                        h2 {{$t('Visualiza tu pronóstico de ventas')}}
                        .home__menu__item__content.success--text
                            .chart-box#chart-behavior
                        small {{$t('Ir al panel de control')}}
                        v-icon.bg $vuetify.icons.dashboard

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

        confirm(
            ref="changeCurrency"
            @action=""
            :title="$t('Cambiar moneda')"
            :message="$t('¿Realmente desea cambiar la moneda?. Al cambiar la moneda se actualizarán automáticamente todos los valores creados con anterioridad a la moneda elegida.')")
</template>

<script>
    import db from '@/db.json'
    import app from '../../mixins/app'

    export default {
        mixins : [app],
        name: 'Home',

        metaInfo() {
            return {
                title: this.$t('Inicio'),
                meta: [
                    { name: 'description', content: this.$t('Inicio SalesMan CRM') }
                ]
            }
        },

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
