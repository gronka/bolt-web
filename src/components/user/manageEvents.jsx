import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import EventList from '../event/eventList'


@inject(
				'ViewingProfileStore')
@observer
export class ManageEvents extends Component {

	render() {
		return (
			<div>
				<EventList 
					title="Manage Your Events"
					uuid={this.props.ViewingProfileStore.userUuid}
					name="admin"
					canEdit={false}
					/>
			</div>

		)
	}

}


export default ManageEvents
