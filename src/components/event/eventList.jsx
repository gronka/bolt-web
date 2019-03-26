import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { NavLink } from 'react-router-dom'

import { conf } from '../../conf'
import { formatUnixTimeForEventLine } from '../../helpers'


@inject('AxiosStore', 
				'EventCache',
				'EventListCache',
				'EventListViewerOne',
				'ViewingProfileStore')
@observer
export class EventList extends Component {
	constructor(props) {
		super(props)
		if (this.props.canEdit != null) {
			this.canEdit = this.props.canEdit
		} else {
			this.canEdit = false
		}

		if (props.store === "EventListViewerOne") {
			this.store = props.EventListViewerOne
		} else if (props.store === "EventListViewerTwo") {
			this.store = props.EventListViewerTwo
		}
	}

	renderInitialEvents() {
		
		if (this.store.uuids === "uuidsNS") {
			return
		}
		//debugger

		const jsx = this.store.uuids.map(
			(function(uuid, i)  {
				var event = this.props.EventCache.getItem(uuid)
				return(
					<EventLine event={event} 
						key={i}
						eventItem={uuid}
					/>
				)
			}.bind(this)
		 )
		)
		return jsx
	}

	renderToggleEditMode() {
		var jsx = []
		if (!this.store.editMode) {
			jsx.push(
				<div className="eventList__editMode"
					onClick={this.toggleEditMode}
					key="edit"
					>
						edit
					</div>
			)
		} else {
			jsx.push(
				<div className="eventList__editMode"
					onClick={this.toggleEditModeAndSave}
					key="save"
					>
						save
					</div>
			)

		}
		return jsx
	}

	toggleEditMode = () => this.store.editMode = !this.store.editMode
	toggleEditModeAndSave = () => {
		this.store.editMode = !this.store.editMode
		this.store.saveToDb(this.name)
	}


	render() {
		return (
			<div className="eventList">
				<div className="eventList__titleBar">
					<div className="eventList__title">
						{this.props.title}
					</div>
					{this.canEdit &&
					this.renderToggleEditMode()
					}
					
				</div>

				<div className="eventList__lines">
					{this.renderInitialEvents()}
				</div>
			</div>
		)
	}
}


@inject('AxiosStore', 
				'EventListCache',
				'ViewingProfileStore')
@observer
export class EventLine extends Component {
	// A single item in the EventList component
	constructor(props) {
		super(props)
		// TODO: fix these urls
		this.mapCapUrl = conf.eventMiniLogoUrl + props.UUID
		this.mapCapUrl = conf.eventMiniMapCapUrl + props.UUID

		this.name = props.name
		this.uuid = props.uuid

		this.remove = this.remove.bind(this)
		this.moveUp = this.moveUp.bind(this)
		this.moveDown = this.moveDown.bind(this)
	}

	@computed get eventList() {
		return this.props.EventListCache.getItem(this.uuid, this.name)
	}

	useBackupLogo = e => {
		e.target.onerror = null
		e.target.src = "/static/default-logo.svg"
	}
	
	useBackupMapCap = e => {
		e.target.onerror = null
		e.target.src = "/static/default-mapCap.svg"
	}

	remove(e) {
		var div = e.target.closest("div.eventLine")
		var eventUuid = div.dataset.eventuuid
		this.eventList.remove(eventUuid)
	}

	moveUp(e) {
		var div = e.target.closest("div.eventLine")
		var eventUuid = div.dataset.eventuuid
		this.eventList.moveUp(eventUuid)
	}

	moveDown(e) {
		var div = e.target.closest("div.eventLine")
		var eventUuid = div.dataset.eventuuid
		this.eventList.moveDown(eventUuid)
	}

	render() {
		return (
			<div className="eventLine"
				data-eventuuid={this.props.event.eventUuid}
			>

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
							<NavLink exact to={"/e/" + this.props.event.eventUuid}>
								{this.props.event.title}
							</NavLink>

						</div>

						<div className="eventLine__info__startDate">
							{formatUnixTimeForEventLine(this.props.event.startTimeUnix * 1000)}

						</div>

						<div className="eventLine__info__quickInfo">
							{this.props.event.quickInfo}
							{this.props.event.eventUuid}

						</div>
					</div>
				</div>

				{this.eventList.editMode &&
					<div className="eventLine__manageBar">
						<div className="eventLine__manageBar__up"
							onClick={this.moveUp} >
							up
						</div>

						<div className="eventLine__manageBar__down"
							onClick={this.moveDown} >
							down
						</div>

						<div className="eventLine__manageBar__remove"
							onClick={this.remove} >
							remove
						</div>

					</div>
				
				}

			</div>

		)
	}

}


export default EventList
