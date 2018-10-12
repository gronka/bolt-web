import { observable, action } from 'mobx'

import AxiosStore from './AxiosStore'


class MapStore {
	@observable activeMap = "events"
	@observable userLat = 35.7796
	@observable userLng = -78.6382
	@observable markers = {
		"events": [
			{
				"tacid": "01234",
				"lat": 59.95,
				"lng": 30.33,
				"startTimeUnix": 1234908234338,
				"endTimeUnix": 47389147231908,
			},

		],
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

	@action getTacs() {
		// TODO: detect lat and lng, then guess it. For now, it's Raleigh
		//let data = {
			//"lat": this.userLat,
			//"lng": this.userLng,
		//}
		// TODO: change this to /events/tacs or w.e it will be
		let path = "/events"


		//AxiosStore.ax.get(path)
			//.then((resp) => {
					//this.markers[this.activeMap] = resp.data["m"]
					//alert(JSON.stringify(resp.data["m"]))
					//alert(JSON.stringify(resp.data))
			//})

		let tacs = [
			{
				"tacid": "01234",
				"lat": 59.95,
				"lng": 30.33,
				"startTimeUnix": 1234908234338,
				"endTimeUnix": 47389147231908,
			}

		]

		this.markers.events = tacs
	}

	placeTacs() {
		

	}

}


const singleton = new MapStore()
export default singleton
