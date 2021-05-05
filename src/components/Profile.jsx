import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Toast,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter
} from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { FaCheck } from 'react-icons/fa'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import LaundryBooking from './Bookings/LaundryBooking'
import { getAuthData } from '../LoginBackend'
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import '../styles/Profile.css'



const localStorage = window.localStorage
const fetch = window.fetch

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
  const toggleShowToast = () => {
    setShowToast(!showToast)
  }

  /*
   * Fetches the Userdata from jsonPlaceHolder
   * @constant response is what the jsonplaceholder gives us
   * @constant data is the data we formatting to a JSON
   */
  const fetchUsers = useCallback(async () => {
    const response = await fetch(
      'http://localhost:8000/users?apartmentNo=' + String(currentUser)
    )
    const data = await response.json()
    setUserData(data)
  }, [currentUser])

  /**
   * Fetches the laundryBooking from jsonPlaceHolder
   * @constant response is what the jsonplaceholder gives us
   * @constant data is the data we formatting to a JSON
   */
  const fetchBookings = useCallback(async () => {
    const response = await fetch(
      'http://localhost:8000/laundryBookings?apartmentNo=' + String(currentUser)
    )
    const data = await response.json()
    setLaundryBookings(data)
  }, [currentUser])

  /**
   * @method removeBooking is a async function that removes the booking for a specifik user from the DB
   * @param {is the event} e
   */
  const removeBooking = async (e) => {
    const id = String(e)
    fetch('http://localhost:8000/laundryBookings/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json)
      .then(res => console.log(res))
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
                  ? (
                    <h2>Not logged in</h2>
                    )
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
                    {' '}
                    <Icon.ArrowCounterclockwise />{' '}
                  </Button>{' '}
                </Toast.Body>
              </Toast>
            </Col>
          </Row>
          {!laundryBookings
            ? (
              <h1>loading...</h1>
              )
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
                        <BsFillTrashFill size="1.5em"/>
                       Ta bort bokning
                      </Button>
                      <Button className='btn-primary-spacing'
                        onClick={(e) => {
                          handleEditBooking(row.id)
                        }}
                      >
                      <AiFillEdit size="1.5em"/> Redigera bokning
                      </Button>
                    </Card.Text>
                  </React.Fragment>
                ))}
              </Card>
              )}
        </Container>
      </div>
      <Modal size='xl' show={showModal} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle> Välj ny tid för att redigera din bokning</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <LaundryBooking
            removeFunction={removeBooking}
            temporaryBookingId={tempBookingId}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}> Stäng </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
