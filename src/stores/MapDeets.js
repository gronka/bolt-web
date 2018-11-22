// Avoid performing logic in deets; use the map controller for logic, and deets
// for state
export class MapDeets {

	//	name: key for storage and lookup
	name = ""
	//	type: type of map for loading other settings
	type = "typeNS"
	//	mapDivName: dom element ref for map rendering
	mapDivName = "mapDivNameNS"
	//	listeners: list of str designating which listeners this map uses
	listeners = []

	markers = []
		
	lat = 35.7796
	lng = -78.6382
	center = "centerNS"

	constructor(opts) {
		this.name = opts.name
		this.type = opts.type
		this.mapDivName = opts.mapDivName
	}

}
