import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { EditableText } from '../pieces'
import GoogleMap from '../googleMap'

import { getThreeLetterMonth } from '../../lib/dateHelpers'


@inject('CurrentEventStore', 'CurrentProfileStore', 'MapController')
@observer
class EventPage extends Component {
	constructor(props) {
		super(props)
		this.CES = this.props.CurrentEventStore
		this.CPS = this.props.CurrentProfileStore
		this.eventUuid = props.match.params.eventUuid
		this.userIsAdminOfEvent = this.CPS.userIsAdminOfEvent(this.eventUuid)
	}

	componentWillMount() {
		this.CES.fetchEvent(this.eventUuid)
	}

	shareOnBolt = () => {
		this.CES.addEventToList("sharedEventUuids")
	}

	render() {
		return (
			<div className="two-col-simple__form"
				id="form-register">
				{this.CES.loaded &&
				<div>

				<h1>
					<EditableText field="title"
						rows="1"
						store="CES"
						canEdit={this.userIsAdminOfEvent}
					/>
				</h1>

					{getThreeLetterMonth(this.CES.startDate)}
					<br />
					{this.CES.startDate.getDate()}
					<br />
					{this.CES.address}
					<br />
						<EditableText field="description"
							rows="1"
							store="CES"
							canEdit={this.userIsAdminOfEvent}
						/>


					<div onClick={this.shareOnBolt}>
						Share on Bolt
					</div>

					<div onClick={this.shareEvent}>
						Share
					</div>
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
