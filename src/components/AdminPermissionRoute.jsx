import React from 'react'
import { getAuthData } from '../LoginBackend'
import { Route, Redirect } from 'react-router-dom'

export default function AdminPermissionRoute({ component: Component, role }) {
    role = getAuthData().role
    return (
        <Route
            render={props =>
                role === 'admin'
                    ? (
                        <Component {...props} />
                    )
                    : (
                        <Redirect to={{ pathname: '/booking', state: { from: props.location } }} />
                    )}
        />
    )
}
