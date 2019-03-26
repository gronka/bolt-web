import React, { Component } from 'react'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'

import { EditableText } from '../pieces'
import EventList from '../event/eventList'

import Log from '../../Log'


@inject('AuthStore', 
				'EventListCache',
				'EventListViewerOne',
				'ViewingProfileStore')
@observer
export class Profile extends Component {

	constructor(props) {
		super(props)
		this.VPS = this.props.ViewingProfileStore
		this.profileUuid = this.whichProfileUuid()
		this.isProfileCurrentUser = this.VPS.isProfileCurrentUser(this.profileUuid)
	}

	whichProfileUuid() {
		if (this.props.match.params.userUuid) {
			return this.props.match.params.userUuid
		} 
		if (this.props.match.path === "/u/manage/profile") {
			return this.props.AuthStore.userUuid
		}
		if (this.props.match.path === "/u/manage") {
			return this.props.AuthStore.userUuid
		}
	}

	componentWillMount() {
		this.VPS.getProfile(this.profileUuid)
		Log.debug("Mounting profile component for user " + this.profileUuid)
		this.props.EventListViewerOne.getEventList("user", "shared", this.profileUuid)
		this.props.EventListViewerOne.getEventList("user", "slated", this.profileUuid)
	}

	renderHeader() {
		// TODO: hide header if no content for it
	}

	renderSharedEvents() {
		// TODO: hide header if no content for it
	}

	render() {
		return (
			<div className="px800Col profile__container">
				<div className="profile__header">
					<img src="" alt="headerImage" />
					<span>TODO: if no header, hide this part</span>
				</div>

				<div className="profile__body">

					<div className="profile__leftCol">

						<div className="profile__row">
							<span>Welcome video? Some sort of sneak peak thing maybe for promoters</span>
						</div>

						<div className="profile__row">
							<span>TODO: if no events in Shared list, hide this part</span>
							<span>TODO: maybe indicate if this person is a manager vs simply sharing</span>
							<EventList 
								title="Shared Events"
								store="EventListViewerOne"
								canEdit={this.isProfileCurrentUser}
								/>
						</div>

						<div className="profile__row">
							EventList 
								title="Slated Events"
								uuid={this.VPS.userUuid}
								name="slated"
								canEdit={this.isProfileCurrentUser}
								/
						</div>

					</div>

					<div className="profile__rightCol">
						<div className="profile__row">
							<img className="profile__picture" src="" alt="profilePicture" />
						</div>

						<div className="profile__row">
							<EditableText field="fullname"
								rows="1"
								store="VPS"
								canEdit={this.isProfileCurrentUser}
							/>
							<span>Follow</span>
						</div>

						<div className="profile__row">
							<EditableText field="about"
								rows="5"
								store="VPS"
								canEdit={this.isProfileCurrentUser}
							/>
						</div>

						<div className="profile__row">
							<span>Groups</span>
						</div>

						<div className="profile__row">
							<span>Website</span>
						</div>

						<div className="profile__row">
							<span>twitter links?</span>
						</div>

					</div>

				</div>

			</div>

		)
	}

}


export default Profile
