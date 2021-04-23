import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Booking from './Booking'
import ErrorPage from './ErrorPage'
import NavigationBar from './components/NavigationBar'
import AdminPage from './components/AdminPage/AdminPage'
import Home from './Home'
import LoginBackend from './LoginBackend'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const backend = new LoginBackend()
  const token = localStorage.getItem('loginToken')
  const auth = backend.authenticateToken(token)

  // Add your own authentication on the below line.
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
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
function App() {
  document.title = 'MSDOS Booking'
  if (localStorage) {
    return (
      <>
        <Router>
          <NavigationBar />

          <Switch>
            <Route exact path='/home' component={Home} />
            <PrivateRoute exact path='/booking' component={Booking} />
            <Redirect exact from='/' to='/booking' />
            <Route path='/admin' component={AdminPage} />
            <Route path='/' component={ErrorPage} />
          </Switch>
        </Router>
      </>
    )
  }
};

export default App