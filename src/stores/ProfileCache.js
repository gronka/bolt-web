import { action, computed, observable } from 'mobx'

import Cache from './lib/Cache'
import EventListCache from './EventListCache'


class ProfileCache extends Cache {
}


export class Profile {
	@observable userUuid = ""
	@observable fullname = ""
	@observable about = ""
	@observable status = ""

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

	@action setFullname(p) {
		this.fullname = p
	}
	@computed get getFullname() {
		return this.fullname
	}
	
	@action unpackItemFromApi(body) {
		this.userUuid = body.userUuid
		this.fullname = body.fullname
		this.about = body.about
		this.status = body.status

		EventListCache.setEventList(this.adminEventListKey, body.adminEventUuids)
		EventListCache.setEventList(this.sharedEventListKey, body.sharedEventUuids)
		EventListCache.setEventList(this.slatedEventListKey, body.slatedEventUuids)
	}

}


const singleton = new ProfileCache(Profile, "/user/get/")
export default singleton
