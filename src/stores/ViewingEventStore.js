import { observable, action } from 'mobx'
import AxiosStore from './AxiosStore'

import AuthStore from './AuthStore'
import Capsule from './lib/Capsule'
import EventCache, { Event } from './EventCache'
import Log from '../Log'
import MapController from './MapController'


class ViewingEventStore extends Capsule {
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

	cacheRef = new Event()
	capsulePost = "/event/updateField"

	@observable loaded = false

	async getEvent(eventUuid) {
		Log.debug("Getting event: " + JSON.stringify(eventUuid))
		this.loaded = false
		this.cacheRef = await EventCache.getItem(eventUuid)

		this.loadEventFromCache(this.cacheRef)
	}

	@action loadEventFromCache(resp) {
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

	}

	addEventToList(listName) {
		var data = {
			userUuid: AuthStore.userUuid,
			field: listName,
			value: this.eventUuid,
		}

		AxiosStore.ax.post("/user/addEventToList", data)
	}

	prepCapsule(field, value) {
		return {
			eventUuid: this.eventUuid,
			field: field,
			value: this[field],
		}
	}

}


class UserList {
	@observable uuids = []
	@observable names = []
	@observable pics = []

}


const singleton = new ViewingEventStore()
export default singleton
