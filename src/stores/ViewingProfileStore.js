import { action, computed, observable } from 'mobx'

import AuthStore from './AuthStore'
import Capsule from './lib/Capsule'
import ProfileCache, { Profile } from './ProfileCache'
import Log from '../Log'


class ViewingProfileStore extends Capsule {
	@observable userUuid = "userUuidNS"
	@observable fullname = "fullnameNS"
	@observable about = "aboutNS"
	cacheRef = new Profile()
	capsulePost = "/user/updateField"

	isProfileCurrentUser(profileUuid) {
		// TODO: basically assume that if url is '/profile' then give edit access
		if (profileUuid == null) {
			profileUuid = AuthStore.userUuid
		} 
		if (profileUuid === AuthStore.userUuid) {
			return true
		}
		return false
	}

	getKey(name) {
		return this.cacheRef.getKey(name)
	}

	userIsAdminOfEvent(eventUuid) {
		return this.cacheRef.userIsAdminOfEvent(eventUuid)
	}

	// TODO: update values in the cacheRef as well
	@action setFullname(p) {
		this.fullname = p
	}
	@computed get getFullname() {
		return this.fullname
	}

	async getProfile(userUuid) {
		Log.debug("Getting profile: " + JSON.stringify(userUuid))
		this.cacheRef = await ProfileCache.getItem(userUuid)

		this.userUuid = this.cacheRef.userUuid
		this.fullname = this.cacheRef.fullname
		this.about = this.cacheRef.about
		this.status = this.cacheRef.status
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
