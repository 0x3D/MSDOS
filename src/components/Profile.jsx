import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Toast,
  Modal
} from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'
import LaundryBooking from './Bookings/LaundryBooking'
import { getAuthData } from '../LoginBackend'
import { getData, deleteData } from '../Fetcher'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import '../styles/Profile.css'
import { MdRefresh } from 'react-icons/md'

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
  const currentUser = getAuthData().apartmentNo
  const url = 'http://localhost:8000/'
  const userTable = 'users'
  const laundryBookingsTable = 'laundryBookings/'
  const userCondition = '?apartmentNo=' + String(currentUser)

  const [tempBookingId, setTempBookingId] = useState(null)

  /**
   * Modal that is supposed to work for rebooking
   */
  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

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
  const fetchUsers = useCallback(async () => {
    const data = await getData(url, userTable, userCondition)
    setUserData(data)
  }, [userCondition])

  /**
   * Fetches the laundryBooking from jsonPlaceHolder
   * @constant response is what the jsonplaceholder gives us
   * @constant data is the data we formatting to a JSON
   */
  const fetchBookings = useCallback(async () => {
    const data = await getData(url, laundryBookingsTable, userCondition)
    setLaundryBookings(data)
  }, [userCondition])

  /**
   * @method removeBooking is a async function that removes the booking for a specifik user from the DB
   * @param {is the event} e
   */
  const removeBooking = async (e) => {
    const id = String(e)
    deleteData(url, laundryBookingsTable, id)
    toggleShowToast()
  }

  const handleEditBooking = (e) => {
    handleShow()
    setTempBookingId(String(e))
  }

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchBookings()
    fetchUsers()
  }, [fetchBookings, fetchUsers])

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
                      JSON.parse(localStorage.getItem('tokens')).email
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
              <Toast show={showToast} onClose={toggleShowToast}>
                <Toast.Header>
                  <FaCheck size='2em' />
                  <strong className='mr-auto'>Bokning borttagen</strong>
                </Toast.Header>
                <Toast.Body>
                  Din bokning har blivit borttagen. Klicka här för att uppdatera
                  sidan
                </Toast.Body>
                <Toast.Body>
                  {' '}
                  <Button
                    onClick={(e) => {
                      window.location.reload()
                    }}
                  >
                    <MdRefresh size='1.5em' />
                  </Button>{' '}
                </Toast.Body>
              </Toast>
            </Col>
          </Row>
          {!laundryBookings
            ? (<h1>loading...</h1>)
            : (
              <Card style={{}}>
                <Card.Header as='h3'>
                  {' '}
                  <b>Mina Bokningar</b>{' '}
                </Card.Header>{' '}
                <br />
                {laundryBookings.map((row) => (
                  <React.Fragment key={row.start_time}>
                    <Card.Text className='border' key={row.start_time}>
                      <b>Starttid</b> : {row.start_time} <br /> <b>Sluttid</b> :{' '}
                      {row.end_time} <br />
                      <Button
                        className='btn-primary-spacing'
                        variant='danger'
                        onClick={(e) => {
                          removeBooking(row.id)
                        }}
                      >
                        <BsFillTrashFill size='1.5em' />
                        Ta bort bokning
                      </Button>
                      <Button
                        className='btn-primary-spacing'
                        onClick={(e) => {
                          handleEditBooking(row.id)
                        }}
                      >
                        <AiFillEdit size='1.5em' /> Redigera bokning
                      </Button>
                    </Card.Text>
                  </React.Fragment>
                ))}
              </Card>
              )}
        </Container>
      </div>
      <Modal size='xl' show={showModal} onHide={handleClose}>
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
      </Modal>
    </>
  )
}
