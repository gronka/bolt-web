import React, { Component } from 'react'
//import { inject, observer } from 'mobx-react'
import { inject } from 'mobx-react'


@inject('AuthStore', 'AxiosStore', 'CurrentProfileStore')
export class Profile extends Component {

	constructor(props) {
		super(props)
		this.CPS = this.props.CurrentProfileStore

		this.userUuid = this.props.match.params.userUuid
		if (this.userUuid == null) {
			this.userUuid = this.props.AuthStore.userUuid
		} 
	}

	componentDidMount() {
		this.CPS.fetchProfile(this.userUuid)
	}

	shouldComponentUpdate() {
		if (this.CPS.status === "fetchProfile") {
			return false
		}
		return true
	}

	render() {
		return (
			<div className="two-col-simple__form">
				<h1>Profile</h1>
				<p>{this.CPS.userUuid}</p>
				<p>{this.CPS.fullname}</p>

			</div>

		)
	}

}


export default Profile
