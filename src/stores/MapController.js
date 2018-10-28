import { observable, action } from 'mobx'
import AxiosStore from './AxiosStore'

import { debounce } from '../helpers'
import MapSettingsStore from './MapSettingsStore'


	//loadedMarkers = {
		//"events": [
			//{
				//"tacid": "01234",
				//"lat": -25.363,
				//"lng": 131.044,
				//"startTimeUnix": 1234908234338,
				//"endTimeUnix": 47389147231908,
			//},

		//],
		//"food": {},
		//"open": {},
	//}

class MapController {
	@observable activeMap = "activeMapNotSet"

	constructor(opts) {
		this.google = "googleNotSet"

		this.map = "mapNotSet"
		this.listenerTypes = ["center_changed", "click"]

		this.mapTypes = {
			landing: {
				listeners: ["center_changed_get_tacs"],
				names: ["landing", "events", "food", "open"],
			},
			eventCreate: {
				listeners: [""],
			},
		}

		// for debugging
		this.defaultCenter = {
			lat: -25.363,
			lng: 131.044,
		}

	}

	storeGoogleRef(google) {
		this.google = google
	}

	initMap(opts) {
		var mapDiv = document.getElementById("gmapContainer")
		this.map = new this.google.maps.Map(mapDiv, {
			center: this.defaultCenter,
			zoom: 11,
		})
	}

	createMap(opts) {
		// opts: 
		//	name: key for storage and lookup
		var name = opts.name

		//	mapDivName: dom element ref for map rendering
		var mapDivName = opts.mapDivName

		//	type: type of map for loading other settings
		var type = opts.type

		//	center: list of str designating which listeners this map uses
		var center = opts.center || this.defaultCenter

		if (this.map === "mapNotSet") {
			this.initMap()
		}

		if (MapSettingsStore.maps[name] != null) {
			return
		}

		var settings = new MapSettings()
		settings.type = type
		settings.mapDivName = mapDivName
		settings.center = center

		if (type === "landing") {
			if (MapSettingsStore.maps["landing"] == null) {
				for (var i=0; i<this.mapTypes.landing.names.length; i++) {
					let clone = Object.assign( Object.create( Object.getPrototypeOf(settings)), 
																		settings)
					clone.name = this.mapTypes.landing.names[i]
					MapSettingsStore.maps[clone.name] = clone

				}
			}
		} else {
				settings.name = name
				MapSettingsStore.maps[name] = settings
		}

		//this.resetMap()
		//this.loadMapFromSettings(name)

	}

	propagateMapType(type, settings) {
		if (type === "landing") {

		}
	}

	addCenterChangedGetTacsListeners() {
		this.google.maps.event.addListener(this.map, 
																			 'center_changed', 
																			 debounce(function() {
			if ( true ) {
				// TODO: replace true with a test if freeze box is not checked
				this.map.getTacsInBounds();
			}
		}, 400));
	}

	//
	// Functions for clearing map
	//
	resetMap() {
		this.clearAllListeners()
	}

	clearAllListeners() {
		for (var i=0; i < this.listenerTypes.length; i++) {
			this.google.maps.event.clearListeners(this.map, this.listenerTypes[i])
		}
	}

	@action changeMap(name) {
		if (this.google !== "googleNotSet") {
			//if (this.activeMap !== name) {
				this.activeMap = name
				this.resetMap()
				if (MapSettingsStore.maps[name] != null) {
					//alert("map found")
					this.loadMapFromSettings(name)
				} else {
					//alert("map missing from store")
				}
			//}
		}
	}

	//
	// Functions for loading a map
	//
	loadMapFromSettings(name) {
		var stg = MapSettingsStore.maps[name]

		this.activeMap = stg.name

		var mapTargetDiv = document.getElementsByClassName(stg.mapDivName)[0]
		var mapContainer = this.map.getDiv()

		//mapContainer.parentNode.removeChild(mapContainer)
		mapTargetDiv.appendChild(mapContainer)

		//	listeners: list of str designating which listeners this map uses
		var listeners = this.mapTypes[stg.type]["listeners"]

		for (var i=0; i < listeners.length; i++) {
			var listener = listeners[i]
			if (listener === "center_changed_get_tacs") {
				this.addCenterChangedGetTacsListeners()
			}

			// TODO: add more of these
		}

	}

}


class MapSettings {
	name = "events"
	userLat = 35.7796
	userLng = -78.6382
	type = "typeNotSet"
	markers = []
	mapDivName = "mapDivNameNotSet"
	map = "mapNotSet"

	getTacsInBounds() {
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
			//})

		let tacs = [
			{
				"tacid": "01234",
				"lat": -25.363,
				"lng": 131.044,
				"startTimeUnix": 1234908234338,
				"endTimeUnix": 47389147231908,
			}

		]

		//this.markers.events = tacs
		var marker = new this.google.maps.Marker({
			map: this.maps[this.name],
			position: {lat: -25.363, lng: 131.044},
			title: 'Hello World!'
		});
	}

	placeTacs() {
		
	}

}


const singleton = new MapController()
export default singleton
