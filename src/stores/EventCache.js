import { action, computed, observable } from 'mobx'
import AxiosStore from './AxiosStore'

import Cache from './lib/Cache'


class EventCache extends Cache {
}


export class Event {
	@observable eventUuid = ""
	@observable userUuid = ""
	@observable seshUuid = ""
	@observable title = "Loading..."
	@observable address = ""
	@observable description = ""
	@observable phone = ""
	@observable lat = 0
	@observable lng = 0
	@observable quickInfo = ""
	@observable startTimeUnix = 0
	@observable endTimeUnix = 0
	@observable tzOffsetUnix = 0
	@observable tzId = ""
	@observable tzName = ""

	@action setTitle(p) {
		this.title = p
	}
	@computed get getTitle() {
		return this.title
	}

	@action setAddress(p) {
		this.address = p
	}
	@computed get getAddress() {
		return this.address
	}
	
	@action unpackItemFromApi(body) {
		this.eventUuid = body.eventUuid
		this.userUuid = body.userUuid
		this.seshUuid = body.seshUuid
		this.title = body.title
		this.address = body.address
		this.description = body.description
		this.phone = body.phone
		this.lat = body.lat
		this.lng = body.lng
		this.quickInfo = body.quickInfo
		this.startTimeUnix = body.startTimeUnix
		this.endTimeUnix = body.endTimeUnix
		this.tzOffsetUnix = body.tzOffsetUnix
		this.tzId = body.tzId
		this.tzName = body.tzName
	}

}


const singleton = new EventCache(Event, "/events/get/")
export default singleton
