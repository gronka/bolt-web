import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import EventList from '../event/eventList'


@inject(
				'CurrentProfileStore')
@observer
export class ManageEvents extends Component {

	render() {
		return (
			<div>
				<EventList 
					title="Manage Your Events"
					name="admin"
					canEdit={false}
					/>
			</div>

		)
	}

}


export default ManageEvents
