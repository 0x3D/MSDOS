import React, { useState } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/login.css'
import LoginBackend from '../LoginBackend'

export default function Login () {
  const backend = new LoginBackend()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (e) => {
    // e.preventDefault();
    const result = backend.basicLogin(email, password)
    if (result) {
      // this.context.router.push("/booking");
    }
  }

  function validateForm () {
    // TODO: Add check for password security and proper email here
    return email.length > 0 && password.length > 0
  }

  return (
    <Container classname='loginContainer'>
      <Row className='justify-content-md-center'>
        <Col xs={5}>
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
      </Row>
    </Container>
  )
}
