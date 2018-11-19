import { observable, action } from 'mobx'
import AxiosStore from './AxiosStore'


class CurrentEventStore {
	@observable userUuid = "userUuidNS"
	@observable fullname = "fullnameNS"
	status = "stateNotSet"

	fetchEvent(eventUuid) {
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
		this.title = data.title
	}

}


const singleton = new CurrentEventStore()
export default singleton
