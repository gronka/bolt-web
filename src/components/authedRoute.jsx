import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthStore from '../stores/AuthStore'


const AuthedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = AuthStore.isLoggedIn()

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}


export default AuthedRoute
