import { action, computed, observable } from 'mobx'
import AxiosStore from './AxiosStore'


class EventCache {
	@observable events = {}
	@observable querying = []

	@action getEvent(eventUuid) {
		if (this.events[eventUuid] == null) {
			// TODO: store time retrieved, update if cached item is old
			this.events[eventUuid] = new Event()
			this.getEventFromApi(eventUuid)
		} 
		return this.events[eventUuid]
	}

	@action getEventFromApi(eventUuid) {
		// Make sure event isn't being queried
		var queryingIdx = this.querying.indexOf(eventUuid)
		if (queryingIdx > -1) {
			return
		}

		// note that event is being queried
		this.querying.push(eventUuid)
		AxiosStore.ax.get("/events/get/" + eventUuid)
		.then((resp) => {
			if (resp.status === 200) {
				this.loadEventFromApi(resp, eventUuid)
			}
		})
	}

	@action loadEventFromApi(resp, eventUuid) {
		var body = JSON.parse(JSON.stringify(resp.data.b))
		this.events[eventUuid].setAllFromApi(body)
		this.stopQuerying(eventUuid)
	}

	stopQuerying(eventUuid) {
		var idx = this.querying.indexOf(eventUuid)
		if (idx !== -1) {
			this.querying.splice(idx)
		}
	}

}


class Event {
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
	
	@action setAllFromApi(body) {
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


const singleton = new EventCache()
export default singleton
