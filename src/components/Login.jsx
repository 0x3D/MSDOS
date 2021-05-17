import React, { useState } from 'react'
import { Form, Container, Row, Col, Button, Modal, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/login.css'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../LoginBackend'
import { getData } from '../Fetcher'

/**
* Loginpage to login user. Uses loginbackend to login user. Also checks if
* password is correct.
* TODO: Refactor into another file password logic.
* @param {*} props
* @returns React component with the login page.
*/
export default function Login (props) {
  const { basicLogin } = useAuth()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [alert, setAlert] = useState(false)
  const handleClose = () => setShowHelp(false)
  const handleShow = () => setShowHelp(true)
  const alertShow = () => setAlert(true)
  const alertClose = () => setAlert(false)
  const referrer = document.referrer || '/'
  const url = 'http://localhost:8000/'
  const userTable = 'users?'
  const userCondition = 'apartmentNo=' + username

  if (isLoggedIn) {
    return <Redirect path={referrer} />
  }

  const handleLogin = async (e) => {
    const json = await getData(url, userTable, userCondition)
    if (json[0] && json[0].password === password) {
      basicLogin(json[0])
      setLoggedIn(true)
    } else {
      console.log('login failed')
      alertShow()
    }
  }

  function validateForm () {
    // TODO: Add check for password security and proper email here
    return username.length > 0 && password.length > 0
  }

  return (
    <Container className='loginContainer'>
      <Alert show={alert} variant='danger' onClose={() => alertClose()} dismissible>
        <Alert.Heading>
          Du loggades inte in
        </Alert.Heading>
        <p>
          Kontrollera användarnamn och lösenord och försök igen.
        </p>
      </Alert>

      {isLoggedIn ? <Redirect exact path='/booking' /> : <h1> &nbsp;</h1>}
      <Modal show={showHelp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hjälp</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kontakta din administratör för att skapa en konto.</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Row className='justify-content-md-center'>
        <Col xs={5} xs-offset={2}>
          <Form
            className='loginForm'
            onSubmit={(e) => {
              e.preventDefault()
              handleLogin()
            }}
          >
            <Form.Group controlId='formBasicUsername'>
              <Form.Label> Apartment Number </Form.Label>
              <Form.Control
                autoFocus
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='47'
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label> Password </Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
              />
            </Form.Group>
            <Row  className='justify-content-md-center' className='login'>
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
