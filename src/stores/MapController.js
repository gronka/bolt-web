import { observable, action } from 'mobx'
//import AxiosStore from './AxiosStore'

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
	@observable activeMap = "activeMapNS"

	constructor(opts) {
		this.google = "googleNS"

		this.map = "mapNS"
		this.listenerTypes = ["center_changed", "click"]

		this.markers = []
		// actually set in init
		this.unaryMarker = null
		this.deets = "deetsNS"

		this.mapTypes = {
			landing: {
				listeners: ["center_changed_get_tacs"],
				names: ["landing", "events", "food", "open"],
			},
			eventCreate: {
				listeners: ["create_tac_on_address_change"],
			},
			eventPage: {
				listeners: [],
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
		this.unaryMarker = this.returnEmptyMarker()
		var mapDiv = document.getElementById("gmapContainer")
		this.map = new this.google.maps.Map(mapDiv, {
			center: this.defaultCenter,
			zoom: 15,
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

		if (this.map === "mapNS") {
			this.initMap()
		}

		if (MapSettingsStore.maps[name] != null) {
			return
		}

		this.deets = new MapDeets()
		this.deets.type = type
		this.deets.mapDivName = mapDivName
		this.deets.center = center

		if (type === "landing") {
			if (MapSettingsStore.maps["landing"] == null) {
				for (var i=0; i<this.mapTypes.landing.names.length; i++) {
					let clone = Object.assign( Object.create( Object.getPrototypeOf(this.deets)), 
																		this.deets)
					clone.name = this.mapTypes.landing.names[i]
					MapSettingsStore.maps[clone.name] = clone

				}
			}
		} else {
				this.deets.name = name
				MapSettingsStore.maps[name] = this.deets
		}

		//this.resetMap()
		//this.loadMapFromSettings(name)

	}

	returnEmptyMarker() {
		var emptyMarker = new this.google.maps.Marker({
			map: null,
			position: {lat: 0, lng: 0},
			title: 'emptyMarker'
		})
		return emptyMarker
	}

	propagateMapType(type, settings) {
		if (type === "landing") {

		}
	}

	addCenterChangedGetTacsListener() {
		this.google.maps.event.addListener(this.map, 
																			 'center_changed', 
																			 debounce(function() {
			if ( true ) {
				// TODO: replace true with a test if freeze box is not checked
				//this.map.getTacsInBounds();
			}
		}, 400));
	}

	addCreateTacOnRightClickListener() {
		this.google.maps.event.addListener(this.map, 
																			 'rightclick', 
																			 function(e) {
			//var cursorLatLng = e.latLng;
			if (this.markerFromRightclick != null) {
				this.markerFromRightclick.setMap(null);
				this.markerFromRightclick = null;
			}
			//markerFromRightclick = new google.maps.Marker({
				//position: cursorLatLng,
				//icon: inactiveMarkerIcon,
				//map: map
			//})
			//markerFromRightclick.setMap(map);
			//infowindowFromRightclick.open(map, markerFromRightclick);
																			 })
	}

	//
	// Functions for clearing map
	//
	resetMap() {
		this.clearAllListeners()
		MapSettingsStore.maps[this.activeMap].reset()
		this.loadMapFromDeets(this.activeMap)
		this.unaryMarker.setMap(null)
	}

	clearAllListeners() {
		for (var i=0; i < this.listenerTypes.length; i++) {
			this.google.maps.event.clearListeners(this.map, this.listenerTypes[i])
		}
	}

	@action changeMap(name) {
		// TODO TODO: back up map settings here, stop storing in other places
		//currentMap = this.MapSettingsStore.maps[name]
		//currentMap.lat = this.lat
		//currentMap.lng = this.lng

		if (this.google !== "googleNS") {
			//if (this.activeMap !== name) {
				this.activeMap = name
				this.resetMap()
				if (MapSettingsStore.maps[name] != null) {
					//alert("map found")
					this.loadMapFromDeets(name)
				} else {
					//alert("map missing from store")
				}
			//}
		}
	}

	//
	// Functions for loading a map
	//
	loadMapFromDeets(name) {
		// TODO: load from deets instead
		this.deets = MapSettingsStore.maps[name]

		this.activeMap = this.deets.name

		var mapTargetDiv = document.getElementsByClassName(stg.mapDivName)[0]
		var mapContainer = this.map.getDiv()

		//mapContainer.parentNode.removeChild(mapContainer)
		mapTargetDiv.appendChild(mapContainer)

		//	listeners: list of str designating which listeners this map uses
		var listeners = this.mapTypes[stg.type]["listeners"]

		for (var i=0; i < listeners.length; i++) {
			var listener = listeners[i]
			if (listener === "center_changed_get_tacs") {
				this.addCenterChangedGetTacsListener()
			}

			if (listener === "create_tac_on_right_click") {
				this.addCreateTacOnRightClickListener()
			}

			// TODO: add more of these
		}

	}

	//
	// Functions for map actions
	//
	panToLatLng(lat, lng) {
		lat = parseFloat(lat)
		lng = parseFloat(lng)
		this.map.panTo({"lat": lat, "lng": lng})
	}

	panToMarker(p) {
		var lat = parseFloat(p.lat)
		var lng = parseFloat(p.lng)
		this.map.panTo({"lat": lat, "lng": lng})
	}

	updateUnaryMarker(p) {
		var lat = parseFloat(p.lat)
		var lng = parseFloat(p.lng)

		this.unaryMarker.setMap(null)
		this.unaryMarker = new this.google.maps.Marker({
			map: this.map,
			position: {lat: lat, lng: lng},
		})
	}


}


class MapDeets {
	name = ""
	lat = 35.7796
	lng = -78.6382
	type = "typeNS"
	mapDivName = "mapDivNameNS"
	map = "mapNS"
	markers = []
	unaryMarker = null

	reset() {
		this.markers = []
		this.unaryMarker = null
	}


	placeTacs() {
		
	}

}


class GMapController {

}


const singleton = new MapController()
export default singleton
