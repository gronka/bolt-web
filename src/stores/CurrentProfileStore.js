import { computed, observable, action } from 'mobx'
import AxiosStore from './AxiosStore'

import EventListCache from './EventListCache'


class CurrentProfileStore {
	@observable userUuid = "userUuidNS"
	@observable fullname = "fullnameNS"
	status = "stateNotSet"

	getKey(name) {
		return EventListCache.makeKey(this.userUuid, name)
	}

	@computed get sharedEventListKey() {
		return EventListCache.makeKey(this.userUuid, "shared")
	}

	@computed get slatedEventListKey() {
		return EventListCache.makeKey(this.userUuid, "slated")
	}

	fetchProfile(userUuid) {
		this.status = "fetchProfile"
		AxiosStore.ax.get("/user/get/" + userUuid)
		.then((resp) => {
			this.unpackProfileFromApi(resp.data.b)
			this.setStatus("ready")
		})
	}

	setStatus(status) {
		this.status = status
	}

	@action unpackProfileFromApi(data) {
		this.userUuid = data.userUuid
		this.fullname = data.fullname
		EventListCache.setEventList(this.sharedEventListKey, data.sharedEventUuids)
		EventListCache.setEventList(this.slatedEventListKey, data.slatedEventUuids)
	}

}


const singleton = new CurrentProfileStore()
export default singleton
