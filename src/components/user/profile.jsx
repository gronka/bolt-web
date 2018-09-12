import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'


@inject('AuthStore', 'AxiosStore')
@observer
export class Profile extends Component {

	constructor(props) {
		super(props)

		this.state = {
			userUuid: "",
			fullName: "",
			test: "okay",
		}
	}

	componentDidMount() {
		let userUuid = this.props.match.params.userUuid
		if (userUuid == null) {
			userUuid = this.props.AuthStore.userUuid
		} 

		this.setState({userUuid: userUuid}, () => {
			this.fetchProfileData() 
		})
	}

	fetchProfileData() {
		this.props.AxiosStore.ax.get("/user/get/" + this.state.userUuid)
		.then((resp) => {
			this.setState({fullName: resp.data.b.fullName})
		})

	}

	render() {
		return (
			<div className="two-col-simple__form">
				<h1>Profile</h1>
				<p>{this.state.userUuid}</p>
				<p>{this.state.fullName}</p>

			</div>

		)
	}

}


export default Profile
