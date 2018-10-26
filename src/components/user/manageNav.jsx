import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'


class ManageEvents extends Component {

	render() {
		return (
			<div>
				Manage events
			</div>
		)
	}
}


class ManageGroups extends Component {

	render() {
		return (
			<div>
				Manage groups
			</div>
		)
	}
}


export class ManageNav extends Component {
	activeNav = {
		color: "green"
	}

	render() {
		return (
			<div className="manageNav links-with-view">


				<div className="manageNav__links">

					<NavLink exact to="/u/manage/events"
						className="manageNav__links__link"
						activeStyle={this.activeNav}>
							My Events
					</NavLink>
					<NavLink exact to="/u/manage/groups"
						className="manageNav__links__link"
						activeStyle={this.activeNav}>
						My Groups
					</NavLink>
					<NavLink exact to="/u/manage/businesses"
						className="manageNav__links__link"
						activeStyle={this.activeNav}>
						My Businesses
					</NavLink>

				</div>

				<div className="manageNav__body">
					<Route exact path="/u/manage/events" component={ManageEvents} />
					<Route exact path="/u/manage/groups" component={ManageGroups} />
				</div>

			</div>
)
	}

}


export default ManageNav
