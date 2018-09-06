import React, { Component } from 'react'
import { inject } from 'mobx-react'

import { InputRow } from '../pieces'


@inject('LoginForm')
export class Login extends Component {
	submit = () => this.props.LoginForm.submit()

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

//const Login = ({ classes }) => (
//)
