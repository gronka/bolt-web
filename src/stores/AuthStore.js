import { observable } from 'mobx'


class AuthStore {
	@observable loggedIn = false
	@observable jwt = ""
	@observable email = ''
	//@observable password = ''

}

const singleton = new AuthStore()
export default singleton
