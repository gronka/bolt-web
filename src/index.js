import React from 'react'
import ReactDOM from 'react-dom'
import BaseRouter from './components/base'
import { Provider } from 'mobx-react'

import { conf } from './conf'

import AuthStore from './stores/AuthStore'
import AxiosStore from './stores/AxiosStore'
import FlashStore from './stores/FlashStore'
import UiStore from './stores/UiStore'

import HistoryController from './stores/HistoryController'
import MapController from './stores/MapController'

import ViewingProfileStore from './stores/ViewingProfileStore'
import LoginForm from './stores/LoginForm'
import RegisterForm from './stores/RegisterForm'

import EventCache from './stores/EventCache'
import EventListCache from './stores/EventListCache'
import ViewingEventStore from './stores/ViewingEventStore'
import EventCreateForm from './stores/EventCreateForm'

import './styles/base.css'
import './styles/custom-lat-lng.css'
import './styles/eventLine.css'
import './styles/landing.css'
import './styles/portal.css'
import './styles/manage.css'
import './styles/two-col-simple.css'
import './styles/custom-lat-lng.css'
import './styles/markers.css'
import './styles/profile.css'
import 'flatpickr/dist/themes/material_green.css'


if (conf["env"] !== "prod") {
	localStorage.setItem("debug", "bolt:*")
} 


const stores = {
	AuthStore,
	AxiosStore,
	FlashStore,
	UiStore,

	HistoryController,
	MapController,

	ViewingProfileStore,
	LoginForm,
	RegisterForm,

	EventCache,
	EventListCache,
	ViewingEventStore,
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
