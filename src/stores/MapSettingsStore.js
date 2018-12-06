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
