import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { inject } from 'mobx-react'

import { getActiveMapName } from '../../helpers'
import EventsLandingFilters from './eventsLandingFilters'
import FoodLandingFilters from './foodLandingFilters'
import OpenLandingFilters from './openLandingFilters'


@inject('MapController')
class Landing extends React.Component {
	constructor(props) {
		super(props)
		this.activeMapName = getActiveMapName()
	}

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
		this.activeMapName = getActiveMapName()
		this.props.MapController.changeMap(this.activeMapName)
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" component={EventsLandingFilters} />
				<Route exact path="/event" component={EventsLandingFilters} />
				<Route exact path="/events" component={EventsLandingFilters} />
				<Route exact path="/food" component={FoodLandingFilters} />
				<Route exact path="/open" component={OpenLandingFilters} />
			</Switch>

		)
	}
}


export default Landing
