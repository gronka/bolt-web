import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { EditableText } from '../pieces'
import GoogleMap from '../googleMap'

import { getThreeLetterMonth } from '../../lib/dateHelpers'


@inject('ViewingEventStore', 'ViewingProfileStore', 'MapController')
@observer
class EventPage extends Component {
	constructor(props) {
		super(props)
		this.VES = this.props.ViewingEventStore
		this.VPS = this.props.ViewingProfileStore
		this.eventUuid = props.match.params.eventUuid
		this.userIsAdminOfEvent = this.VPS.userIsAdminOfEvent(this.eventUuid)
	}

	componentWillMount() {
		this.VES.fetchEvent(this.eventUuid)
	}

	shareOnBolt = () => {
		this.VES.addEventToList("sharedEventUuids")
	}

	render() {
		return (
			<div className="two-col-simple__form"
				id="form-register">
				{this.VES.loaded &&
				<div>

				<h1>
					<EditableText field="title"
						rows="1"
						store="VES"
						canEdit={this.userIsAdminOfEvent}
					/>
				</h1>

					{getThreeLetterMonth(this.VES.startDate)}
					<br />
					{this.VES.startDate.getDate()}
					<br />
					{this.VES.address}
					<br />
						<EditableText field="description"
							rows="1"
							store="VES"
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
