import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'


@inject('LoginForm', 'RegisterForm')
@observer
export class InputRow extends Component {
	constructor(props) {
		super(props)
		if (props.store === "LoginForm") {
			this.store = props.LoginForm
		} else if (props.store === "RegisterForm") {
			this.store = props.RegisterForm
		}
		this.name = props.name
		this.htmlName = this.name.toLowerCase().replace(" ", "_")
		this.getValue = props.getValue
		this.onChange = props.onChange
	}

	setEmail = e => this.store.setEmail(e.target.value)
	setVerifyEmail = e => this.store.setVerifyEmail(e.target.value)
	setPassword = e => this.store.setPassword(e.target.value)
	setVerifyPassword = e => this.store.setVerifyPassword(e.target.value)
	setFullName = e => this.store.setFullName(e.target.value)
	setPhone = e => this.store.setPhone(e.target.value)

	render() {
		return (
			<div>
				<div className="two-col-simple__left">
					<label className="two-col-simple__left-label" 
						htmlFor={this.htmlName}>{this.name}</label>
				</div>

				<div className="two-col-simple__right">
					<input className="two-col-simple__right-input" 
						id={this.htmlName}
						type="text" 
						name={this.htmlName}
						placeholder={this.name} 
						value={this.store[this.getValue]}
						onChange={this[this.onChange]}
					/>
				</div>
			</div>
		);
	}
}
