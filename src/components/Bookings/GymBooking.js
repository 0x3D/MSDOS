import React, { useState, useEffect } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addMinutes, differenceInMinutes } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'
import '../../styles/App.css'

const gymSections = 30
const openHours = [[8, 22.5]]
const url = 'http://localhost:8000/gymBookings/'
const maxGymSessionTime = 3
const fetch = window.fetch
const localStorage = window.localStorage

export default function GymBooking () {
  // Booked times
  const [bookings, setBookings] = useState('')
  const [showConfirmation, setShowModal] = useState(false)
  const [hasChosenTime, setHasChosenTime] = useState(false)

  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  // Fetches the bookings from the api
  const fetchBookings = async () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        parseData(json)
      })
  }

  const parseData = (bookings) => {
    bookings.forEach((booking) => {
      booking.end_time = JSON.stringify(addMinutes(new Date(booking.end_time), 1)).replace(/"/g, '')
    })
    console.log(bookings)
    setBookings(bookings)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Creates a new booking
  const newBooking = async (startTime, endTime) => {
    if (startTime === '' || endTime === '') {
      window.alert('Inga start eller sluttider valda')
    } else {
      const bookingData = {
        start_time: startTime,
        end_time: endTime,
        apartmentNo: JSON.parse(localStorage.getItem('tokens')).apartmentNo
      }
      await postBooking(bookingData)
    }
    await fetchBookings()
  }

  // Posts the previously created booking
  const postBooking = async (postData) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log(data)
  }

  const handleModalConfirmation = () => {
    setShowModal(false)

    // om bekräftat körs denna för att "spara bokningen"
    newBooking(startTime, endTime)

    clearTimeInterval()
  }

  const handleChosenTime = (time) => {
    if (startTime === '') {
      setStartTime(time)
      setEndTime(time)
    } else if (differenceInMinutes(time, startTime) > maxGymSessionTime * 60 || time < startTime) {
      clearTimeInterval()
    } else {
      setEndTime(time)
      setHasChosenTime(true)
    }
  }

  const clearTimeInterval = () => {
    setHasChosenTime(false)
    setStartTime('')
    setEndTime('')
  }

  return (
    <>
      <h4 className='pt-4 pb-4 ml-auto mr-auto'>Här bokar du dina gymtider</h4>
      <div className='w-50 ml-auto mr-auto mb-4'>
        <ol className='instructionsList'>
          <li>Välj ett datum</li>
          <li>Välj en starttid</li>
          <li>Välj en sluttid (inom {maxGymSessionTime} timmar)</li>
          <li>Klicka på boka vald tid</li>
          <li>Bekräfta bokning i rutan som kommer upp</li>
        </ol>
      </div>

      <Button className='mb-3 mr-5' disabled={!hasChosenTime} variant={hasChosenTime ? ('primary') : ('secondary')} onClick={handleShow}>
        Boka markerad tid
      </Button>
      <Button variant='secondary' className='mb-3 ml-5' onClick={clearTimeInterval}>
        Rensa markerad tid
      </Button>
      <div className='border-top'>
        <TimeCalendar
          clickable
          openHours={openHours}
          disableHistory
          timeSlot={gymSections}
          bookings={bookings}
          startTime={startTime}
          endTime={endTime}
          onTimeClick={handleChosenTime}
        />
      </div>

      {/* Modal for confirmation of booking */}
      <Modal show={showConfirmation} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta din bokning</Modal.Title>
        </Modal.Header>
        {!hasChosenTime
          ? <p>Var vänlig välj tider innan du bokar</p>
          : (
            <Modal.Body>
              Bekräfta din bokning av gymtid.
              <br />
              Tid: {JSON.stringify(format(startTime, 'HH.mm')).replace(/"/g, '')} - {JSON.stringify(format(endTime, 'HH.mm')).replace(/"/g, '')}
              <br />
              Dag: {JSON.stringify(format(startTime, 'dd/MM-yyyy')).replace(/"/g, '')}
            </Modal.Body>
            )}
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
