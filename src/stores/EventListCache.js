import AuthStore from './AuthStore'
import AxiosStore from './AxiosStore'
import Cache from './lib/Cache'
import EventCache from './EventCache'


// EventLists are looked up with the following info
// types: user, group, business
// listNames: shared, slated, admin

class EventListCache extends Cache {
	setFromProfile(userUuid, body) {
		var adminEventList = new EventList()
		adminEventList.uuids = body.adminEventUuids
		this.setItem("user/admin/" + this.userUuid, body.adminEventUuids)

		var sharedEventList = new EventList()
		sharedEventList.uuids = body.sharedEventUuids
		this.setItem("user/shared/" + this.userUuid, body.sharedEventUuids)

		var slatedEventList = new EventList()
		slatedEventList.uuids = body.slatedEventUuids
		this.setItem("user/slated/" + this.userUuid, body.slatedEventUuids)

	}
	
}


export class EventList {
	uuids = ["00000000-0000-0000-0000-000000000003"]

	//unpackItemFromApi(body) {
		//this.uuids = body
	//}

}


const singleton = new EventListCache(EventList, "/eventList/get/")
export default singleton
