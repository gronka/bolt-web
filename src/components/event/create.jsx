import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { InputRow } from '../pieces'
import GoogleMap from '../googleMap'


@inject('EventCreateForm', 'MapController')
@observer
class EventCreate extends Component {
  execEventCreate = () => this.props.EventCreateForm.submit()

	//componentDidUpdate() {
		//this.props.MapController.changeMap("eventCreate")
	//}

	render() {
		return (
			<div className="two-col-simple__form"
				id="form-register">
				<h1>Register to follow events, or plan your own!</h1>

				<InputRow name="Title"
					store="EventCreateForm"
					getValue="getTitle"
					onChange="setTitle"
				/>
				<InputRow name="Venue Name"
					store="EventCreateForm"
					getValue="getVenue"
					onChange="setVenue"
				/>
				<InputRow name="Address"
					store="EventCreateForm"
					getValue="getAddress"
					onChange="setAddress"
					addClasses="eventCreateMapAddress"
				/>

				<GoogleMap name="eventCreate"
					type="eventCreate"
					mapDivName="eventCreateMap"
					linkAddress="eventCreateMapAddress"
					height="400px"
					width="100%"
					/>

				<InputRow name="Event Starts At"
					store="EventCreateForm"
					getValue="getStartTimeUnix"
					onChange="setStartTimeUnix"
				/>
				<InputRow name="Event Ends At"
					store="EventCreateForm"
					getValue="getEndTimeUnix"
					onChange="setEndTimeUnix"
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


export default EventCreate
