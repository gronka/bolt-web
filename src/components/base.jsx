import React from 'react'
import { inject, observer } from 'mobx-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Portal from './portal'
import Landing from './landing/landing'

import EventCreate from './event/create'

import Login from './user/login'
import ManageApp from './user/manageApp'
import Profile from './user/profile'
import Register from './user/register'

//import ManageEvents from './user/manageApp'


/*global google*/

@inject('FlashStore', 'AuthStore', 'MapController')
@observer
class BaseRouter extends React.Component {

	componentWillMount() {
		// TODO: possibly load maps scripts async, then create a function to defer
		// this init step
		this.props.MapController.storeGoogleRef(google)
	}

	render() {
		//alert(window.location.pathname)
		//
						//<Route exact path="/u/manage/events" component={ManageEvents} />
		return (
			<BrowserRouter>
				<div className="base-container">
					<FlashMessages />
					
					<Portal />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/event" component={Landing} />
						<Route exact path="/events" component={Landing} />
						<Route exact path="/food" component={Landing} />
						<Route exact path="/open" component={Landing} />

						<Route exact path="/event/create" component={EventCreate} />

						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />

						<Route exact path="/u/profile" component={Profile} />
						<Route path="/u/manage" component={ManageApp} />
						<Route path="/u/:userUuid" component={Profile} />

					</Switch>

					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
				</div>
			</BrowserRouter>

		)
	}
}


@inject('FlashStore')
@observer
class FlashMessages extends React.Component {
	removeFlash = e => this.props.FlashStore.removeFlash(e.target.dataset.key)

	renderFlashMsgs = () => {
		let list = []
		let flashMsgs = this.props.FlashStore.msgs
		let numFlash = flashMsgs.length 

		if (numFlash === 0) {
			return
		} else {
			for (let i=0; i<numFlash; i++) {
				let classes = "flashmsg flashmsg__" + flashMsgs[i].severity
				list.push(
					<div className={classes} key={i}>
						{flashMsgs[i].msg}
						<div className="flashmsg__close"
							data-key={i}
							onClick={this.removeFlash}>
							X
						</div>
					</div>
				)
			}

			return list
		}
	}

	render() {
		return (
			<div className="flashmsgs-list">
				{this.renderFlashMsgs()}
			</div>
		)
	}
}


export default BaseRouter
