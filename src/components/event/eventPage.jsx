import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import GoogleMap from '../googleMap'


@inject('CurrentEventStore', 'MapController')
@observer
class EventPage extends Component {
	constructor(props) {
		super(props)
		this.CES = this.props.CurrentEventStore
		this.eventUuid = props.match.params.eventUuid
	}

	componentDidMount() {
		this.CES.fetchEvent(this.eventUuid)
	}

	render() {
		return (
			<div className="two-col-simple__form"
				id="form-register">
				<h1>Register to follow events, or plan your own!</h1>

				<p>
					title
				</p>

				<p>
					title
				</p>

				<p>
					title
				</p>



				<GoogleMap name="eventCreate"
					type="eventCreate"
					mapDivName="eventCreateMap"
					linkAddress="eventCreateMapAddress"
					height="400px"
					width="100%"
					/>

			</div>
		);
	}
}


export default EventPage
