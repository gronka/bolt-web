import { computed, observable, action } from 'mobx'
import { browserHistory } from 'react-router-dom'

import { conf } from '../conf'
import AuthStore from './AuthStore'
import AxiosStore from './AxiosStore'


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

	@action submit() {
		let data = Object.assign(this)
		let path = "/user/login"
		AxiosStore.ax.post(path, data)
		.then((resp) => {
			if (resp.data.i === "login accepted") {
				this.updateAuthStore(resp)
			}
		})
	}

	@action updateAuthStore(resp) {
		AuthStore.loggedIn = true
		var jwt = resp.data.b.jwt
		var claims = JSON.parse(atob(jwt.split('.')[1]))
		AuthStore.email = claims.email
		AuthStore.userUuid = claims.userUuid
		AuthStore.updateJwt(jwt)
	}
}

const singleton = new LoginForm()
export default singleton
