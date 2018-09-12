import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { inject } from 'mobx-react'

import EventsLandingFilters from './eventsLandingFilters'
import FoodLandingFilters from './foodLandingFilters'
import LandingMap from './landingMap'
import LandingMap2 from './landingMap2'
import OpenLandingFilters from './openLandingFilters'


var wh_100 = {
	width: '100%',
	height: '100%',
}

@inject('MapStore')
class Landing extends React.Component {

	componentDidMount() {
		// assureMapInterval makes sure that the correct map is loaded to avoid
		// bugs that could occur from changing maps from an unknown source.
		this.assureMapInterval = setInterval( () => {
			let board = window.location.pathname.split("/")[1]
			this.props.MapStore.changeMap(board)
		}
		, 10000 )
	}

	componentWillUnmount() {
		clearInterval(this.assureMapInterval)
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

				<LandingMap2 />

			</div>
		)
	}
}
				//<LandingMap 
					//isMarkerShown 
					//googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYA2e8zpmUSRK3LiLPtlQCyT4VNWdjsD4&v=3.exp&libraries=geometry,drawing,places"
					//loadingElement={<div style={wh_100} />}
					//containerElement={<div style={wh_100} />}
					//mapElement={<div style={wh_100} />}
				///>


export default Landing
