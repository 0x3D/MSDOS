import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Booking from './Booking';
import Test from './Test';
import ErrorPage from './ErrorPage'
import NavigationBar from './components/NavigationBar'
import AdminPage from './components/AdminPage/AdminPage'
import Home from './Home';
import LoginBackend from './LoginBackend'

    
  const PrivateRoute = ({ component: Component, ...rest }) => {

    let backend = new LoginBackend();
    const token = localStorage.getItem('loginToken');
    let auth = backend.authenticate_token(token);

    // Add your own authentication on the below line.  
    return (
      <Route
        {...rest}
        render={props =>
          auth ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
          )
        }
      />
    )
  }


function App() {
  document.title = 'MSDOS Booking'
  if(localStorage)
  return (
    <>
      <Router>
        <NavigationBar/>
        
        <Switch>
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/booking" component={Booking} />
          <PrivateRoute path="/test" component={Test} />
          <Redirect exact from="/" to="/booking"/>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
