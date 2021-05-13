import React, { useState, useEffect } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addHours } from 'date-fns'
import { Button, Modal, Alert } from 'react-bootstrap'
import Emailer from '../../Emailer'
import { deleteData, getData, postData } from '../../Fetcher'

const laundryTime = 180
const openHours = [[8, 20]]
let startTime = new Date()
let endTime = new Date()
const url = 'http://localhost:8000/'
const laundryBookingsTable = 'laundryBookings/'
const localStorage = window.localStorage

const getAmountOfBookings = async () => {
  const url = 'http://localhost:8000/laundryBookings'
  const datatable = '?apartmentNo='
  const condition = JSON.parse(localStorage.getItem('tokens')).apartmentNo
  const data = await getData(url, datatable, condition)
  return data.length
}

/**
 * Laundrybooking time-calendar
 * 
 * @param {integer} idToRebook if set the booking is considered a rebooking of the booking with this id 
 * @returns React component to book the laundry
 */
export default function LaundryBooking ({ idToRebook = null }) {
  // Booked times
  const [bookings, setBookings] = useState([])

  const [showConfirmation, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)

  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const [maxAmountState, setMaxAmountState] = useState('n/a')

  // Fetches the bookings from the api
  const fetchBookings = async () => {
    const data = await getData(url, laundryBookingsTable)
    setBookings(data)
  }

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchBookings()
  }, [])

  // Creates a new booking
  const newBooking = async (sTime, eTime) => {
    const postData = {
      start_time: sTime,
      end_time: eTime,
      apartmentNo: JSON.parse(localStorage.getItem('tokens')).apartmentNo
    }

    const amountOfBookings = await getAmountOfBookings()
    let maxAmount = 2
    if (localStorage.getItem('settings')) {
      maxAmount = JSON.parse(localStorage.getItem('settings')).laundryTime
    }
    if (amountOfBookings < maxAmount || idToRebook) {
      // Success
      await postBooking(postData)
      Emailer(postData, 'LAUNDRY')
    } else {
      // TODO, Make this prettier
      setMaxAmountState(maxAmount)
      await fetchBookings()
      throw new Error('Booking failure, too many bookings')
      // window.alert('Woops, du har bokat för många tider, ' + maxAmount +
      // ' är max. \n Avboka en tid och försök igen')
    }
    await fetchBookings()
  }

  // Posts the previously created booking
  const postBooking = async (pData) => {
    // If the booking is a rebooking, delete the old booking
    if (idToRebook) {
      deleteData(url, laundryBookingsTable, idToRebook)
      window.location.reload()
    }
    
    postData(url, laundryBookingsTable, pData)
  }

  const handleModalConfirmation = () => {
    // om bekräftat körs denna för att "spara bokningen"
    let failureFlag = false
    newBooking(startTime, endTime)
      .catch((err) => {
        console.error(err)
        setShowErrorAlert(true)
        failureFlag = true
        // This has to be here otherwise it instantly close modal
        setShowModal(failureFlag)
      })
    if (failureFlag === false) {
      setShowModal(failureFlag)
    }
  }

  const handleChosenTime = (chosenStartTime) => {
    startTime = chosenStartTime
    endTime = addHours(startTime, laundryTime / 60)

    // Show modal for further confirmation
    setShowModal(true)
  }

  return (
    <>
      <div>
        <h4 className='text-center'>Välj dag för att boka tvättid</h4>
      </div>
      <div>
        <TimeCalendar
          className='border-top'
          clickable
          openHours={openHours}
          disableHistory
          timeSlot={laundryTime}
          bookings={bookings}
          onTimeClick={handleChosenTime}
        />
      </div>

      {/* Modal for confirmation of booking */}
      <Modal show={showConfirmation} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta din bokning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert show={showErrorAlert} variant='danger'>
            <Alert.Heading>Du har bokat för många tider</Alert.Heading>
            <p>
              Försök igen efter du har avbokat en tid.
              Max antal bokningar är {maxAmountState}
            </p>
            <hr />
          </Alert>
          Bekräfta din bokning av tvättid.
          <br />
          Tid: {JSON.stringify(format(startTime, 'HH.mm')).replace(
            /"/g,
            ''
          )} - {JSON.stringify(format(endTime, 'HH.mm')).replace(/"/g, '')}
          <br />
          Dag:{' '}
          {JSON.stringify(format(startTime, 'dd/MM-yyyy')).replace(/"/g, '')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Stäng
          </Button>
          <Button variant='primary' onClick={handleModalConfirmation}>
            Boka
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
