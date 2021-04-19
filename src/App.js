import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Booking from './Booking';
import Test from './Test';
import ErrorPage from './ErrorPage';
import NavigationBar from './components/NavigationBar';
import AdminPage from './components/AdminPage/AdminPage';

function App() {
  document.title = 'MSDOS Booking'
  return (
    <>
      <Router>
        <NavigationBar/>
        
        <Switch>
          <Route exact path="/booking" component={Booking} />
          <Route path="/test" component={Test} />
          <Redirect exact from="/" to="/booking"/>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
