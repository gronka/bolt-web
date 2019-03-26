import AxiosStore from '../AxiosStore'
import Log from '../../Log'


// REQUIREMENTS:
// items being cached must have the function unpackItemFromApi defined
export default class Cache {
	cachedItems = {}
	cachedTimes = {}

	constructor(itemClass, getUrl) {
		// itemClass is the class of items which will be cached
		this.itemClass = itemClass
		this.getUrl = getUrl
	}

	setItem(uuid, item) {
		this.cachedItems[uuid] = item
		this.cachedTimes[uuid] = Date.now()
	}

	async getItem(uuid) {
		if (this.cachedItems[uuid] == null) {
			// TODO: store time retrieved, update if cached item is old
			this.cachedItems[uuid] = new this.itemClass()
			var waitToComplete = await this.getItemFromApi(uuid)
		} 
		return this.cachedItems[uuid]
	}

	async getItemFromApi(uuid) {
		var resp = await AxiosStore.ax.get(this.getUrl + uuid)
		if (resp.status === 200) {
			this.unpackResponse(resp, uuid)
		} else {
			Log.warn(uuid + " returned response status " + resp.status)
		}
	}

	unpackResponse(resp, uuid) {
		// TODO: can this be handled better?
		if (resp.data.b !== undefined) {
			var body = JSON.parse(JSON.stringify(resp.data.b))
			this.cachedItems[uuid].unpackItemFromApi(body)
			this.cachedTimes[uuid] = Date.now()
		} else {
			Log.warn(uuid + " did not return correctly formatted data")
		}
	}

}
