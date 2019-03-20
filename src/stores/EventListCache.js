import { observable, action } from 'mobx'

import AuthStore from './AuthStore'
import AxiosStore from './AxiosStore'
import EventCache from './EventCache'


class EventListCache {
	@observable lists = {}

	makeKey(uuid, name) {
		return uuid + "-" + name
	}

	@action setEventList(key, eventList) {
		if (this.lists[key] == null) {
			this.lists[key] = new EventList()
		} 
		this.lists[key].uuids = eventList
	}

	getEventList(key) {
		if (this.lists[key] == null) {
			// TODO: store time retrieved, update if cached item is old
			this.lists[key] = new EventList()
			//this.getEventListFromApi(uuid, name)
		} 
		return this.lists[key]
	}

	@action getEventListFromApi(key) {
		// TODO: is this function needed?
		alert("ended up getting event list from api")
		// Make sure event isn't being queried
		//var queryingIdx = this.querying.indexOf(eventUuid)
		//if (queryingIdx > -1) {
			//return
		//}

		//// note that event is being queried
		//this.querying.push(eventUuid)
		//AxiosStore.ax.get("/events/get/" + eventUuid)
		//.then((resp) => {
			//if (resp.status === 200) {
				//this.loadEventFromApi(resp, eventUuid)
			//}
		//})
	}

	@action loadEventFromApi(resp, eventUuid) {
		var body = JSON.parse(JSON.stringify(resp.data.b))
		this.events[eventUuid].setAllFromApi(body)
	}

}

class EventList {
	@observable uuids = ["00000000-0000-0000-0000-000000000003"]
	@observable editMode = false

	@action clearEvents() {
		this.uuids = []
	}

	@action getInitialEvents() {
		for (var i=0; i<this.uuids.length; i++) {
			var id = this.uuids[i]
			EventCache.getEvent(id)

		}
	}

	@action remove(uuid) {
		var idx = this.uuids.indexOf(uuid)
		if (idx > -1) {
			this.uuids.splice(idx, 1)
		}
	}

	@action moveUp(uuid) {
		var idx = this.uuids.indexOf(uuid)
		if (idx === -1 || idx === 0) {
			// do nothing
		} else {
			var dontForget = this.uuids[idx-1]
			this.uuids[idx-1] = this.uuids[idx]
			this.uuids[idx] = dontForget
		} 
	}

	@action moveDown(uuid) {
		var idx = this.uuids.indexOf(uuid)
		if (idx === -1 || idx === (this.uuids.length-1)) {
			// do nothing
		} else {
			var dontForget = this.uuids[idx+1]
			this.uuids[idx+1] = this.uuids[idx]
			this.uuids[idx] = dontForget
		} 
	}

	saveToDb(listName) {
		const listNameMap = {
			shared: "sharedEventUuids",
			slated: "slatedEventUuids",
		}

		var data = {
			userUuid: AuthStore.userUuid,
			field: listNameMap[listName],
			value: this.uuids,
		}
		//debugger

		AxiosStore.ax.post("/user/saveList", data)
	}

}


const singleton = new EventListCache()
export default singleton
