import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import '../styles/Navbar.css'
import Logo from '../assets/msdos-logo.png'
import LoginBackend from '../LoginBackend'
import { useHistory } from 'react-router-dom';

export default function NavigationBar () {
  const whiteText = { color: 'white' }
  //const backend = new LoginBackend()
  let history = useHistory();
  const handleLogOut = (e) => {
    //const result = backend.basicLogout(); history.push('/')
  }

  return (
    <Navbar sticky='top' bg='dark' variant='dark'>

      <Link to='/booking'>
        <img width='42px' height='auto' className='img-responsive' src={Logo} alt='logo' />
      </Link>

      <Nav className='mr-auto ml-auto'>
        <Nav.Link as={NavLink} to='/booking' activeStyle={whiteText} activeClassName='selected-tab'>Boka</Nav.Link>
        <Nav.Link as={NavLink} to='/profile' activeStyle={whiteText} activeClassName='selected-tab'>Mitt konto</Nav.Link>
      </Nav>

      <Nav>
        <NavDropdown title="Login" variant='dark'>
          <NavDropdown.Item>My account</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}
