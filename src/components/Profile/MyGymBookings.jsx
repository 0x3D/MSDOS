import React, { useState, useCallback, useEffect } from 'react'
import GymBooking from '../Bookings/GymBooking'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import { getData, deleteData } from '../../Fetcher'
import {
  Card,
  Button,
  Toast,
  Modal
} from 'react-bootstrap'

export default function MyGymBookings ({ loggedIn }) {
  /**
     * Constants for the fetcher methods
     */
  const url = 'http://localhost:8000/'
  const gymBookingsTable = 'gymBookings/'
  const userCondition = '?apartmentNo=' + String(loggedIn)

  /**
     * gymBookings is a variable, and setGymBookings is a set-method for the variable
     * Usestate is the default value
     * @constant gymBookings holds the data
     * @method setGymBookings sets the data
     * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
     */
  const [gymBookings, setGymBookings] = useState(null)

  /**
     * showToast is a boolean, and setShowToast is a set-method for the boolean
     * Usestate is the default value
     * @constant showToast holds the data
     * @method setShowToast sets the data
     * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
     */
  const [showToast, setShowToast] = useState(false)

  /**
     * showModal is a boolean, and setShowModal is a set-method for the boolean
     * Usestate is the default value
     * @constant showModal holds the data
     * @method setShowModal sets the data
     * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
     */
  const [showModal, setShowModal] = useState(false)

  /**
     * tempBookingId is a variables, and setTempBookingId is a set-method for the variable
     * Usestate is the default value
     * @constant tempBookingId holds the data
     * @method setTempBookingId sets the data
     * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
     */
  const [tempBookingId, setTempBookingId] = useState(null)

  /**
     * method that handle the Toast
     */
  const toggleShowToast = () => { setShowToast(!showToast) }

  /**
       * @returns a setter for @constant showModal boolean value that is true
       */
  const handleShow = () => setShowModal(true)

  /**
       * @returns a setter for @constant showModal boolean value that is false
       */
  const handleClose = () => setShowModal(false)

  /**
    * @method removeBooking is a async function that removes the booking for a specifik user from the DB
    * @param {is the event} e
    */
  const removeBooking = async (e) => {
    const id = String(e)
    deleteData(url, gymBookingsTable, id)
    toggleShowToast()
  }

  /**
     * method that handles the edited booking
     * @param {event} e
     */
  const handleEditBooking = (e) => {
    handleShow()
    setTempBookingId(String(e))
  }
  /**
    * Fetches the gymbookings from jsonPlaceHolder
    * @constant response is what the jsonplaceholder gives us
    * @constant data is the data we formatting to a JSON
    */
  const fetchBookings = useCallback(async () => {
    const data = await getData(url, gymBookingsTable, userCondition)
    setGymBookings(data)
  }, [userCondition])

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return (
    <div>
      <div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100
          }}
        >
          <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
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
        </div>

        {!gymBookings
          ? (<h1>loading...</h1>)
          : (
            <Card style={{}}>
              <Card.Header as='h3'>
                {' '}
                <b>Mina gymbokningar</b>{' '}
              </Card.Header>{' '}
              <br />
              {gymBookings.map((row) => (
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
              ))}
            </Card>
            )}

        <Modal size='xl' show={showModal} onHide={handleClose}>
          {console.log(tempBookingId)}
          <Modal.Header closeButton>
            <Modal.Title> Välj ny tid för att redigera din bokning</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <GymBooking
              removeFunction={removeBooking}
              temporaryBookingId={tempBookingId}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}> Stäng </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}