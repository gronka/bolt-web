import { observable, action } from 'mobx'

import axios from 'axios'

import { conf } from '../conf'


class MapStore {
	@observable activeMap = "events"
	@observable userLat = 35.7796
	@observable userLng = -78.6382
	@observable markers = {
		"events": {},
		"food": {},
		"open": {},
	}

	init() {
		let board = window.location.pathname.split("/")[1]
		this.changeMap(board)
	}

	@action changeMap(p) {
		if (this.activeMap !== p) {
			this.activeMap = p
			this.getTacs()
		}
	}

	getTacs() {
		// TODO: detect lat and lng, then guess it. For now, it's Raleigh
		//let data = {
			//"lat": this.userLat,
			//"lng": this.userLng,
		//}
		// TODO: change this to /events/tacs or w.e it will be
		let path = "/events"
		let url = `${conf["bapi"]}${path}`


		axios.get(url, {headers: {"X-Session-Token": "asdf"}})
			.then((resp) => {
					this.markers[this.activeMap] = resp.data["m"]
					//alert(JSON.stringify(this.markers[this.activeMap]))
			})

	}

}


const singleton = new MapStore()
export default singleton
