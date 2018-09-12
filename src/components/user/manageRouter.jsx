import React, { Component } from 'react'


export class ManageRouter extends Component {

	render() {
		return (
			<div className="manage links-with-view">

				<div className="links-with-view__title">
					<h1>Edit your profile</h1>
				</div>

				<div className="links-with-view__links">
					<p>
						My Events
					</p>
					<p>
						My Groups
					</p>

				</div>

				<div className="links-with-view__view">
					<h1>Edit things</h1>

				</div>

			</div>

		)
	}

}


export default ManageRouter
