export default {

	/**
	 * Generales
	 * */
	API_URL: '',
	PROGRESUS_API: 'http://138.197.124.107:9093',
	SERVICE_ID: 'a55712bc-80ad-551c-b5d2-f6735959e217', 
	PROGRESUS_REGISTER: 'http://138.197.124.107:5052/register?continue=plans/a55712bc-80ad-551c-b5d2-f6735959e217?current=a55712bc-80ad-551c-b5d2-f6735959e217&service=a55712bc-80ad-551c-b5d2-f6735959e217',
	PROGRESUS_PLANS: 'http://138.197.124.107:5052/plans/a55712bc-80ad-551c-b5d2-f6735959e217?current=a55712bc-80ad-551c-b5d2-f6735959e217',
	PROGRESUS_ACCOUNT: 'http://138.197.124.107:5052/?current=a55712bc-80ad-551c-b5d2-f6735959e217',
	SERVER_PUSH: 'BE3TV9TB1GrvOSWkG2idKcWF4NQmvcATPP2_CYmTbYDMJEnzfJSUayhrFUiwWIQqhICH_m_8rjAV5zb4wX3mWqI',

	//idioma por defecto
	LANG: 'es',

	PAGINATION_LIMIT: 15,

	/**
	 * Periodos de recurrencia
	 * */
	CYCLE: {
		day: ['día', 'dias'],
		week: ['semana', 'semanas'],
		month: ['mes', 'meses'],
		year: ['año', 'años']
	},

	/**
	 * Estado de la cola
	 * */
	QUEUE_CANCEL: 1,
	QUEUE_DELETE: 0,

	/**
	 * Métodos de pago
	 * */
	PSE: 2,
	CASH: 3,
	PAY_TEST: 4,

	/**
	 * Permisos de usuarios
	 * */
	CAN_ADMIN: {
		users: 'Usuarios',
		banks: 'Bancos',
		providers: 'Proveedores',
		transactions: 'Transacciones',
		clients: 'Clientes',
		dashboard: 'Dashboard',
		box: 'Flujo de caja',
		analytics: 'Analítica',
		budgets: 'Tipo ingreso/egreso',
		audit: 'Auditoría',
		subs: 'Suscriptores',
		config: 'Configuración',
	},

	CAN_SUBS: {
		users: 'Usuarios',
		banks: 'Bancos',
		providers: 'Proveedores',
		transactions: 'Transacciones',
		clients: 'Clientes',
		dashboard: 'Dashboard',
		box: 'Flujo de caja',
		analytics: 'Analítica',
		budgets: 'Tipo ingreso/egreso',
		audit: 'Auditoría',
	}
}