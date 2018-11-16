import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { InputRow } from '../pieces'
import GoogleMap from '../googleMap'
import { Loc } from '../../helpers'


@inject('EventCreateForm', 'MapController')
@observer
class EventCreate extends Component {
	constructor(props) {
		super(props)
		this.autocomplete = "autocompleteNotSet"
		this.autocompleteDivId = "autocomplete-address"
	}

	componentDidMount() {
		var div = document.getElementById(this.autocompleteDivId)
		this.autocomplete = new this.props.MapController.google.maps.places.Autocomplete(div, {types: ["address"]})
		this.autocomplete.addListener('place_changed', this.fillInAddress)
	}

	fillInAddress = e => {
		var place = this.autocomplete.getPlace()
		var googleLoc = new Loc(place.formatted_address, 
														place.geometry.location.lat(),
														place.geometry.location.lng())
		this.props.EventCreateForm.setLocWithGoogleLoc(googleLoc)
	}

  execEventCreate = () => this.props.EventCreateForm.submit()

	render() {
		return (
			<div className="two-col-simple__form"
				id="form-register">
				<h1>Register to follow events, or plan your own!</h1>

				<InputRow name="Title"
					store="EventCreateForm"
					getValue="getTitle"
					onChange="setTitle"
					validate="validateTitle"
				/>
				<InputRow name="Venue Name"
					store="EventCreateForm"
					getValue="getVenue"
					onChange="setVenue"
					validate="validateVenue"
				/>
				<InputRow name="Address"
					idOvrd={this.autocompleteDivId}
					store="EventCreateForm"
					getValue="getAddress"
					onChange="setAddress"
					validate="validateAddress"
					addClasses="eventCreateMapAddress"
					ref="address"
				/>

				<CustomLatLng />

				{ !this.props.EventCreateForm.locEqualsGoogleLoc &&
				<div>
					Notice: Custom latitude and longitude have been set
				</div>
				
				}
				

				<GoogleMap name="eventCreate"
					type="eventCreate"
					mapDivName="eventCreateMap"
					linkAddress="eventCreateMapAddress"
					height="400px"
					width="100%"
					/>

				<InputRow name="Event Starts At"
					store="EventCreateForm"
					getValue="getStartDate"
					onChange="setStartDate"
					component="flatpickr"
				/>
				<InputRow name="Event Ends At"
					store="EventCreateForm"
					getValue="getEndDate"
					onChange="setEndDate"
					component="flatpickr"
				/>

				<InputRow name="Description"
					store="EventCreateForm"
					getValue="getDescription"
					onChange="setDescription"
				/>
				<InputRow name="At a Glance"
					store="EventCreateForm"
					getValue="getQuickInfo"
					onChange="setQuickInfo"
				/>

				<InputRow name="Contact Phone"
					store="EventCreateForm"
					getValue="getPhone"
					onChange="setPhone"
				/>

				<input className="two-col-simple__submit" 
					type="submit" 
					name="form_submitted" 
					value="Create Event" 
					onClick={this.execEventCreate} />

			</div>
		);
	}
}


@inject('EventCreateForm')
@observer
export class CustomLatLng extends Component {
	setLat = e => this.props.EventCreateForm.setLat(e.target.value)
	setLng = e => this.props.EventCreateForm.setLng(e.target.value)
	customLatLngToggle = () => this.props.EventCreateForm.customLatLngToggle()

	updateLatLng = () => this.props.EventCreateForm.updateMarkerWithCustomLatLng()

	fieldError(field) {
		var error = ""
		switch (field) {
			case "lat":
				error = this.props.EventCreateForm.validateLat
				if (error) {
					return (
						<div>
							{error}
						</div>
					)
				}
				break

			case "lng":
				error = this.props.EventCreateForm.validateLng
				if (error) {
					return (
						<div>
							{error}
						</div>
					)
				}
				break

			default:
				break

		}
	}
		
	render() {
		var customLatLngEnabled = this.props.EventCreateForm.customLatLngEnabled
		
		return (
			<div className="custom-lat-lng">
				<input type="checkbox" 
					name="customLatLngCheckbox" 
					id="custom-lat-lng__checkbox"
					onClick={this.customLatLngToggle} />
				<div className="custom-lat-lng__checkbox">
					<label className="custom-lat-lng__checkbox-label" 
						htmlFor="custom-lat-lng__checkbox"
						>Custom Lat/Lng</label>
				</div>

				<input className="custom-lat-lng__lat" 
					id="custom-lat-lng__lat" 
					type="text"
					name ="custom-lat-lng__lat"
					value ={this.props.EventCreateForm.getLat}
					onChange ={this.setLat}
					disabled={!customLatLngEnabled}
				/>

				<input className="custom-lat-lng__lng" 
					id="custom-lat-lng__lng" 
					type="text"
					name ="custom-lat-lng__lng"
					value ={this.props.EventCreateForm.getLng}
					onChange ={this.setLng}
					disabled={!customLatLngEnabled}
				/>

				<div className="custom-lat-lng__update-button"
					onClick={this.updateLatLng}>
					Update
				</div>

				<div className="two-col-simple__error">
					{this.fieldError("lat")}
				</div>
				<div className="two-col-simple__error">
					{this.fieldError("lng")}
				</div>
			</div>
		);
	}
}


export default EventCreate
