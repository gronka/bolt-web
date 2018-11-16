import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { conf } from '../../conf'
import { formatUnixTimeForEventLine } from '../../helpers'


export class ManageEvents extends Component {

	render() {
		return (
			<div>
				<EventList 
					title="Manage Your Events"
					source="currentUser"
					/>
			</div>

		)
	}

}


@inject('AxiosStore', 'EventListStore')
@observer
export class EventList extends Component {
	// A list of events for a given dataset
	componentDidMount() {
		this.props.EventListStore.getInitialEvents()
	}

	renderInitialEvents() {
		const items = this.props.EventListStore.events.map(
			(event) =>
			<EventLine event={event} 
				key={event.eventUuid}/>
		)
		return items
	}

	render() {
		return (
			<div className="eventList">
				<div className="eventList__title">
					{this.props.title}
				</div>

				<div className="eventList__lines">
					{this.renderInitialEvents()}

				</div>

			</div>

		)
	}
}


export class EventLine extends Component {
	// A single item in the EventList component
	constructor(props) {
		super(props)
		// TODO: fix these urls
		this.mapCapUrl = conf.eventMiniLogoUrl + props.UUID
		this.mapCapUrl = conf.eventMiniMapCapUrl + props.UUID
	}

	useBackupLogo = e => {
		e.target.onerror = null
		e.target.src = "/static/default-logo.svg"
	}
	
	useBackupMapCap = e => {
		e.target.onerror = null
		e.target.src = "/static/default-mapCap.svg"
	}

	render() {
		return (
			<div className="eventLine">

				<div className="eventLine__bubble">
					<div className="eventLine__images">
						<div className="eventLine__images__logo">
							<img src="/static/default-logo2.svg" 
								onError={this.useBackupLogo}
								alt="event logo"
								/>
						</div>

						<div className="eventLine__images__mapCap">
							<img src={this.props.mapCapUrl}
								onError={this.useBackupMapCap}
								alt="map screencap" 
								/>

						</div>
					</div>


					<div className="eventLine__info">
						<div className="eventLine__info__title">
							{this.props.event.title}

						</div>

						<div className="eventLine__info__startDate">
							{formatUnixTimeForEventLine(this.props.event.startTimeUnix * 1000)}

						</div>

						<div className="eventLine__info__quickInfo">
							{this.props.event.quickInfo}

						</div>
					</div>
				</div>
			</div>

		)
	}

}



export default ManageEvents
