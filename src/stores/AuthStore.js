import { action, observable } from 'mobx'

import AxiosStore from './AxiosStore'


class AuthStore {
	@observable loggedIn = false
	@observable jwt = ""
	@observable email = ''
	@observable userUuid = ''
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

}

const singleton = new AuthStore()
export default singleton
