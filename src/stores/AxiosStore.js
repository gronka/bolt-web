import axios from 'axios'

import { conf } from '../conf'
import FlashStore from './FlashStore'


class AxiosStore {
	constructor() {
		this.makeAxiosWithDefaults("")
		this.setAxiosInterceptors()
	}

	makeAxiosWithDefaults(jwt) {
		this.ax = axios.create({
			baseURL: conf["bapi"],
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': jwt,
			}
		})
	}

	setAxiosInterceptors() {
		this.ax.interceptors.response.use(
			function(resp) {
				if (resp.data == null) {
					FlashStore.addFlash("Axios returned null response.", "error")
				} else {
					//alert(JSON.stringify(resp.data))
					FlashStore.unpackFlashMsgs(resp.data)
					return Promise.resolve(resp)
				}
			}, 

			function (error) {
				FlashStore.addFlash(error.message, "error")
				//if(error.response.status === 401) {
					//return Promise.reject(error);
				//}
				return Promise.reject(error)
			});

	}

	remakeAxios(jwt) {
		this.makeAxiosWithDefaults(jwt)
		this.setAxiosInterceptors()
	}


}

const singleton = new AxiosStore()
export default singleton
