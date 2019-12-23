import {api} from './http'

let auth = {

	loginSuccess(vue, route, data){

		let user = data.data[0]
		//let subscription = user.subscription
		vue.$root.user = user

		if(route.name == 'register') {
			return vue.$router.push({name: 'transactions'})
		}

		/*
		//Estado usuario empresa
		if(user.type == Iko.USER_COMPANY) {

			//Registro por primera vez
			if((route.name != 'plans' && route.name != 'payInfo') && !subscription.length) {
				return vue.$router.push({name: 'plans'})
			}

			if(!subscription.length) return

			//Estado de la suscripción
			if(subscription[0].status == Iko.SUB_EXPIRED) {
				let reason = subscription[0].reason
				if(reason == Iko.BAD_PAY || reason == Iko.CANCEL) return vue.$router.push({name: 'payInfo'})
				if(reason == Iko.WAIT_CONFIRMATION && (subscription[0].payment != Iko.CASH && subscription[0].payment != Iko.PAY_TEST)) {
					return vue.$router.push({name: 'successPay'})
				}else{
					return vue.$router.push({name: 'account'})
				}
			}
		}

		//Estado del usuario suscriptor
		if(user.type == Iko.USER_SUBSCRIBER && subscription[0].status == Iko.SUB_EXPIRED) {
			return vue.$router.push({name: 'account'})
		}

		//Estado del usuario
		if(user.status != Iko.USER_ACTIVE) {
			return
		}
		*/

		//Ir a dashboard
		if(route.name == 'home') {
			return vue.$router.push({name: 'dashboard'})
		}
		
		return;
	},

	loginFailed(vue, route){

		if(route.name == 'register') {
			return
		}

		if(route.name != 'home') {
			return vue.$router.push({name: 'home'})
		}
	},

	isLogin(vue) {

		return api(vue).then((xhr) => {
			return xhr.get('/users/profile').then((r) => {
				let data = r.data
				let route = vue.$route
				return;
				//return data.response ? this.loginSuccess(vue, route, data) : this.loginFailed(vue, route)
			})
		})
	},
}

export default auth