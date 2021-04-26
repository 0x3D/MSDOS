import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import getAuthData from '../LoginBackend'

/**
 * The Profile component is the component that show the info of the users that are logged in.
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function Profile () {
  // TODO: När inloggningen är klar måste ni skicka vilket lägenhetsnummer
  // som är inloggad, använder currentUser sålänge
  const currentUser = getAuthData().props.value.authData.apartmentNo

  /**
     * formatLghNr is a method that format the string how we communicate to the jsonplaceholder
     * @returns a right formed string to ask the database for the inforamtion we want
     */
  const formatLghNr = () => {
    return 'lghNr=' + String(currentUser)
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

  /**
     * Fetches the Userdata from jsonPlaceHolder
     * @constant response is what the jsonplaceholder gives us
     * @constant data is the data we formatting to a JSON
     */
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8000/users?' + formatLghNr())
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

  /**
     * useEffect is a React function that is used to not rerender uneccesary thing
     */
  useEffect(() => {
    fetchBookings()
    fetchUsers()
  }, [])

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>
              <h3>
                <b>Email:</b>
              </h3> {!userData
                ? (<h2>Not logged in</h2>)
                : (userData[0].email)}
            </h3>
          </Col>

          <Col>
            <h3>
              <h3><b>Lägenhetsnummer: </b></h3> {currentUser}
            </h3>
          </Col>
        </Row>
        {!laundryBookings
          ? (<h1>loading...</h1>)
          : (
            <Card style={{}}>
              <Card.Header as='h3'> <b>Mina Bokningar</b> </Card.Header> <br />
              {/* TODO: This gives warning (Missing "key" prop for element in
              iterator. Shorthand fragment syntax does not support providing keys.
               Use React.Fragment instead) changing map to forEach solves warning
               but breaks app. Can't see bookings */}
              {laundryBookings.map((row) => (
                <>
                  <Card.Text className='border'>
                    <b>StartTime</b> : {row.start_time} <br /> <b>Sluttid</b> : {row.end_time} <br />
                    <Button variant='danger'>Ta bort bokning</Button>
                  </Card.Text>
                </>
              ))}
            </Card>
            )}
      </Container>
    </div>
  )
}
