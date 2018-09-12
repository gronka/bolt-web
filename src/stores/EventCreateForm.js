import { computed, observable, action } from 'mobx'

import AxiosStore from './AxiosStore'


class EventCreateForm {
	@observable title = ''
	@observable venue = ''
	@observable address = ''
	@observable startTimeUnix = ''
	@observable endTimeUnix = ''
	@observable description = ''
	@observable quickInfo = ''
	@observable phone = ''

	@action setTitle(p) {
		this.title = p
	}
	@computed get getTitle() {
		return this.title
	}

	@action setVenue(p) {
		this.venue = p
	}
	@computed get getVenue() {
		return this.venue
	}

	@action setAddress(p) {
		this.address = p
	}
	@computed get getAddress() {
		return this.address
	}

	@action setStartTimeUnix(p) {
		this.startTimeUnix = p
	}
	@computed get getStartTimeUnix() {
		return this.startTimeUnix
	}

	@action setEndTimeUnix(p) {
		this.endTimeUnix = p
	}
	@computed get getEndTimeUnix() {
		return this.endTimeUnix
	}

	@action setDescription(p) {
		this.description = p
	}
	@computed get getDescription() {
		return this.description
	}

	@action setQuickInfo(p) {
		this.quickInfo = p
	}
	@computed get getQuickInfo() {
		return this.quickInfo
	}

	@action setPhone(p) {
		this.phone = p
	}
	@computed get getPhone() {
		return this.phone
	}

	submit() {
		let data = Object.assign(this)
		AxiosStore.ax.post("/api/v1/event/create", data)
	}
}

const singleton = new EventCreateForm()
export default singleton
