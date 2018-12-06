import { observable, action } from 'mobx'

import CPS from './CurrentProfileStore'
import EventCache from './EventCache'


class CurrentSharedEventList {
	// TODO: cache different events that are pulled
	@observable events = {}
	@observable eventUuids = []
	@observable editMode = false
	@observable forceUpdate = false

	@action updateEvents(events) {
		this.events = JSON.parse(JSON.stringify(events))
	}

	@action getInitialEvents() {
		this.eventUuids = CPS.sharedEvents
		for (var i=0; i<this.eventUuids.length; i++) {
			var id = this.eventUuids[i]
			EventCache.getEvent(id)

		}
	}

	@action remove(eventUuid) {
		var idx = this.eventUuids.indexOf(eventUuid)
		if (idx > -1) {
			this.eventUuids.splice(idx, 1)
		}
	}

	@action moveUp(eventUuid) {
		var idx = this.eventUuids.indexOf(eventUuid)
		if (idx === -1 || idx === 0) {
			// do nothing
		} else {
			var dontForget = this.eventUuids[idx-1]
			this.eventUuids[idx-1] = this.eventUuids[idx]
			this.eventUuids[idx] = dontForget
		} 
	}

	@action moveDown(eventUuid) {
		var idx = this.eventUuids.indexOf(eventUuid)
		if (idx === -1 || idx === (this.eventUuids.length-1)) {
			// do nothing
		} else {
			var dontForget = this.eventUuids[idx+1]
			this.eventUuids[idx+1] = this.eventUuids[idx]
			this.eventUuids[idx] = dontForget
		} 
	}

}


const singleton = new CurrentSharedEventList()
export default singleton
