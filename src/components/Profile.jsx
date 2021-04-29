import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Toast } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import CheckBox from '../assets/greenCheck.png'
import getAuthData from '../LoginBackend'
const localStorage = window.localStorage

/**
 * The Profile component is the component that show the info of the users that are logged in.
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function Profile () {
  const currentUser = JSON.parse(localStorage.getItem('tokens')).apartmentNo

  /*
  * formatLghNr is a method that format the string how we communicate to the jsonplaceholder
  * @returns a right formed string to ask the database for the inforamtion we want
  */
  const formatLghNr = () => {
    return 'apartmentNo=' + String(currentUser)
  }

  /**
   * usersData is a variables, and setUserData is a set-method for the variable
   * Usestate is the default value
   * @constant usersData holds the data
   * @method setUsers sets the data
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [userData, setUserData] = useState(null)

  /**
   * laundryBookings is a variables, and setLaundryBookings is a set-method for the variable
   * Usestate is the default value
   * @constant laundryBookings holds the data
   * @method setLaundryBookings sets the data
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [laundryBookings, setLaundryBookings] = useState(null)

  const [showToast, setShowToast] = useState(false)
  /**
   * method that handle the Toast
   */
  const toggleShowToast = () => { setShowToast(!showToast) }

  /*
  * Fetches the Userdata from jsonPlaceHolder
  * @constant response is what the jsonplaceholder gives us
  * @constant data is the data we formatting to a JSON
  */
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8000/users?apartmentNo=' + String(currentUser))
    const data = await response.json()
    setUserData(data)
  }

  /**
     * Fetches the laundryBooking from jsonPlaceHolder
     * @constant response is what the jsonplaceholder gives us
     * @constant data is the data we formatting to a JSON
     */
  const fetchBookings = async () => {
    const response = await fetch('http://localhost:8000/laundryBookings?' + formatLghNr())
    const data = await response.json()
    setLaundryBookings(data)
  }

  const removeBooking = async (e) => {
    const id = String(e)
    fetch('http://localhost:8000/laundryBookings/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
    toggleShowToast()
  }

  /**
     * useEffect is a React function that is used to not rerender uneccesary thing
     */
  useEffect(() => {
    fetchBookings()
    fetchUsers()
  }, [])

  return (
    <div>
      {console.log(currentUser)}
      <Container>
        <Row>
          <Col>
            <h3>
              <h3>
                <b>Email:</b>
              </h3> {!userData
                ? (<h2>Not logged in</h2>)
                : (
                    JSON.parse(localStorage.getItem('tokens')).email
                  )}
            </h3>
          </Col>

          <Col>
            <h3>
              <h3><b>Lägenhetsnummer: </b> </h3> {currentUser}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Toast show={showToast} onClose={toggleShowToast}>
              <Toast.Header>
                <img width='35px' src={CheckBox} alt='' />
                <strong className='mr-auto'>Bokning borttagen</strong>
              </Toast.Header>
              <Toast.Body>
                Din bokning har blivit borttagen. Klicka här för att uppdatera sidan
              </Toast.Body>
              <Toast.Body> <Button onClick={(e) => { window.location.reload() }}>   <Icon.ArrowCounterclockwise /> </Button> </Toast.Body>
            </Toast>
          </Col>
        </Row>
        {!laundryBookings
          ? (<h1>loading...</h1>)
          : (
            <Card style={{}}>
              <Card.Header as='h3'> <b>Mina Bokningar</b> </Card.Header> <br />
              {laundryBookings.map((row) => (
                <>
                  <Card.Text className='border' key={row.start_time}>
                    <b>StartTime</b> : {row.start_time} <br /> <b>Sluttid</b> : {row.end_time} <br />
                    <Button
                      variant='danger' onClick={(e) => {
                        removeBooking(row.id)
                      }}
                    >Ta bort bokning
                    </Button>
                  </Card.Text>
                </>
              ))}
            </Card>
            )}
      </Container>

    </div>
  )
}
