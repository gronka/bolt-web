import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { inject } from 'mobx-react'

import EventsLandingFilters from './eventsLandingFilters'
import FoodLandingFilters from './foodLandingFilters'
import GoogleMap from './googleMap'
import OpenLandingFilters from './openLandingFilters'


@inject('MapController')
class Landing extends React.Component {

	// TODO: determine if this is needed or not
	//componentDidMount() {
		//// assureMapInterval makes sure that the correct map is loaded to avoid
		//// bugs that could occur from changing maps from an unknown source.
		//this.assureMapInterval = setInterval( () => {
			//let board = window.location.pathname.split("/")[1]
			//this.props.MapController.changeMap(board)
		//}
		//, 10000 )
	//}

	//componentWillUnmount() {
		//clearInterval(this.assureMapInterval)
	//}
	
	componentDidUpdate() {
		var board = window.location.pathname.split("/")[1]
		this.props.MapController.changeMap(board)
	}

	render() {
		return (
			<div className="landing-container">
				<Switch>
					<Route exact path="/" component={EventsLandingFilters} />
					<Route exact path="/event" component={EventsLandingFilters} />
					<Route exact path="/events" component={EventsLandingFilters} />
					<Route exact path="/food" component={FoodLandingFilters} />
					<Route exact path="/open" component={OpenLandingFilters} />
				</Switch>

				<GoogleMap />

			</div>
		)
	}
}


export default Landing
