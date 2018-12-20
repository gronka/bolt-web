import { computed, observable, action } from 'mobx'
import AxiosStore from './AxiosStore'

import EventListCache from './EventListCache'


class CurrentProfileStore {
	@observable userUuid = "userUuidNS"
	@observable fullname = "fullnameNS"
	@observable about = "aboutNS"
	status = "stateNotSet"

	getKey(name) {
		return EventListCache.makeKey(this.userUuid, name)
	}
	
	@computed get adminEventListKey() {
		return EventListCache.makeKey(this.userUuid, "admin")
	}

	@computed get sharedEventListKey() {
		return EventListCache.makeKey(this.userUuid, "shared")
	}

	@computed get slatedEventListKey() {
		return EventListCache.makeKey(this.userUuid, "slated")
	}

	userIsAdminOfEvent(eventUuid) {
		const adminList = EventListCache.getEventList(this.adminEventListKey)
		for (var i=0; i<adminList.uuids.length; i++) {
			if (eventUuid === adminList.uuids[i]) {
				return true
			}
		}
		return false
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
		EventListCache.setEventList(this.adminEventListKey, data.adminEventUuids)
		EventListCache.setEventList(this.sharedEventListKey, data.sharedEventUuids)
		EventListCache.setEventList(this.slatedEventListKey, data.slatedEventUuids)
	}

	saveFieldToDb(field, value) {
		// TODO: use this field for creating an authorization failure test.
		//userUuid: "00000000-0000-0000-0000-000000000003",
		var data = {
			userUuid: this.userUuid,
			field: field,
			value: this[field],
		}
		AxiosStore.ax.post("/user/updateField", data)
	}

}


const singleton = new CurrentProfileStore()
export default singleton
