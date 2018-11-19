import { action, observable } from 'mobx'

import AxiosStore from './AxiosStore'


class AuthStore {
	@observable loggedIn = false
	@observable jwt = "jwtNS"
	@observable email = 'emailNS'
	@observable userUuid = 'userUuidNS'
	//@observable password = ''
	
	@action updateJwt(jwt) {
		this.jwt = jwt
		AxiosStore.remakeAxios(jwt)
	}

	@action updateEmail(p) {
		this.email = p
	}
	@action updateUserUuid(p) {
		this.userUuid = p
	}

	isLoggedIn() {
		return this.loggedIn
	}

	@action logout() {
		this.loggedIn = false
		this.jwt = "jwtNS"
		this.email = 'emailNS'
		this.userUuid = 'userUuidNS'
	}

}

const singleton = new AuthStore()
export default singleton
