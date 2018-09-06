import React, { Component } from 'react'
import { inject } from 'mobx-react'

import { InputRow } from '../pieces'


@inject('RegisterForm')
class Register extends Component {
  execRegister = () => this.props.RegisterForm.submit()

	render() {
		return (
			<div className="two-col-simple__form"
				id="form-register">
				<h1>Register to follow events, or plan your own!</h1>

				<InputRow name="Email"
					store="RegisterForm"
					getValue="getEmail"
					onChange="setEmail"
				/>
				<InputRow name="Verify Email"
					store="RegisterForm"
					getValue="getVerifyEmail"
					onChange="setVerifyEmail"
				/>
				<InputRow name="Password"
					store="RegisterForm"
					getValue="getPassword"
					onChange="setPassword"
				/>
				<InputRow name="Verify Password"
					store="RegisterForm"
					getValue="getVerifyPassword"
					onChange="setVerifyPassword"
				/>
				<InputRow name="Full Name"
					store="RegisterForm"
					getValue="getFullName"
					onChange="setFullName"
				/>
				<InputRow name="Phone"
					store="RegisterForm"
					getValue="getPhone"
					onChange="setPhone"
				/>

				<input className="two-col-simple__submit" 
					type="submit" 
					name="form_submitted" 
					value="Register" 
					onClick={this.execRegister} />

			</div>
		);
	}
}


export default Register
