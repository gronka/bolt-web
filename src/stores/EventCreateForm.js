import { computed, observable, action } from 'mobx'

import AxiosStore from './AxiosStore'
import AuthStore from './AuthStore'
import FlashStore from './FlashStore'
import MapController from './MapController'
import { isFloat, Loc, round } from '../helpers'
import { validateByName } from '../validation'


class EventCreateForm {
	@observable title = ''
	@observable venue = ''
	@observable customLatLngEnabled = false
	@observable lat = "0"
	@observable lng = "0"
	@observable address = ""
	@observable googleLoc = new Loc("", 0, 0)

	@observable startDate = ''
	@observable endDate = ''
	@observable description = ''
	@observable quickInfo = ''
	@observable phone = ''

	@action setTitle(p) {
		this.title = p
	}
	@computed get getTitle() {
		return this.title
	}
	@computed get validateTitle() {
		return validateByName("Title", this.title)
	}

	@action setVenue(p) {
		this.venue = p
	}
	@computed get getVenue() {
		return this.venue
	}
	@computed get validateVenue() {
		return validateByName("Venue", this.venue)
	}

	@action setLocWithGoogleLoc(loc) {
		loc.lat = round(loc.lat, 5)
		loc.lng = round(loc.lng, 5)
		
		this.googleLoc.lat = loc.lat
		this.googleLoc.lng = loc.lng
		this.googleLoc.address = loc.address

		this.setLat(loc.lat)
		this.setLng(loc.lng)
		this.setAddress(loc.address)

		MapController.panToLatLng(loc.lat, loc.lng)
		MapController.updateUnaryMarker({"lat": loc.lat,
																		"lng": loc.lng})
	}

	updateMarkerWithCustomLatLng() {
		MapController.panToLatLng(this.lat, this.lng)
		MapController.updateUnaryMarker({"lat": this.lat,
																		"lng": this.lng})
	}

	@computed get locEqualsGoogleLoc() {
		var latDiff = Math.abs(this.lat - this.googleLoc.lat)
		var lngDiff = Math.abs(this.lng - this.googleLoc.lng)

		// .001 latdiff is about 6 ft
		// TODO: ensure .0002 is good enough
		if (latDiff < .0002 && lngDiff < .0002 && 
				this.address === this.googleLoc.address) {
			return true
		} else {
			return false
		}
	}

	@action setAddress(p) {
		this.address = p
	}
	@computed get getAddress() {
		return this.address
	}
	@computed get validateAddress() {
		return validateByName("Address", this.address)
	}

	@action customLatLngToggle() {
		this.customLatLngEnabled = !this.customLatLngEnabled
	}

	@action setLat(p) {
		if (isFloat(p)) {
			this.lat = p
		}
	}
	@computed get getLat() {
		return this.lat
	}
	@computed get validateLat() {
		return validateByName("Latitude", this.lat)
	}

	@action setLng(p) {
		if (isFloat(p)) {
			this.lng = p
		}
	}
	@computed get getLng() {
		return this.lng
	}
	@computed get validateLng() {
		return validateByName("Longitude", this.lng)
	}

	@action setStartDate(p) {
		this.startDate = new Date(p)
	}
	@computed get getStartDate() {
		return this.startDate
	}

	@action setEndDate(p) {
		this.endDate = new Date(p)
	}
	@computed get getEndDate() {
		return this.endDate
	}

	@action setDescription(p) {
		this.description = p
	}
	@computed get getDescription() {
		return this.description
	}

	@action setQuickInfo(p) {
		this.quickInfo = p
	}
	@computed get getQuickInfo() {
		return this.quickInfo
	}

	@action setPhone(p) {
		this.phone = p
	}
	@computed get getPhone() {
		return this.phone
	}

	validateSubmit(data) {
		// TODO: fill out tests, create flash messages
		if (isNaN(data.lat) || isNaN(data.lng)) {
			return "Latitude and longitude must be numbers."
		}

		if (isNaN(data.startTimeUnix) || isNaN(data.endTimeUnix)) {
			return "Start and end times must be numbers."
		}

		var error = this.validateTitle
		if (error) {
			return error
		}
		error = this.validateVenue
		if (error) {
			return error
		}
		error = this.validateAddress
		if (error) {
			return error
		}
		error = this.validateLat
		if (error) {
			return error
		}
		error = this.validateLng
		if (error) {
			return error
		}

		// TODO: more errors/flash messags could be returned by the server

		return true

	}

	submit() {
		var data = {
			"title": this.title,
			"venue": this.venue,
			"lat": parseFloat(this.lat),
			"lng": parseFloat(this.lng),
			"address": this.address,
			"startTimeUnix": (this.startDate.getTime() / 1000),
			"endTimeUnix": (this.endDate.getTime() / 1000),
			"description": this.description,
			"quickInfo": this.quickInfo,
			"phone": this.phone,
			"userUuid": AuthStore.userUuid,
		}

		var error = this.validateSubmit(data)
		FlashStore.addFlash(error, "error")

		AxiosStore.ax.post("/event/create", data)
	}
}


const singleton = new EventCreateForm()
export default singleton
