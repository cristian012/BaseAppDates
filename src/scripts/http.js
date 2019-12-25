import axios from 'axios'
import Iko from './const'
const API_URL = Iko.API_URL

let api = (Vue, cb) => {

	return Vue.$getItem('Bookser').then((token) => {

        token = token ? token : ''
        return cb(axios.create({
            baseURL: API_URL, 
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',  
				common: {
					'Accept'              : 'application/json',
					'X-Token-Bookser'    : token
				},
				post: {
					'Content-Type': 'multipart/form-data'
				}
            },
            validateStatus(status) {
                return status < 500
            }
        }))
    })
    .catch(() => Vue.$emit('networkError'))
}

let http = axios.create({
	baseURL: API_URL,
	headers: {
		common: {
			'Accept': 'application/json',
		},
		post: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	},
	validateStatus: function(status) {
		return status < 500
	},
})

export {api, http, API_URL}