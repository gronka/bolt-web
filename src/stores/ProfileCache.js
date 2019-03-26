import { action, computed, observable } from 'mobx'

import Cache from './lib/Cache'
import EventListCache from './EventListCache'


class ProfileCache extends Cache {
}


export class Profile {
	userUuid = ""
	fullname = ""
	about = ""
	status = ""

	// TODO update
	userIsAdminOfEvent(eventUuid) {
		const adminList = EventListCache.getEventList(this.adminEventListKey)
		for (var i=0; i<adminList.uuids.length; i++) {
			if (eventUuid === adminList.uuids[i]) {
				return true
			}
		}
		return false
	}

	
	unpackItemFromApi(body) {
		this.userUuid = body.userUuid
		this.fullname = body.fullname
		this.about = body.about
		this.status = body.status

		EventListCache.setFromProfile(this.userUuid, body)
	}

}


const singleton = new ProfileCache(Profile, "/user/get/")
export default singleton
