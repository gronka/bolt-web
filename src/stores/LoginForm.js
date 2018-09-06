import { computed, observable, action } from 'mobx'

import { conf } from '../conf'
import AuthStore from './AuthStore'
import AxiosStore from './AxiosStore'
import FlashStore from './FlashStore'


class LoginForm {
	constructor() {
		if (conf["autoLogin"]) {
			this.email = conf["autoLoginEmail"]
			this.password = conf["autoLoginPassword"]
			this.submit()
		}
	}

	@observable email = ''
	@observable password = ''

	@action setEmail(p) {
		this.email = p
	}
	@computed get getEmail() {
		return this.email
	}

	@action setPassword(p) {
		this.password = p
	}
	@computed get getPassword() {
		return this.password
	}

	submit() {
		let data = Object.assign(this)
		let path = "/user/login"
		AxiosStore.ax.post(path, data)
		.then((resp) => {
			if (resp.data.i === "login accepted") {
				//alert("login accepted")
				AuthStore.loggedIn = true
				AuthStore.email = data.email
				AuthStore.updateJwt(resp.data.b.jwt)
				//FlashStore.addFlash(JSON.stringify(AuthStore.jwt))
			}
		})
	}
}

const singleton = new LoginForm()
export default singleton
