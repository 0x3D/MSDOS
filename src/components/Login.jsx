import React, { useState } from 'react'
import { Form, Container, Row, Col, Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/login.css'
import { Redirect } from 'react-router-dom'
import { authenticateUser, useAuth, getAuthData } from '../LoginBackend'

export default function Login (props) {
  const { basicLogin } = useAuth()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const handleClose = () => setShowHelp(false)
  const handleShow = () => setShowHelp(true)
  const referrer = document.referrer || '/'
  // console.log("referrer url",referrer);

  if (isLoggedIn) {
    return (<Redirect to={referrer} />)
  }

  const handleLogin = (e) => {
    // TODO: Add token here
    const userTokens = authenticateUser(username, password)
    basicLogin(userTokens)
    setLoggedIn(true)
  }

  function validateForm () {
    // TODO: Add check for password security and proper email here
    return username.length > 0 && password.length > 0
  }

  const tokens = getAuthData()
  // TODO: Authenticate here. authentication should probably be factored out into another file

  // if authenticated(tokens) check instead
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
          <Form
            classname='loginForm' onSubmit={() => {
              console.log('Starting to handle login')
              handleLogin()
            }}
          >
            <Form.Group controllId='formBasicUsername'>
              <Form.Label> Apartment Number </Form.Label>
              <Form.Control
                autoFocus
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='47'
              />
            </Form.Group>
            <Form.Group controllerId='formBasicPassword'>
              <Form.Label> Password </Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
              />
            </Form.Group>
            <Row className='justify-content-md-center'>
              <Button
                type='submit'
                disabled={!validateForm()}
              >
                Sign in
              </Button>
              <Col xs={1}>&nbsp;</Col>
              <Button
                type='button'
                onClick={() => { handleShow() }}
              >
                Help
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>

    </Container>
  )
}
