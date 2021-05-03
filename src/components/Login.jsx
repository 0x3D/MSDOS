import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Col, Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/login.css'
import { Redirect } from 'react-router-dom'
import { authenticateUser, useAuth, getAuthData } from '../LoginBackend'

/* export default function Login(props) {
  const { basicLogin } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleClose = () => setShowHelp(false);
  const handleShow = () => setShowHelp(true);
  const referrer = document.referrer || "/";
  const url = "http://localhost:8000/users?"; */

export default function Login (props) {
  const { basicLogin } = useAuth()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const handleClose = () => setShowHelp(false)
  const handleShow = () => setShowHelp(true)
  const referrer = document.referrer || '/'
  const url = 'http://localhost:8000/users?'
  // console.log("referrer url",referrer);

  if (isLoggedIn) {
    return <Redirect path={referrer} />
  }

  const handleLogin = async (e) => {
    // TODO: Add token here
    fetch(url + 'apartmentNo=' + username).then(
      response => response.json()
    ).then(json => {
      console.log(json)
      if (json['0'] && json['0'].password === password) {
        console.log('yippie')
        // TODO save password hashed
        // const userTokens = authenticateUser(username, password)
        basicLogin(json['0'])
      } else {
        console.log('Nay')
      }
    })
    setLoggedIn(true)
    // console.log(json)
  }

  function validateForm () {
    // TODO: Add check for password security and proper email here
    return username.length > 0 && password.length > 0
  }

  return (
    <Container className='loginContainer'>
      {isLoggedIn ? <Redirect exact path='/booking' /> : <h1> &nbsp;</h1>}
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
            className='loginForm'
            onSubmit={() => {
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
              <Button type='submit' disabled={!validateForm()}>
                Sign in
              </Button>
              <Col xs={1}>&nbsp;</Col>
              <Button
                type='button'
                onClick={() => {
                  handleShow()
                }}
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
