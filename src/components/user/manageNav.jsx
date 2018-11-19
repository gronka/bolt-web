import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'

import ManageEvents from './manageEvents'
import Profile from './profile'


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
					<NavLink exact to="/u/manage/profile"
						className="manageNav__links__link"
						activeStyle={this.activeNav}>
						My Profile
					</NavLink>

					<NavLink exact to="/u/manage/events"
						className="manageNav__links__link"
						activeStyle={this.activeNav}>
						Administer My Events
					</NavLink>

					<NavLink exact to="/u/manage/calendar"
						className="manageNav__links__link"
						activeStyle={this.activeNav}>
						My Calendar
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

					<NavLink exact to="/logout"
						className="manageNav__links__link"
						activeStyle={this.activeNav}>
						Logout
					</NavLink>

				</div>

				<div className="manageNav__body">
					<Route exact path="/u/manage/profile" component={Profile} />
					<Route exact path="/u/manage/events" component={ManageEvents} />
					<Route exact path="/u/manage/calendar" component={ManageEvents} />
					<Route exact path="/u/manage/groups" component={ManageGroups} />
				</div>

			</div>
		)
	}

}


export default ManageNav
