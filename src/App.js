import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Booking from './Booking';
import ErrorPage from './ErrorPage';
import NavigationBar from './components/NavigationBar';
import AdminPage from './components/AdminPage/AdminPage';
import Profile from './components/Profile';

function App() {
  document.title = 'MSDOS Booking'
  return (
    <>
      <Router>
        <NavigationBar/>
        
        <Switch>
          <Route exact path="/booking" component={Booking} />
          <Route path="/profile" component={Profile} />
          <Redirect exact from="/" to="/booking"/>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
