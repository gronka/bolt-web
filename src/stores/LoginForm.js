import { computed, observable, action } from 'mobx'

import { conf } from '../conf'
import AuthStore from './AuthStore'
import AxiosStore from './AxiosStore'
import HistoryController from './HistoryController'


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

	@action submit(opts={}) {
		let from = "/emptyPage"
		if (opts.from != null) {
			from = opts.from
		}

		let data = Object.assign(this)
		let path = "/user/login"
		AxiosStore.ax.post(path, data)
		.then((resp) => {
			if (resp.data.i === "login accepted") {
				this.updateAuthStore(resp)
				// TODO: redirect to page that user came from
				HistoryController.redirect(from)
			}
		})
	}

	@action updateAuthStore(resp) {
		var jwt = resp.data.b.jwt
		var claims = JSON.parse(atob(jwt.split('.')[1]))
		AuthStore.loggedIn = true
		AuthStore.email = claims.email
		AuthStore.userUuid = claims.userUuid
		AuthStore.updateJwt(jwt)
	}
}

const singleton = new LoginForm()
export default singleton
