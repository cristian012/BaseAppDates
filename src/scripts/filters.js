import Moment from 'moment'
import Iko from './const'

export default {
	currency (value, currency, decimals, comma) {

		const digitsRE = /(\d{3})(?=\d)/g
		value = parseFloat(value)
		if(!isFinite(value) || (!value && value !== 0)) return ''

		currency = currency != null ? currency : '$'
		decimals = decimals != null ? decimals : 2
		comma = comma != null ? comma : ','

		let stringified = Math.abs(value).toFixed(decimals)
		let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
		let i = _int.length % 3
		let head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? comma : '')) : ''
		let _float = decimals ? stringified.slice(-1 - decimals) : ''
		let sign = value < 0 ? '-' : ''
		return sign + currency + head + _int.slice(i).replace(digitsRE, ('$1' + comma)) + _float
	},
	formatDate(value, format = 'YYYY-MM-DD'){
		return Moment(value).format(format)
	},
	nameMonth(value){
		let month = Moment().month((value - 1)).format('MMMM')
		return month.charAt(0).toUpperCase() + month.slice(1)
	},
	auditModule(value){
		return Iko.AUDIT_MODULES[value]
	},
	auditAction(value, index){
		return Iko.AUDIT[value][index]
	},
	objectParse(obj, key){
		let parse = JSON.parse(obj)
		return parse == {} ? '' : (parse.hasOwnProperty(key) ? parse[key] : '') 
	},
	toJsonForm(string){
		string = string.replace(/\ /g, "_");
		var json = '{';
		string = string.replace(/\=/g, " ");
		string = string.split(/\&/g);
		
		var key = '';
		var value = '';
		for(var i in string){
			key = '';
			value = '';
			key = '"'+string[i].split(/\ /g)[0]+'"';
			json = json + key + ':';
			value = '"'+string[i].split(/\ /g)[1].replace(/\_/g, " ")+'"';
			json = json + value + ',';
		}
		json = json.substring(0, json.length - 1);
		json = json + '}';
		return json;
	},
	validateForm(message, pref){
		//borramos cualquier span que tenga la clase fail
		var content = document.getElementsByClassName('fail');
		while(content.length > 0){
			content[0].parentNode.removeChild(content[0]);
		}
		//agregamos los span con la clase fail dependiendo de la respuesta del servidor
		for(var pos in message.data){
			var element =  $('#'+pref+message.data[pos].id)
			if(element){
				element.parent().append("<span class='fail'>"+message.data[pos].value+"</span>");
			}
		}
	},
	clearFrom(){
		try {
			//borramos cualquier span que tenga la clase fail
			var content = document.getElementsByClassName('fail');
			while(content.length > 0){
				content[0].parentNode.removeChild(content[0]);
			}
		} catch (error) {
			console.log(error)
		}

	},
	getHour(value){
		return Moment(String(value)).format('hh:mm')
	},
	urlB64ToUint8Array(base64String){
		if(base64String){
			const padding = '='.repeat((4 - base64String.length % 4) % 4);
			const base64 = (base64String + padding)
				.replace(/\-/g, '+')
				.replace(/_/g, '/');

			const rawData = window.atob(base64);
			const outputArray = new Uint8Array(rawData.length);

			for (let i = 0; i < rawData.length; ++i) {
				outputArray[i] = rawData.charCodeAt(i);
			}
			return outputArray;
		}else{
			return []
		}

	}
}