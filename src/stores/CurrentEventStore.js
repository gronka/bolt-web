import { observable, action } from 'mobx'
import AxiosStore from './AxiosStore'

import MapController from './MapController'


class CurrentEventStore {
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
		AxiosStore.ax.get("/event/get/" + eventUuid)
		.then((resp) => {
			this.unpackEventFromApi(resp.data.b)
			this.setStatus("ready")
		})
	}

	setStatus(status) {
		this.status = status
	}

	@action unpackEventFromApi(data) {
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

		var marker = {
			"lat": this.lat,
			"lng": this.lng,
		}
		MapController.updateUnaryMarker(marker)
		MapController.panToMarker(marker)
	}

}


const singleton = new CurrentEventStore()
export default singleton
