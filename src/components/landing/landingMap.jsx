import React from 'react'
import GoogleMapReact from 'google-map-react'
import { inject, observer } from 'mobx-react'

import { conf } from '../../conf'


// places text at this point on the map
//const AnyReactComponent = ({ text }) => <div>{text}</div>;
					//<AnyReactComponent
            //lat={59.955413}
            //lng={30.337844}
            //text={'Kreyser Avrora'}
          ///>


@inject ('MapStore')
@observer
export default class LandingMap extends React.Component {
	static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

	componentDidMount() {
		this.props.MapStore.getTacs()
	}

	render() {
		//this.props.MapStore.getTacs()
		let eventTacs = this.props.MapStore.markers.events
		//debugger

		return (
			<div style={{ height: '100%', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: conf['googleApiKey'] }}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
				>

					<Marker
						key={eventTacs[0].tacid}
						text="my tac"
						lat={eventTacs[0].lat}
						lng={eventTacs[0].lng}
					/>

				</GoogleMapReact>
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
