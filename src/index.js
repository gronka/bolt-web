import React from 'react'
import ReactDOM from 'react-dom'
import BaseRouter from './components/base'
import { Provider } from 'mobx-react'

import AuthStore from './stores/AuthStore'
import AxiosStore from './stores/AxiosStore'
import FlashStore from './stores/FlashStore'
import LoginForm from './stores/LoginForm'
import MapStore from './stores/MapStore'
import RegisterForm from './stores/RegisterForm'
import UiStore from './stores/UiStore'

import './styles/base.css'
import './styles/landing.css'
import './styles/portal.css'
import './styles/two-col-simple.css'

const stores = {
	AuthStore,
	AxiosStore,
	FlashStore,
	LoginForm,
	MapStore,
	RegisterForm,
	UiStore,
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
