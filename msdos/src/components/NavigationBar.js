import React from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import '../styles/Navbar.css'
import Logo from '../assets/msdos-logo.png'

export default function NavigationBar() {
    const whiteText = {color: "white" }


    return (
        <Navbar sticky="top" bg="dark" variant="dark">
            <Navbar.Brand href="/home">
                <Link to="/home">
                    <img width="42px" height="auto" className="img-responsive" src={Logo}  alt="logo" />
                </Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/home" activeStyle={whiteText} activeClassName="selected-tab">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/test" activeStyle={whiteText} activeClassName="selected-tab">Test</Nav.Link>
            </Nav>
            {/* <Form inline>
            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form> */}
        </Navbar>
    )
}
