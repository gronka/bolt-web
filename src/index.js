import React from 'react'
import ReactDOM from 'react-dom'
import BaseRouter from './components/base'
import { Provider } from 'mobx-react'

import AuthStore from './stores/AuthStore'
import AxiosStore from './stores/AxiosStore'
import FlashStore from './stores/FlashStore'
import MapStore from './stores/MapStore'
import UiStore from './stores/UiStore'

import LoginForm from './stores/LoginForm'
import RegisterForm from './stores/RegisterForm'

import EventCreateForm from './stores/EventCreateForm'

import './styles/base.css'
import './styles/landing.css'
import './styles/portal.css'
import './styles/links-with-view.css'
import './styles/two-col-simple.css'
import './styles/markers.css'

const stores = {
	AuthStore,
	AxiosStore,
	FlashStore,
	MapStore,
	UiStore,

	LoginForm,
	RegisterForm,

	EventCreateForm,
}

const Root = (
	<Provider {...stores}>
		<BaseRouter />
	</Provider>
)


window.APP_STATE = stores

ReactDOM.render(Root, document.getElementById('root'))

//import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker()
