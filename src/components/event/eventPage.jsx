import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { getThreeLetterMonth } from '../../lib/dateHelpers'
import GoogleMap from '../googleMap'


@inject('CurrentEventStore', 'MapController')
@observer
class EventPage extends Component {
	constructor(props) {
		super(props)
		this.CES = this.props.CurrentEventStore
		this.eventUuid = props.match.params.eventUuid
	}

	componentWillMount() {
		this.CES.fetchEvent(this.eventUuid)
	}

	render() {
		return (
			<div className="two-col-simple__form"
				id="form-register">
				{this.CES.loaded &&
				<div>

				<h1>
					{this.CES.title}
				</h1>

					{getThreeLetterMonth(this.CES.startDate)}
					<br />
					{this.CES.startDate.getDate()}
					<br />
					{this.CES.address}
					<br />

					{this.CES.description}
				</div>
				
				}

				<GoogleMap name="eventPage"
					type="eventPage"
					mapDivName="eventPageMap"
					height="400px"
					width="100%"
					/>

			</div>
		);
	}
}


export default EventPage
