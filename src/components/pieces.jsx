import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Flatpickr from 'react-flatpickr'


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
		this.validate = props.validate
		this.addClasses = props.addClasses
		this.id = props.idOvrd || this.htmlName 
	}

	setEmail = e => this.store.setEmail(e.target.value)
	setVerifyEmail = e => this.store.setVerifyEmail(e.target.value)
	setPassword = e => this.store.setPassword(e.target.value)
	setVerifyPassword = e => this.store.setVerifyPassword(e.target.value)
	setFullName = e => this.store.setFullName(e.target.value)
	setPhone = e => this.store.setPhone(e.target.value)

	setTitle = e => this.store.setTitle(e.target.value)
	setVenue = e => this.store.setVenue(e.target.value)
	setAddress = e => this.store.setAddress(e.target.value)
	setStartDate = date => this.store.setStartDate(date)
	setEndDate = date => this.store.setEndDate(date)
	setDescription = e => this.store.setDescription(e.target.value)
	setQuickInfo = e => this.store.setQuickInfo(e.target.value)
	setPhone = e => this.store.setPhone(e.target.value)

	displayComponentType() {
		if (this.props.component == null) {
			return(
				<input className={"two-col-simple__right-input " + this.addClasses}
					id={this.id}
					type="text" 
					name={this.htmlName}
					placeholder={this.name} 
					value={this.store[this.getValue]}
					onChange={this[this.onChange]}
				/>
			)
		}

		if (this.props.component === "flatpickr") {
			return (
				<Flatpickr className={"two-col-simple__right-input " + this.addClasses} 
					id={this.id}
					placeholder={this.name} 
					data-enable-time
					value={this.store[this.getValue]}
					onChange={(_, date) => this.store[this.onChange](date)} 
				/>
			)
		}
	}

	fieldError() {
		if (this.validate != null) {
			var error = this.store[this.validate]
			if (error) {
				return (
					<div>
						{error}
					</div>
				)
			}
		}
	}

	render() {
		return (
			<div>
				<div className="two-col-simple__left">
					<label className="two-col-simple__left-label" 
						htmlFor={this.htmlName}>{this.name}</label>
				</div>

				<div className="two-col-simple__right">
					{this.displayComponentType()}
				</div>

				<div className="two-col-simple__error">
					{this.fieldError()}
				</div>


			</div>
		);
	}
}
