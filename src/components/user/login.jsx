import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { withRouter } from 'react-router'

import { InputRow } from '../pieces'


@inject('LoginForm')
@withRouter
export class Login extends Component {
	constructor(props) {
		super(props)
	}

	submit = () => {
		this.props.LoginForm.submit()
		this.props.history.push('/emptyPage')
	}

	render() {
		return (
			<div className="two-col-simple__form">
				<h1>User Login</h1>

				<InputRow name="Email"
					store="LoginForm"
					getValue="getEmail"
					onChange="setEmail"
				/>
				<InputRow name="Password"
					store="LoginForm"
					getValue="getPassword"
					onChange="setPassword"
				/>

				<br />

				<input className="two-col-simple__submit" 
					type="submit" 
					name="form_submitted" 
					value="Log In" 
					onClick={this.submit}/>
			</div>

		)
	}

}


export default Login
