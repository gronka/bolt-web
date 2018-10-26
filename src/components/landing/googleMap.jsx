import React from 'react'
import { inject } from 'mobx-react'


@inject ('MapController')
export default class GoogleMap extends React.Component {
	constructor(props) {
		super(props)
		this.mapType = this.props.mapType
		this.mapDivName = this.props.mapDivName
	}

	shouldComponentUpdate() {
		return false
	}

	componentDidMount() {
		var board = window.location.pathname.split("/")[1]
		this.props.MapController.createMap({
			name: board,
			type: "landing",
			mapDivName: "landingMap",
		})

		this.props.MapController.changeMap(board)
	}

	render() {
		return (
			<div style={{ height: '100%', width: '100%' }}>
				<div className="gmap landingMap" ref="map">

				</div>
			</div>
		)
	}
}

