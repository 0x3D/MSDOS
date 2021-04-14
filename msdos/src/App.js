import './styles/App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import NavigationBar from './components/NavigationBar'


function App() {
  document.title = 'MSDOS Booking'
  return (
    <>
      <Router>
        <NavigationBar/>
        
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/test" component={Test} />
          <Redirect to="/home"/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
