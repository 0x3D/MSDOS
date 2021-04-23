import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Col, Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/login.css'
import { Link, Redirect } from "react-router-dom";
import { authenticateUser, AuthDataContext, useAuth, getAuthData} from '../LoginBackend'

export default function Login (props) {
  const { basicLogin } = useAuth();
  let [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const handleClose = () => setShowHelp(false)
  const handleShow = () => setShowHelp(true)
  var referrer = document.referrer || '/';
  // console.log("referrer url",referrer);

  if(isLoggedIn){
    return (<Redirect to={referrer}/>)
  }


  const handleLogin = (e) => {
    // TODO: Add token here
    const userTokens = authenticateUser(email,password)
    basicLogin(userTokens)
    setLoggedIn(true)
  }

  function validateForm () {
    // TODO: Add check for password security and proper email here
    return email.length > 0 && password.length > 0
  }

  let tokens = getAuthData()
  // TODO: Authenticate here

  if (tokens) {
    setLoggedIn(true)
  }

  return (
    <Container classname='loginContainer'>
    {isLoggedIn ? <Redirect to='/booking' /> : <h1> &nbsp;</h1>}
      <Modal show={showHelp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>To create a login ask your administrator</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Row className='justify-content-md-center'>
        <Col xs={5} xs-offset={2}>
          <Form classname='loginForm'>
            <Form.Group controllId='formBasicEmail'>
              <Form.Label> Email adress </Form.Label>
              <Form.Control
                autoFocus
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controllerId='formBasicPassword'>
              <Form.Label> Password </Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Button
          type='submit'
          disabled={!validateForm()}
          onClick={() => {
            console.log('Starting to handle login')
            handleLogin()
          }}
        >
          Sign in
        </Button>
        <Col xs={1}>&nbsp;</Col>
        <Button
          type='help'
          onClick={() => { handleShow() }}
        >
          Help
        </Button>
      </Row>
    </Container>
  )
}
