import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'


@inject('LoginForm', 'RegisterForm', 'EventCreateForm')
@observer
export class InputRow extends Component {
	constructor(props) {
		super(props)
		if (props.store === "LoginForm") {
			this.store = props.LoginForm
		} else if (props.store === "RegisterForm") {
			this.store = props.RegisterForm
		} else if (props.store === "EventCreateForm") {
			this.store = props.EventCreateForm
		}

		this.name = props.name
		this.htmlName = this.name.toLowerCase().replace(" ", "_")
		this.getValue = props.getValue
		this.onChange = props.onChange
		this.addClasses = props.addClasses
	}

	setEmail = e => this.store.setEmail(e.target.value)
	setVerifyEmail = e => this.store.setVerifyEmail(e.target.value)
	setPassword = e => this.store.setPassword(e.target.value)
	setVerifyPassword = e => this.store.setVerifyPassword(e.target.value)
	setFullName = e => this.store.setFullName(e.target.value)
	setPhone = e => this.store.setPhone(e.target.value)

	setTitle = e => this.store.setTitle(e.target.value)
	setVenue = e => this.store.setVenue(e.target.value)
	setStartTimeUnix = e => this.store.setStartTimeUnix(e.target.value)
	setEndTimeUnix = e => this.store.setEndTimeUnix(e.target.value)
	setDescription = e => this.store.setDescription(e.target.value)
	setQuickInfo = e => this.store.setQuickInfo(e.target.value)
	setPhone = e => this.store.setPhone(e.target.value)

	render() {
		return (
			<div>
				<div className="two-col-simple__left">
					<label className="two-col-simple__left-label" 
						htmlFor={this.htmlName}>{this.name}</label>
				</div>

				<div className="two-col-simple__right">
					<input className={"two-col-simple__right-input " + this.addClasses}
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
