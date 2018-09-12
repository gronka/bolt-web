import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


const LandingMap = withScriptjs(withGoogleMap((props) => 
	<GoogleMap 
		defaultZoom={12}
		defaultCenter={{ lat: 35.7796, lng: -78.6382 }}
	>
		{props.isMarkerShown && <Marker position={{ lat: 35.7796, lng: -78.6382 }} />}
	</GoogleMap>

	//<div id="landing-map" className="landing__map">
		//Landing Map
	//</div>
))


export default LandingMap
