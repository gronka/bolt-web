import React from 'react'
import { inject } from 'mobx-react'

import {MapDeets} from '../stores/MapDeets'


@inject ('MapController')
//@observer
export default class GoogleMap extends React.Component {
	//TODO: catch "ReferenceError: google is not defined" when google maps cannot
	//be reached

	constructor(props) {
		super(props)
		this.name = props.name
		this.type = props.type
		this.mapDivName = props.mapDivName
		this.linkAddress = "eventCreateMapAddress"

		this.height = props.height || "100%"
		this.width = props.width || "100%"
	}

	shouldComponentUpdate() {
		return false
	}

	componentDidMount() {
		var deets = new MapDeets({
			"name": this.name,
			"type": this.type,
			"mapDivName": this.mapDivName,
		})

		this.props.MapController.createMap(deets)

		//alert(this.name)
		this.props.MapController.changeMap(deets.name)
	}

	render() {
		return (
			<div className="gmapWrapper" style={{ height: this.height, width: this.width }}>
				<div className={"gmap " + this.mapDivName} ref="map">

				</div>
			</div>
		)
	}
}


export class GoogleMapLanding extends React.Component {
	render() {
		return (
			<GoogleMap name={this.props.name}
				type="landing"
				mapDivName="landingMap"
				height="100%"
				width="100%"
			/>
		)
	}
}
