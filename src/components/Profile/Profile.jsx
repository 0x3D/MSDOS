import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { getAuthData } from '../../LoginBackend'
import { getData} from '../../Fetcher'
import MyLaundryBookings from './MyLaundryBookings'
import MyGymBookings from './MyGymBookings'

/**
 * The Profile component is the component that show the info of the users that are logged in.
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */

export default function Profile() {
  const currentUser = getAuthData().apartmentNo
  const url = 'http://localhost:8000/'
  const userTable = 'users'
  const userCondition = '?apartmentNo=' + String(currentUser)

  // const [tempBookingId, setTempBookingId] = useState(null)

  /**
   * Modal that is supposed to work for rebooking
   */
  // const [showModal, setShowModal] = useState(false)
  // const handleShow = () => setShowModal(true)
  // const handleClose = () => setShowModal(false)

  /**
   * usersData is a variables, and setUserData is a set-method for the variable
   * Usestate is the default value
   * @constant usersData holds the data
   * @method setUsers sets the data
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [userData, setUserData] = useState(null)

  // const [showToast, setShowToast] = useState(false)
  // /**
  //  * method that handle the Toast
  //  */
  // const toggleShowToast = () => { setShowToast(!showToast) }

  /*
   * Fetches the Userdata from jsonPlaceHolder
   * @constant response is what the jsonplaceholder gives us
   * @constant data is the data we formatting to a JSON
   */


  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  
  const fetchUsers = useCallback(async () => {
    const data = await getData(url, userTable, userCondition)
    setUserData(data)
  }, [userCondition])


  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              <h3>
                <h3>
                  <b>Email:</b>
                </h3>{' '}
                {!userData
                  ? (<h2>Not logged in</h2>)
                  : (
                    userData[0].email
                  )}
              </h3>
            </Col>

            <Col>
              <h3>
                <h3>
                  <b>Lägenhetsnummer: </b>{' '}
                </h3>{' '}
                {currentUser}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              {/* {Sätt in bekräftelse på bokning här} */}
            </Col>
          </Row>
          <Row>
            <Col> {/* LaundryBookings */} <MyLaundryBookings loggedIn={currentUser} /> </Col>
          </Row>
          <Row>
            <Col> {/* GymBookings */} <MyGymBookings loggedIn={currentUser} /> </Col>
          </Row>
          <Row>
            <Col> {/* RoomBookings */} Room </Col>
          </Row>

        </Container>
      </div>

      {/* <Modal size='xl' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Välj ny tid för att redigera din bokning</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <LaundryBooking
            removeFunction={removeBooking}
            temporaryBookingId={tempBookingId}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}> Stäng </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}
