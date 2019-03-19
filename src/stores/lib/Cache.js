import { action, observable } from 'mobx'

import AxiosStore from '../AxiosStore'


// REQUIREMENTS:
// items being cached must have the function setAllFromApi defined
export default class Cache {
	@observable cachedItems = {}
	@observable querying = []

	constructor(itemClass, getUrl) {
		// itemClass is the class of items which will be cached
		this.itemClass = itemClass
		this.getUrl = getUrl
	}

	@action getItem(uuid) {
		if (this.cachedItems[uuid] == null) {
			// TODO: store time retrieved, update if cached item is old
			this.cachedItems[uuid] = new this.itemClass()
			this.getItemFromApi(uuid)
		} 
		return this.cachedItems[uuid]
	}

	@action getItemFromApi(uuid) {
		// Make sure item isn't being queried
		var queryingIdx = this.querying.indexOf(uuid)
		if (queryingIdx > -1) {
			return
		}

		// note that item is being queried
		this.querying.push(uuid)
		AxiosStore.ax.get(this.getUrl + uuid)
		.then((resp) => {
			if (resp.status === 200) {
				this.loadItemFromApi(resp, uuid)
			}
		})
	}

	@action loadItemFromApi(resp, uuid) {
		// TODO: can this be handled better?
		if (resp.data.b !== undefined) {
			var body = JSON.parse(JSON.stringify(resp.data.b))
			this.cachedItems[uuid].setAllFromApi(body)
		} else {
			// TODO: can this be logged better?
			console.log(uuid + " did not return correctly formatted data")
		}
		this.stopQuerying(uuid)
	}

	stopQuerying(uuid) {
		var idx = this.querying.indexOf(uuid)
		if (idx !== -1) {
			this.querying.splice(idx)
		}
	}

}
