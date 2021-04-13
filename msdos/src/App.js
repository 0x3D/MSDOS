import './styles/App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, Form, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Home} from './Home';
import {Test} from './Test'

function App() {
  document.title = 'MSDOS Booking'
  return (
    <>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Navbar.Brand href="/home">MSDOS</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/test">Test</Nav.Link>
          </Nav>
          {/* <Form inline>
            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form> */}
        </Navbar>

      <Router>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/test" component={Test}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;