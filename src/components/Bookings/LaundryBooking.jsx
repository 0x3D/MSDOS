import React, { useState, useEffect } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addHours } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'
import Emailer from '../../Emailer'
import { getData, postData } from '../../Fetcher'

const laundryTime = 180
const openHours = [[8, 20]]
let startTime = new Date()
let endTime = new Date()
const url = 'http://localhost:8000/'
const laundryBookingsTable = 'laundryBookings/'
const localStorage = window.localStorage

export default function LaundryBooking ({ removeFunction, temporaryBookingId }) {
  // Booked times
  const [bookings, setBookings] = useState([])

  const [showConfirmation, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)

  // Fetches the bookings from the api
  const fetchBookings = async () => {
    const data = await getData(url, laundryBookingsTable)
    setBookings(data)
  }

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

    await postBooking(postData)
    await fetchBookings()
    Emailer(postData, 'LAUNDRY')
  }

  // Posts the previously created booking
  const postBooking = async (pData) => {
    postData(url, laundryBookingsTable, pData)
  }

  const handleModalConfirmation = () => {
    setShowModal(false)

    // om bekräftat körs denna för att "spara bokningen"
    newBooking(startTime, endTime)
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
