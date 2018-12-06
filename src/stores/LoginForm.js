import { computed, observable, action } from 'mobx'

import { conf } from '../conf'
import AuthStore from './AuthStore'
import AxiosStore from './AxiosStore'
import HistoryController from './HistoryController'
import CurrentProfileStore from './CurrentProfileStore'
import { comingFromPath } from '../helpers'


class LoginForm {
	constructor() {
		if (conf["autoLogin"]) {
			var fromPath = comingFromPath({}, true)
			this.email = conf["autoLoginEmail"]
			this.password = conf["autoLoginPassword"]
			this.submit({"from": fromPath})
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
		CurrentProfileStore.fetchProfile(claims.userUuid)
	}
}

const singleton = new LoginForm()
export default singleton
