import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Col, Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/login.css'
import LoginBackend from '../LoginBackend'
import { Redirect } from 'react-router'

export default function Login() {
  const backend = new LoginBackend()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showHelp, setShowHelp] = useState(false);
  const handleClose = () => setShowHelp(false)
  const handleShow = () => setShowHelp(true)

  let loggedIn = false; 

  useEffect(() => {
    loggedIn = () => {backend.authenticateToken()}
  })

  const handleLogin = (e) => {
    const result = backend.basicLogin(email, password)
    if (result) {
      // this.context.router.push("/booking");
    }
  }

  function validateForm() {
    // TODO: Add check for password security and proper email here
    return email.length > 0 && password.length > 0
  }

  return (
    <Container classname='loginContainer'>
    {loggedIn ? <Redirect to="/booking"></Redirect> : <h1> &nbsp;</h1> }
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
