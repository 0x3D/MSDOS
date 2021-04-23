import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import '../styles/Navbar.css'
import Logo from '../assets/msdos-logo.png'

export default function NavigationBar () {
  const whiteText = { color: 'white' }

  return (
    <Navbar sticky='top' bg='dark' variant='dark'>

      <Link to='/booking'>
        <img width='42px' height='auto' className='img-responsive' src={Logo} alt='logo' />
      </Link>

      <Nav className='mr-auto ml-auto'>
        <Nav.Link as={NavLink} to='/booking' activeStyle={whiteText} activeClassName='selected-tab'>Boka</Nav.Link>
        <Nav.Link as={NavLink} to='/profile' activeStyle={whiteText} activeClassName='selected-tab'>Mitt konto</Nav.Link>
      </Nav>
    </Navbar>
  )
}
