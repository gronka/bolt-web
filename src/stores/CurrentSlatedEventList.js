import { observable, action } from 'mobx'

import AxiosStore from './AxiosStore'


class EventListStore {
	// TODO: cache different events that are pulled
	@observable events = []
	@observable editMode = false

	@action updateEvents(events) {
		this.events = JSON.parse(JSON.stringify(events))
	}

	@action getInitialEvents() {
		AxiosStore.ax.get("/events")
		.then((resp) => {
			if (resp.status === 200) {
				this.updateEvents(resp.data.m)
			}
		})

	}

}


const singleton = new EventListStore()
export default singleton
