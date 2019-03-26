import { action, computed, observable } from 'mobx'

import AuthStore from './AuthStore'
import AxiosStore from './AxiosStore'
import Cache from './lib/Cache'
import EventCache from './EventCache'
import EventListCache, { EventList } from './EventListCache'


class EventListViewer {
	@observable uuid = "uuidNS"
	@observable uuids = ["00000000-0000-0000-0000-000000000003"]
	@observable editMode = false
	@observable type = "typeNS"
	@observable listName = "listNameNS"
	cacheRef = new EventList()

	getKey() {
		return this.type + "/" + this.listName + "/" +  this.uuid
	}

	async getEventList(type, listName, uuid) {
		this.editMode = false
		this.type = type
		this.uuid = uuid
		this.listName = listName

		this.cacheRef = await EventListCache.getItem(this.getKey())

		this.uuids = this.cacheRef.uuids

	}

	// TODO: update values in the cacheRef as well
	//@computed get uuids() {
		//return this.uuids
	//}

	@action clearEvents() {
		this.uuids = []
	}

	@action setUuids(p) {
		this.uuids = p
	}

	@action setStatus(p) {
		this.status = p
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
		// TODO: do not save if passed data not equal to cached data
		const listNameMap = {
			shared: "sharedEventUuids",
			slated: "slatedEventUuids",
		}

		var data = {
			userUuid: AuthStore.userUuid,
			field: listNameMap[listName],
			value: this.uuids,
		}

		AxiosStore.ax.post("/user/saveList", data)
	}

}


const EventListViewerOne = new EventListViewer()
const EventListViewerTwo = new EventListViewer()
export { EventListViewerOne, EventListViewerTwo }
