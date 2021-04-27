import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink, Link, useHistory } from 'react-router-dom'
import '../styles/Navbar.css'
import Logo from '../assets/msdos-logo.png'
import { BsCalendar } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { useAuth } from '../LoginBackend'


export default function NavigationBar () {
  const whiteText = { color: 'white' }
  const { basicLogout } = useAuth()
  // const backend = new LoginBackend()
  const history = useHistory()
  const handleLogOut = (e) => {
    const result = basicLogout()
    history.push('/')
  }

  return (
    <Navbar sticky='top' bg='dark' variant='dark'>

      <Link to='/booking'>
        <img width='42px' height='auto' className='img-responsive' src={Logo} alt='logo' />
      </Link>

      <Nav className='mr-auto ml-auto'>
        <Nav.Link   as={NavLink} to='/booking' activeStyle={whiteText} activeClassName='selected-tab'><BsCalendar size="1em"/> Boka </Nav.Link>
        <Nav.Link as={NavLink} to='/profile' activeStyle={whiteText} activeClassName='selected-tab'> <MdAssignment size="1.25em"/> Mina bokningar</Nav.Link>
      </Nav>

      <Nav>
        <NavDropdown  title='My account' variant='dark' >
          <NavDropdown.Item><Link to='/home'>Login</Link></NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}
