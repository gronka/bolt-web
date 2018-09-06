import { computed, observable, action } from 'mobx'

import axios from 'axios'

import { conf } from '../conf'
import AuthStore from './AuthStore'
import FlashStore from './FlashStore'


class LoginForm {
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
		let url = `${conf["bapi"]}${path}`
		axios.post(url, data)
		.then((resp) => {
			if (resp.data.i === "login accepted") {
				//alert("login accepted")
				AuthStore.loggedIn = true
				AuthStore.jwt = resp.data.b.jwt
				AuthStore.email = data.email
				FlashStore.addFlash(JSON.stringify(AuthStore.jwt))
			}
		})
	}
}

const singleton = new LoginForm()
export default singleton
