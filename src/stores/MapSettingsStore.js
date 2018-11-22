import {MapDeets} from './MapDeets'


class MapSettingsStore {
	constructor() {
		this.deets = {
			"events": new MapDeets({
				"name": "events",
				"type": "landing",
				"mapDivName": "landingMap",
			}),

			"food": new MapDeets({
				"name": "food",
				"type": "landing",
				"mapDivName": "landingMap",
			}),

			"open": new MapDeets({
				"name": "open",
				"type": "landing",
				"mapDivName": "landingMap",
			}),
		}

	}
}


const singleton = new MapSettingsStore()
export default singleton


	//getTacsInBounds() {
		//// TODO: detect lat and lng, then guess it. For now, it's Raleigh
		////let data = {
			////"lat": this.userLat,
			////"lng": this.userLng,
		////}
		//// TODO: change this to /events/tacs or w.e it will be
		//let path = "/events"

		////AxiosStore.ax.get(path)
			////.then((resp) => {
					////this.markers[this.activeMap] = resp.data["m"]
			////})

		//let tacs = [
			//{
				//"tacid": "01234",
				//"lat": -25.363,
				//"lng": 131.044,
				//"startTimeUnix": 1234908234338,
				//"endTimeUnix": 47389147231908,
			//}

		//]

		////this.markers.events = tacs
		//var marker = new this.google.maps.Marker({
			//map: this.maps[this.name],
			//position: {lat: -25.363, lng: 131.044},
			//title: 'Hello World!'
		//});
	//}
