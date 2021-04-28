import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Booking from './Booking'
import React, { useEffect } from 'react'
import ErrorPage from './ErrorPage'
import NavigationBar from './components/NavigationBar'
import AdminPage from './components/AdminPage/AdminPage'
import Home from './Home'
import Profile from './components/Profile'
import AuthDataProvider, { getAuthData } from './LoginBackend'
import { IconContext } from 'react-icons'

const url = 'http://localhost:8000/logins'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const tokens = getAuthData()
  // TODO: Authenticate here As in Login.jsx should probable be refactored.

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

/**
 *
 *
 * @returns The react-component that gather all react-components we are using
 * with a Router with our own NavigationBar
 *
 * IconContext.Provider gives the opportiunity to set style to all icons at once.
 * The styles can be overitten by the components if the standard doesn´t fit.
 *
 * @see{@link (https://reactrouter.com/)}
 *
 *
 *
 * @version 0.1.0
 *
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 * @author [Jonas Nordin](https://github.com/jonasn-chalmers)
 * @author [Erik Antilla Ryderup](https://github.com/0x3D)
 * @author [Erik Bengtsson](https://github.com/erikbengtssonchalmers)
 * @author [Theodor Lyrheden](https://github.com/theodorlyrheden)
 * @author [Filip Hansson](https://github.com/filiphan)
 * @author [Oliver Österberg](https://github.com/oliost)
 */
function App () {
  document.title = 'MSDOS Booking'
  return (

    <>
      <IconContext.Provider value={{ color: 'cornflowerblue', size: '50px' }}>
        <Router>
          <AuthDataProvider>
            <NavigationBar />
            <Switch>
              <Route exact path='/home' component={Home} />
              <PrivateRoute exact path='/booking' component={Booking} />
              <Route exact path='/profile' component={Profile} />
              <Redirect exact from='/' to='/booking' />
              <Route path='/admin' component={AdminPage} />
              <Route path='/' component={ErrorPage} />
            </Switch>
          </AuthDataProvider>
        </Router>
      </IconContext.Provider>
    </>
  )
}

export default App
