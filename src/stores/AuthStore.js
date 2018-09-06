import { action, observable } from 'mobx'

import AxiosStore from './AxiosStore'


class AuthStore {
	@observable loggedIn = false
	@observable jwt = ""
	@observable email = ''
	//@observable password = ''
	
	@action updateJwt(jwt) {
		this.jwt = jwt
		AxiosStore.remakeAxios(jwt)
	}

}

const singleton = new AuthStore()
export default singleton
