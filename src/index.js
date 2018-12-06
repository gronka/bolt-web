import React from 'react'
import ReactDOM from 'react-dom'
import BaseRouter from './components/base'
import { Provider } from 'mobx-react'

import AuthStore from './stores/AuthStore'
import AxiosStore from './stores/AxiosStore'
import FlashStore from './stores/FlashStore'
import UiStore from './stores/UiStore'

import HistoryController from './stores/HistoryController'
import MapController from './stores/MapController'

import CurrentProfileStore from './stores/CurrentProfileStore'
import LoginForm from './stores/LoginForm'
import RegisterForm from './stores/RegisterForm'

import EventCache from './stores/EventCache'
import EventListCache from './stores/EventListCache'
import CurrentEventStore from './stores/CurrentEventStore'
import EventCreateForm from './stores/EventCreateForm'
import CurrentEventList from './stores/CurrentEventList'
import CurrentSlatedEventList from './stores/CurrentSlatedEventList'

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

const stores = {
	AuthStore,
	AxiosStore,
	FlashStore,
	UiStore,

	HistoryController,
	MapController,

	CurrentProfileStore,
	LoginForm,
	RegisterForm,

	EventCache,
	EventListCache,
	CurrentEventStore,
	EventCreateForm,
	CurrentEventList,
	CurrentSlatedEventList,
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
