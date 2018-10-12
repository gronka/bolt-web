import React from 'react'
import { inject, observer } from 'mobx-react'

import { conf } from '../../conf'

/*global google*/


//@inject ('MapStore')
//@observer
export default class GoogleMap extends React.Component {
	static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

	shouldComponentUpdate() {
		return false
	}

	componentDidMount() {
		// TODO: possibly load maps scripts async, then create a function to defer
		// this init step
		//this.props.MapStore.getTacs()
		this.map = new google.maps.Map(this.refs.map, {
			center: { lat: -59.95, lng: 30.33 },
			zoom: 11,
		})
	}

	render() {
		//this.props.MapStore.getTacs()
		//let eventTacs = this.props.MapStore.markers.events
		//debugger

		return (
			<div style={{ height: '100%', width: '100%' }}>
				<div className="gmap" ref="map">

				</div>
			</div>
		)
	}
}


class Marker extends React.Component {
	render() {
		return (
			<div className="marker event-marker__container">
				<img src="/static/map/red-marker.svg" alt="" />
				<div class="event-marker__text">
					{this.props.text}
				</div>
			</div>
		)
	}
}
