import { computed, observable } from 'mobx'

import ProfileCache from './ProfileCache'
import Capsule from './lib/Capsule'


class ViewingProfileStore extends Capsule {
	@observable userUuid = "userUuidNS"
	@observable fullname = "fullnameNS"
	@observable about = "aboutNS"
	@observable cacheRef = "cacheRefNS"
	capsulePost = "/user/updateField"

	getKey(name) {
		return this.cacheRef.getKey(name)
	}
	
	@computed get adminEventListKey() {
		return this.cacheRef.adminEventListKey()
	}

	@computed get sharedEventListKey() {
		return this.cacheRef.sharedEventListKey()
	}

	@computed get slatedEventListKey() {
		return this.cacheRef.slatedEventListKey()
	}

	userIsAdminOfEvent(eventUuid) {
		return this.cacheRef.userIsAdminOfEvent(eventUuid)
	}

	getProfile(userUuid) {
		this.cacheRef = ProfileCache.getItem(this.userUuid)
	}

	prepCapsule(field, value) {
		var data = {
			userUuid: this.userUuid,
			field: field,
			value: this[field],
		}

		return data
	}

}


const singleton = new ViewingProfileStore()
export default singleton
