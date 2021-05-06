import React, { useState, useEffect, useCallback } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addMinutes, differenceInMinutes } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'
import '../../styles/App.css'
import Emailer from '../../Emailer'

const fetch = window.fetch
const alert = window.alert
const localStorage = window.localStorage

const getAmountOfBookings = async () => {
  const url = 'http://localhost:8000/gymBookings'
  const response = await fetch(url + '?apartmentNo=' + JSON.parse(localStorage.getItem('tokens')).apartmentNo)
  const data = await response.json()
  console.log(data)
  return data.length
}

/**
 * The react subtab component for booking the gym.
 *
 * @returns The HTML to be rendered
 */
export default function GymBooking () {
  /**
     * Time in minutes for one gym section
     * @const {integer}
     */
  const gymSections = 30

  /**
     * Open hours for the gym
     * @const {array}
     */
  const openHours = [[8, 22.5]]

  /**
     * Open hours for the gym
     * @const {string}
     */
  const url = 'http://localhost:8000/gymBookings/'

  /**
     * Open hours for the gym
     * @const {string}
     */
  const maxGymSessionTime = 3

  /**
     * State for the currently booked gym times.
     *
     * @const {array}
     */
  const [bookings, setBookings] = useState([])

  /**
     * State wether to show the confirmation for the booking or not.
     *
     * @const {boolean}
     */
  const [showConfirmation, setShowModal] = useState(false)

  /**
     * State which tells if the user has chosen a time or not.
     *
     * @const {boolean}
     */
  const [hasChosenTime, setHasChosenTime] = useState(false)

  /**
     * State which holds the user picked for start time the gym session.
     *
     * @const {object}
     */
  const [startTime, setStartTime] = useState('')

  /**
     * State which holds the user picked end time for the gym session.
     *
     * @const {object}
     */
  const [endTime, setEndTime] = useState('')

  /**
     * Function to close the confirmationmodal
     */
  const handleClose = () => setShowModal(false)

  /**
     * Function to show the confirmationmodal
     */
  const handleShow = () => setShowModal(true)

  /**
     * Functinon to fetch the booked gymtimes from the database
     */
  const fetchBookings = useCallback(async () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        parseData(json)
      })
  }, [])

  /**
     * Functinon to parse the fetched data from the database
     *
     * @param {object} bookings The fetched data from the database
     */
  const parseData = (bookings) => {
    bookings.forEach((booking) => {
      booking.end_time = JSON.stringify(addMinutes(new Date(booking.end_time), 1)).replace(/"/g, '')
    })
    console.log(bookings)
    setBookings(bookings)
  }

  /**
     * React hook to fetch the
     */
  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  // Creates a new booking
  const newBooking = async (startTime, endTime) => {
    if (startTime === '' || endTime === '') {
      alert('Inga start eller sluttider valda')
    } else {
      const bookingData = {
        start_time: startTime,
        end_time: endTime,
        apartmentNo: JSON.parse(localStorage.getItem('tokens')).apartmentNo
      }

      const amountOfBookings = await getAmountOfBookings()
      let maxAmount = 2
      if (localStorage.getItem('settings')) {
        maxAmount = JSON.parse(localStorage.getItem('settings')).gymTime
      }
      if (amountOfBookings < maxAmount) {
        // Success
        await postBooking(bookingData)
        Emailer(bookingData, 'GYM')
      } else {
        // TODO, Make this prettier
        window.alert('Woops, du har bokat för många tider, ' + maxAmount +
        ' är max. \n Avboka en tid och försök igen')
      }
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

  // Handles the "book" button on the modal
  const handleModalConfirmation = () => {
    setShowModal(false)

    // om bekräftat körs denna för att "spara bokningen"
    newBooking(startTime, endTime)

    clearTimeInterval()
  }

  /**
     * Handles and decides if the picked time is a starttime or an endtime.
     *
     * @param {Date} time Date-fns object
     */
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

  // Clears the chosen time interval
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
          ? (<p>Var vänlig välj tider innan du bokar</p>)
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
