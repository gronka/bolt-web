//import AxiosStore from './AxiosStore'
import { debounce } from '../helpers'
import MapSettingsStore from './MapSettingsStore'


var defaultLat = -25.363
var defaultLng = 131.044


// Don't store state in the map controller - store state in deets, and make
// changes to deets directly
class MapController {
	constructor(opts) {
		this.google = "googleNS"
		this.map = "mapNS"

		this.deets = MapSettingsStore.deets["events"]

		this.listenerTypes = ["bounds_changed", "click"]
		this.mapTypes = {
			landing: {
				listeners: ["bounds_changed_get_tacs"],
				names: ["landing", "events", "food", "open"],
			},
			eventCreate: {
				listeners: ["create_tac_on_address_change", 
					"create_tac_on_right_click"],
			},
			eventPage: {
				listeners: [],
			},
		}

	}

	storeGoogleRef(google) {
		this.google = google
	}

	initMap(deets={}) {
		var mapDiv = document.getElementById("gmapContainer")
		this.map = new this.google.maps.Map(mapDiv, {
			center: {lat: defaultLat, lng: defaultLng},
			zoom: 15,
		})
	}

	createMap(deets) {
		if (this.map === "mapNS") {
			this.initMap()
		}
		if (MapSettingsStore.deets[deets.name] != null) {
			this.deets = MapSettingsStore.deets[deets.name]
			return
		}

		if (deets.center == null) {
			// default center
			deets.center = {lat: defaultLat, lng: defaultLng}
		}

		MapSettingsStore.deets[deets.name] = deets
	}

	addBoundsChangedGetTacsListener() {
		this.google.maps.event.addListener(
			this.map, 
			'bounds_changed', 
			debounce(() => {
				this.getTacsInBounds()}, 400)
		)
	}

	addCreateTacOnRightClickListener() {
		this.google.maps.event.addListener(
			this.map, 
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
	resetMap(name) {
		this.deleteAllListeners()
		this.deleteMarkers()
	}

	deleteAllListeners() {
		for (var i=0; i < this.listenerTypes.length; i++) {
			this.google.maps.event.clearListeners(this.map, this.listenerTypes[i])
		}
	}

	changeMap(name) {
		if (this.google !== "googleNS") {
			this.resetMap()
			
			if (MapSettingsStore.deets[name] != null) {
				//alert("map found")
				this.loadMapFromDeets(name)
			} else {
				alert("map missing from store")
			}
		}

	}

	//
	// Functions for loading a map
	//
	loadMapFromDeets(name) {
		this.deets = MapSettingsStore.deets[name]

		var mapTargetDiv = document.getElementsByClassName(this.deets.mapDivName)[0]
		var mapContainer = this.map.getDiv()

		//mapContainer.parentNode.removeChild(mapContainer)
		mapTargetDiv.appendChild(mapContainer)

		if (this.deets.type === "eventCreate") {
			this.initUnaryMarker()
		}
		if (this.deets.type === "eventPage") {
			this.initUnaryMarker()
		}

		//	listeners: list of str designating which listeners this map uses
		var listeners = this.mapTypes[this.deets.type]["listeners"]

		for (var i=0; i < listeners.length; i++) {
			var listener = listeners[i]
			if (listener === "bounds_changed_get_tacs") {
				this.addBoundsChangedGetTacsListener()
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

	panToPoint(p) {
		var lat = parseFloat(p.lat)
		var lng = parseFloat(p.lng)
		this.map.panTo({"lat": lat, "lng": lng})
	}

	//
	// Functions for marker actions
	//
	updateMarkersByType(type, point) {
		var lat = parseFloat(point.lat)
		var lng = parseFloat(point.lng)

		var markers = this.getMarkersOfType(type)
		for (var i=0; i<markers.length; i++) {
			markers[i].gm.setMap(null)
			markers[i].gm = new this.google.maps.Marker({
				map: this.map,
				position: {lat: lat, lng: lng},
			})
		}
	}

	getMarkersOfType(type) {
		var markers = []
		for (var i=0; i<this.deets.markers.length; i++) {
			if (this.deets.markers[i].type === type) {
				markers.push(this.deets.markers[i])
			}
		}
		return markers
	}

	deleteMarkers() {
		var markers = this.deets.markers
		for (var i=0; i<markers.length; i++) {
			markers[i].gm.setMap(null)
		}
		this.deets.markers = []
	}

	hideMarkers() {
		var markers = this.deets.markers
		for (var i=0; i<markers.length; i++) {
			markers[i].gm.setMap(null)
		}
	}

	initUnaryMarker() {
		this.deets.markers.push(new Marker({
			"type": "unary",
			"gm": this.returnEmptyMarker(),
		}))

	}

	returnEmptyMarker() {
		var emptyMarker = new this.google.maps.Marker({
			map: null,
			position: {lat: 0, lng: 0},
			title: 'emptyMarker'
		})
		return emptyMarker
	}

	//
	// Functions for Tac management
	//
	getTacsInBounds() {
		if ( this.map !== "mapNS" ) {
			// TODO: replace true with a test if freeze box is not checked
			if (this.map.getBounds() == null) {
				return
			}

			var bounds = this.map.getBounds()
			var ne = bounds.getNorthEast()
			var sw = bounds.getSouthWest()
			let data = {
				"ne": ne, 
				"sw": sw,
			}
			//alert(JSON.stringify(data))

			//AxiosStore.ax.get(path)
				//.then((resp) => {
						//this.markers[this.activeMap] = resp.data["m"]
				//})
			//this.markers.events = tacs
			//var marker = new this.google.maps.Marker({
				//map: this.maps[this.name],
				//position: {lat: -25.363, lng: 131.044},
				//title: 'Hello World!'
			//});
		}
	}

}


class Marker {
	type = "typeNS"
	gm = "gmNS"

	constructor(opts) {
		this.type = opts.type
		this.gm = opts.gm
	}
}


const singleton = new MapController()
export default singleton
