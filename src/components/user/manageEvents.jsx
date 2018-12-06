import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import EventList from '../event/eventList'


@inject(
				'CurrentProfileStore')
@observer
export class ManageEvents extends Component {

	render() {
		var listKey = this.props.CurrentProfileStore.sharedEventListKey
		return (
			<div>
				<EventList 
					title="Manage Your Events"
					listKey={listKey}
					canEdit={false}
					/>
			</div>

		)
	}

}


export default ManageEvents
