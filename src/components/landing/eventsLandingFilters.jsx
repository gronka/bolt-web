import React from 'react'

import { GoogleMapLanding } from '../googleMap'


class EventsLandingFilters extends React.Component {

	render() {
		return (
			<div className="landing-container">

					<div className="landing__filters">

						<div className="landing__filter-row">
							<label htmlFor="deets">Name/details search:</label>
							<div className="landing__filter__deets-container">
								<input className="landing__filter__deets-input" 
									type="text" 
									id="deets" 
									name="deets" 
									placeholder="Search..." />
								<button className="landing__filter__deets-submit">
									<i className="landing__filter__deets-glyph glyphicon glyphicon-search"></i>
								</button>
							</div>
						</div>

						<div className="landing__filter-row">
							<label htmlFor="startdate">Start time</label>
						</div>
					</div>

					<GoogleMapLanding name="events" />

			</div>

		)
	}

}


export default EventsLandingFilters
