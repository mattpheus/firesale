import React from 'react'
import authService from '../../services/authService.js'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute ({ component: Component, ...rest }) {
  return (
    <Route
    exact
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute