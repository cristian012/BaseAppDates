import Vue from "vue";
import Vuex from 'vuex';
import App from "./App.vue";

import Vuetify from "vuetify";
import i18n from './i18n'
import Vue2Filters from 'vue2-filters'
import VueMeta from 'vue-meta'

//Config Plugins - API
import VuetifyConfirm from './components/shared/confirm/index'
import VueAxios from './plugins/VueAxios'
import VueUUID from './plugins/VueUUID'
import VueLocalForage from 'vue-localforage'
import VueApi from './plugins/VueApi'
import VueMoment from './plugins/VueMoment'
import VueClone from './plugins/VueClone'
import Gen from './plugins/Gen'

import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueApi)
Vue.use(VuetifyConfirm)
Vue.use(VueMeta)
Vue.use(VueAxios)
Vue.use(VueUUID)
Vue.use(VueLocalForage)
Vue.use(VueMoment)
Vue.use(Gen) 
Vue.use(VueClone)

Vue.use(Vuex);
Vue.use(Vue2Filters);
Vue.use(Vuetify, {
    theme: {
        // SalesMan theme --------------
        primary: '#342DA0',
        secondary: '#FCC250',
        accent: '#24B5F5',
        error: '#f75353',
        info: '#177398',
        success: '#179875',
        warning: '#ffbe00',

        // Memorial theme --------------- 
        // primary: '#481465',
        // secondary: '#CC9A44',
        // accent: '#E2B77D',
        // error: '#f75353',
        // info: '#177398',
        // success: '#4cd4a5',
        // warning: '#ffbe00',
    },
    iconfont: 'mdi',
    icons: {
        'menu': 'mdi-menu',
        'chevron-left': 'mdi-chevron-left',
        'chevron-right': 'mdi-chevron-right',
        'chevron-up': 'mdi-chevron-up',
        'chevron-down': 'mdi-chevron-down',
        'users': 'mdi-account-circle-outline',
        'registered-users': 'mdi-account-check-outline',
        'notifications': 'mdi-bell-outline',
        'help': 'mdi-lifebuoy',
        'build': 'mdi-wrench',
        'support': 'mdi-face-agent',
        'exit': 'mdi-exit-to-app',
        'home': 'mdi-home-outline',
        'dashboard': 'mdi-view-dashboard-outline',
        'clients': 'mdi-account-multiple-outline',
        'client': 'mdi-account-outline',
        'contacts': 'mdi-phone-log-outline',
        'opportunities': 'mdi-progress-check',
        'beenhere': 'mdi-marker-check',
        'history': 'mdi-history',
        'settings': 'mdi-tune',
        'flag': 'mdi-flag-outline',
        'info': 'mdi-information-outline',
        'dark': 'mdi-lightbulb-outline',
        'light': 'mdi-lightbulb',
        'clipboard-text': 'mdi-clipboard-text',
        'check': 'mdi-check',
        'currency-usd': 'mdi-currency-usd',
        'checkbox-marked': 'mdi-checkbox-marked',
        'checkbox-blank-outline': 'mdi-checkbox-blank-outline',
        'view-grid': 'mdi-view-grid',
        'view-sequential': 'mdi-view-sequential',
        'search': 'mdi-magnify',
        'dots-vertical': 'mdi-dots-vertical',
        'detail': 'mdi-eye-outline',
        'documents': 'mdi-folder-outline',
        'edit': 'mdi-pencil-outline',
        'delete': 'mdi-trash-can-outline',
        'close': 'mdi-close',
        'import': 'mdi-package-up',
        'export': 'mdi-package-down',
        'place': 'mdi-map-marker-outline',
        'phone': 'mdi-phone-ring-outline',
        'check-all': 'mdi-check-all',
        'add': 'mdi-plus',
        'email': 'mdi-email-outline',
        'remove': 'mdi-minus-circle-outline',
        'money': 'mdi-cash-usd-outline',
        'work': 'mdi-briefcase-outline',
        'back': 'mdi-arrow-left',
        'drag': 'mdi-drag-vertical',
        'notes': 'mdi-note-text-outline',
        'duplicate': 'mdi-content-duplicate',
        'date': 'mdi-calendar-blank-outline',
        'time': 'mdi-clock-outline',
        'cached': 'mdi-cached',
        'download': 'mdi-download-outline',
        'play': 'mdi-play-outline',
        'stop': 'mdi-stop',
        'activities': 'mdi-format-list-checks',
        'diary': 'mdi-calendar-text-outline',
        'show': 'mdi-eye-outline',
        'hide': 'mdi-eye-off-outline',
        'update': 'mdi-update',
        'id': 'mdi-account-card-details-outline'
    }
});

// Global components 
import Toolbar from '@/components/Toolbar.vue'
import FooterComponent from '@/components/Footer.vue'
import FilterComponent from '@/components/Filter.vue'
import BtnsFloating from '@/components/BtnsFloating.vue'
import BackToTop from '@/components/BackToTop.vue'
import Confirm from '@/components/Confirm.vue'
import CountResults from '@/components/CountResults.vue'
import NotFound from '@/components/NotFound.vue'
import InfiniteLoading from '@/components/InfiniteLoading.vue'
import Alert from '@/components/Alert.vue'
import Cleave from '@/components/vendor/Cleave.vue';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
Vue.component('Toolbar', Toolbar)
Vue.component('FooterComponent', FooterComponent)
Vue.component('FilterComponent', FilterComponent)
Vue.component('BtnsFloating', BtnsFloating)
Vue.component('BackToTop', BackToTop)
Vue.component('Confirm', Confirm)
Vue.component('CountResults', CountResults)
Vue.component('NotFound', NotFound)
Vue.component('InfiniteLoading', InfiniteLoading)
Vue.component('Alert', Alert)
Vue.component('Cleave', Cleave);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

// import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


if (process.browser) {
    const VueUploadComponent = require('vue-upload-component')
    Vue.component('file-upload', VueUploadComponent)

    const VueQuillEditor = require('vue-quill-editor/dist/ssr')
    Vue.use(VueQuillEditor, /* { default global options } */)

    let VueColor = require('vue-color')
    Vue.component('sliderPicker', VueColor.Slider)
    Vue.component('grayscalePicker', VueColor.Grayscale)

    const am4core = require('@amcharts/amcharts4/core')
    const am4charts = require('@amcharts/amcharts4/charts')
    const am4themes_animated = require('@amcharts/amcharts4/themes/animated')
}

// Filtros
const moment = require('moment')
require('moment/locale/es')
Vue.filter('formatDate', function (date, format) {
    if (!date) return ''
    return moment(date).format(format)
})

import createRouter from "./router";

export default function createApp() {
    const router = createRouter();

    const store = new Vuex.Store({
        state: {
            title: 'SalesMan CRM',
            // title: 'Charlieboss',
            users: [],
        
            // Menu
            drawer: null,
            mini: true,
        
            // Tema
            darkTheme: false,
        
            // Filtro
            filter: false,
        
            // Volver arriba
            backToTop: false,
        
            // Vista
            viewList: 0,
        
            // Alertas
            alert: false,
            alertMessage: '',
            alertColor: '',

            //Preloader
            preload:true,
        
            // Selección masiva
            checkList: false,
        
            // Idioma datepickers
            lang: 'es-ES',
        
            // Moneda
            currency: '$ ',

            // Validación
            rules: [
                v => !!v || 'Este campo es requerido'
            ],
            dateRules: [
                v => !!v || 'Debes seleccionar una fecha'
            ],
            emailRules: [
                v => !!v || 'El correo electrónico es requerido',
                v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El correo electrónico debe ser válido'
            ],
            phoneRules: [
                v => !!v || 'El número de teléfono es requerido',
                v => /^\d{7,12}$/.test(v) || 'El número de teléfono debe ser válido'
            ],
        },

        mutations: {
            changeTheme(state) {
                state.darkTheme = !state.darkTheme
            },
            
            openDrawer(state) {
                state.drawer = !state.drawer
            },
            
            miniDrawer(state) {
                state.mini = !state.mini
            },
            
            openFilter(state) {
                state.filter = !state.filter
            },
            
            checkList(state) {
                state.checkList = !state.checkList
            },
            
            changeView(state) {
                if(state.viewList == 0) {
                    return state.viewList = 1
                } else{
                    return state.viewList = 0
                }
            },
        }
    });

    const app = new Vue({    
        router,
        i18n,
        store,
        data() {
			return {
				preload : true,
				profile: {	
                    names: "German Forero Fonseca",
                    user_name: "German Forero",
                    email: "german.forero@email.com",
                    phone: "3505551234",
                    avatar: "https://bit.ly/2DS5K9A",
                    can:[
                        { icon: '$vuetify.icons.home', can: 'Inicio', alias: '' },
                        { icon: '$vuetify.icons.dashboard', can: 'Panel de control', alias: 'dashboard' },
                        { icon: '$vuetify.icons.clients', can: 'Clientes', alias: 'clients' },
                        { icon: '$vuetify.icons.contacts', can: 'Contactos', alias: 'contacts' },
                        { icon: '$vuetify.icons.opportunities', can: 'Oportunidades', alias: 'opportunities' },
                        { icon: '$vuetify.icons.activities', can: 'Actividades', alias: 'activities' },
                        { icon: '$vuetify.icons.diary', can: 'Agenda', alias: 'diary' },
                        { icon: '$vuetify.icons.history', can: 'Historial', alias: 'history' },
                        { 
                            icon: '$vuetify.icons.settings', 
                            can: 'Configuración', 
                            items: [
                                { icon: '$vuetify.icons.users', can: 'Usuarios', alias: 'users' },
                                { icon: '$vuetify.icons.registered-users', can: 'Usuarios inscritos', alias: 'registered-users' },
                                { icon: '$vuetify.icons.flag', can: 'Estados de oportunidad', alias: 'opportunity-phases' },
                                { icon: '$vuetify.icons.info', can: 'Información empresarial', alias: 'company' },
                                { icon: '$vuetify.icons.users', can: 'Perfiles', alias: 'profiles' },
                            ]
                        },
                    ]					
                },
                superAdmon: "1b2ff72c-ca59-5433-aa6d-9fd17e84ac02"
			}
		}, 
        render: h => h(App),
    });

    return { app, router };
}
