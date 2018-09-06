import { computed, observable, action } from 'mobx'

import axios from 'axios'

import { conf } from '../conf'


class RegisterForm {
	@observable email = ''
	@observable verifyEmail = ''
	@observable password = ''
	@observable verifyPassword = ''
	@observable fullName = ''
	@observable phone = ''

	@action setEmail(p) {
		this.email = p
	}
	@computed get getEmail() {
		return this.email
	}

	@action setVerifyEmail(p) {
		this.verifyEmail = p
	}
	@computed get getVerifyEmail() {
		return this.verifyEmail
	}

	@action setPassword(p) {
		this.password = p
	}
	@computed get getPassword() {
		return this.password
	}

	@action setVerifyPassword(p) {
		this.verifyPassword = p
	}
	@computed get getVerifyPassword() {
		return this.verifyPassword
	}

	@action setFullName(p) {
		this.fullName = p
	}
	@computed get getFullName() {
		return this.fullName
	}

	@action setPhone(p) {
		this.phone = p
	}
	@computed get getPhone() {
		return this.phone
	}

	submit() {
		let data = Object.assign(this)
		let path = "/api/v1/user/register"
		let url = `${conf["bapi-root"]}${path}`
		axios.post(url, data)
	}
}

const singleton = new RegisterForm()
export default singleton
