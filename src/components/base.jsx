import React from 'react'
import { inject, observer } from 'mobx-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import axios from 'axios'

import Portal from './portal'
import Login from './user/login'
import Register from './user/register'
import Landing from './landing/landing'


@inject('FlashStore')
@observer
class BaseRouter extends React.Component {

	componentWillMount() {
		let fs = this.props.FlashStore
		axios.interceptors.response.use(
			function(resp) {
				if (resp.data == null) {
					fs.addFlash("Axios returned null response.", "error")
				} else {
					return Promise.resolve(resp)
				}
			}, 

			function (error) {
				fs.addFlash(error.message, "error")
				//if(error.response.status === 401) {
					//return Promise.reject(error);
				//}
				return Promise.reject(error)
			});
	}

	render() {
		//alert(window.location.pathname)
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

						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
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
