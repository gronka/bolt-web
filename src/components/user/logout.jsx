import React from 'react'
import { Redirect } from 'react-router-dom'

import AuthStore from '../../stores/AuthStore'


const Logout = ({ component: Component, ...rest }) => {
	AuthStore.logout()

  return (
		<Redirect to={{ pathname: '/events' }} />
  )
}


export default Logout
