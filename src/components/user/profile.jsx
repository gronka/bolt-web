import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import EventList from '../event/eventList'


@inject('AuthStore', 
				'CurrentProfileStore')
@observer
export class Profile extends Component {

	constructor(props) {
		super(props)

		this.userUuid = this.props.match.params.userUuid
		this.isCurrentUser = false
		if (this.userUuid == null) {
			this.userUuid = this.props.AuthStore.userUuid
		} 
		if (this.userUuid === this.props.AuthStore.userUuid) {
			this.isCurrentUser = true
		}

		this.CPS = this.props.CurrentProfileStore
	}

	componentWillMount() {
		this.CPS.fetchProfile(this.userUuid)
	}

	renderHeader() {
		// TODO: hide header if no content for it
	}

	renderSharedEvents() {
		// TODO: hide header if no content for it
	}

	editText = e => {
		var el = e.target.closest(".valuewrap")
		debugger
		//var val = el.innerHTML
		//alert(val)
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
								name="shared"
								canEdit={this.isCurrentUser}
								/>
						</div>

						<div className="profile__row">
							<EventList 
								title="Slated Events"
								name="slated"
								canEdit={this.isCurrentUser}
								/>
						</div>

					</div>

					<div className="profile__rightCol">
						<div className="profile__row">
							<img className="profile__picture" src="" alt="profilePicture" />
						</div>

						<div className="profile__row">
							<span>Follow</span>
							<span className="profile__name valuewrap">{this.CPS.fullname}
							{this.isCurrentUser &&
								<div className="editable" onClick={this.editText}>edit</div>
							}
						</span>
							<span>Follow</span>
						</div>

						<div className="profile__row">
							<span>About me</span>
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

						//<div className="profile__row">
							//<EventList 
								//title="Slated Events"
								//source="currentUser"
								//storeName="CurrentSlatedEventList"
								//canEdit={this.isCurrentUser}
								///>
						//</div>

export default Profile
