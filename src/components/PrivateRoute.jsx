import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const localStorage = window.localStorage
export default function PrivateRoute ({ component: Component, ...rest }) {
  const tokens = JSON.parse(localStorage.getItem('tokens'))
  return (
    <Route
      {...rest}
      render={props =>
        tokens
          ? (
            <Component {...props} />
            )
          : (
            <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            )}
    />
  )
}
