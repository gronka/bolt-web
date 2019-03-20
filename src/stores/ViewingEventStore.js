import { observable, action } from 'mobx'
import AxiosStore from './AxiosStore'

import AuthStore from './AuthStore'
import MapController from './MapController'


class ViewingEventStore {
	// TODO: load the Event class from EvenchCache.js? Wrap that instead?
	@observable eventUuid = "eventUuidNS"
	@observable userUuid = "userUuidNS"
	@observable title = "titleNS"
	@observable address = "addressNS"
	@observable description = "descriptionNS"
	@observable phone = "phoneNS"
	@observable lat = "latNS"
	@observable lng = "lngNS"
	@observable quickInfo = "quickInfoNS"
	@observable startDate = "startDateNS"
	@observable endDate = "endDateNS"
	@observable tzOffsetUnix = "tzOffsetUnixNS"
	@observable tzId = "tzIdNS"
	@observable tzName = "tzNameNS"

	status = "stateNotSet"
	@observable loaded = false

	fetchEvent(eventUuid) {
		this.loaded = false
		this.status = "fetchEvent"
		AxiosStore.ax.get("/events/get/" + eventUuid)
		.then((resp) => {
			this.loadEventFromApi(resp)
		})
	}

	setStatus(status) {
		this.status = status
	}

	@action loadEventFromApi(resp) {
		// TODO: update this event in EventCache
		var data = resp.data.b
		this.eventUuid = data.eventUuid
		this.userUuid = data.userUuid
		this.title = data.title
		this.address = data.address
		this.description = data.description
		this.phone = data.phone
		this.lat = data.lat
		this.lng = data.lng
		this.quickInfo = data.quickInfo
		this.startDate = new Date(data.startTimeUnix)
		this.endDate = new Date(data.endTimeUnix)
		this.tzOffsetUnix = data.tzOffsetUnix
		this.tzId = data.tzId
		this.tzName = data.tzName
		this.loaded = true

		var point = {
			"lat": this.lat,
			"lng": this.lng,
		}
		MapController.updateMarkersByType("unary", point)
		MapController.panToPoint(point)

		this.setStatus("ready")
	}

	addEventToList(listName) {
		var data = {
			userUuid: AuthStore.userUuid,
			field: listName,
			value: this.eventUuid,
		}

		AxiosStore.ax.post("/user/addEventToList", data)
	}

	saveFieldToDb(field, value) {
		// TODO: use this field for creating an authorization failure test.
		//eventUuid: "00000000-0000-0000-0000-000000000003",
		var data = {
			eventUuid: this.eventUuid,
			field: field,
			value: this[field],
		}
		AxiosStore.ax.post("/event/updateField", data)
	}

}


class UserList {
	@observable uuids = []
	@observable names = []
	@observable pics = []

}


const singleton = new ViewingEventStore()
export default singleton