import React, { useState, useEffect, useCallback } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addMinutes, differenceInMinutes, isEqual } from 'date-fns'
import { Button, Modal, Alert } from 'react-bootstrap'
import '../../styles/App.css'
import Emailer from '../../Emailer'
import { getData, postData, deleteData } from '../../Fetcher'
import '../../styles/Booking.css'

const alert = window.alert
const localStorage = window.localStorage

const getAmountOfBookings = async () => {
  const url = 'http://localhost:8000/gymBookings'
  const datatable = '?apartmentNo='
  const condition = JSON.parse(localStorage.getItem('tokens')).apartmentNo
  const data = await getData(url, datatable, condition)
  return data.length
}

/**
 * Gymbooking time-calendar
 *
 * @param {integer} idToRebook if set the booking is considered a rebooking of the booking with this id
 * @returns React component to book the gym
 */
export default function GymBooking({ idToRebook = null }) {
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
  const url = 'http://localhost:8000/'

  /**
    * Table gymBookings
    * @const {string}
    */
  const gymBokingTable = 'gymBookings/'

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

  const [maxAmountState, setMaxAmountState] = useState('n/a')

  const [showErrorAlert, setShowErrorAlert] = useState(false)

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

  const [showBookingConfirmation, setShowBookingModal] = useState(false)

  const handleBookingClose = () => setShowBookingModal(false)

  const [showRebookingConfirmation, setShowRebookingModal] = useState(false)

  const handleRebookingClose = () => setShowRebookingModal(false)

  /**
    * Functinon to fetch the booked gymtimes from the database
    */
  const fetchBookings = useCallback(async () => {
    const json = await getData(url, gymBokingTable)
    parseData(json)
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
      if (amountOfBookings < maxAmount || idToRebook) {
        // Success
        await postBooking(bookingData)
        Emailer(bookingData, 'GYM')
      } else {
        setMaxAmountState(maxAmount)
        await fetchBookings()
        throw new Error('Booking failure, too many bookings')
        // TODO, Make this prettier
        // window.alert('Woops, du har bokat för många tider, ' + maxAmount +
        // ' är max. \n Avboka en tid och försök igen')
      }
    }
    await fetchBookings()

    // IF-sats som ser till att två moduler inte visas när en ombokning görs
    if (!idToRebook) {
      setShowBookingModal(true)
    }
  }

  // Posts the previously created booking
  const postBooking = async (pData) => {
    if (idToRebook) {
      await deleteData(url, 'gymBookings/', idToRebook)
      await postData(url, gymBokingTable, pData)
      await fetchBookings()
      setShowRebookingModal(true)
    } else {
      await postData(url, gymBokingTable, pData)
      await fetchBookings()
    }
  }

  // Handles the "book" button on the modal
  const handleModalConfirmation = () => {
    let failureFlag = false
    // To 'save' booking and catch error.
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
    } else if (isEqual(time, startTime)) {
      return null
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
      <div className="instruction-container">
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
      </div>
      <div className="intruction-button">
        <Button className='mb-3 mr-5' disabled={!hasChosenTime} variant={hasChosenTime ? ('primary') : ('secondary')} onClick={handleShow}>
          Boka markerad tid
        </Button>
        <Button variant='secondary' className='mb-3 ml-5' onClick={clearTimeInterval}>
          Rensa markerad tid
        </Button>
      </div>
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
        <Alert show={showErrorAlert} variant='danger'>
          <Alert.Heading>Du har bokat för många tider</Alert.Heading>
          <p>
            Försök igen efter du har avbokat en tid.
            Max antal bokningar är {maxAmountState}
          </p>
          <hr />
        </Alert>
        {!hasChosenTime
          ? (<p>Var vänlig välj tider innan du bokar</p>)
          : (
            <Modal.Body>
              Bekräfta din bokning av gymtid.
              <br />
              Tid: {JSON.stringify(format(startTime, 'HH.mm')).replace(/"/g, '')} - {JSON.stringify(format(endTime, 'HH.mm')).replace(/"/g, '')}
              <br />
              Dag: {JSON.stringify(format(startTime, 'dd/MM - yyyy')).replace(/"/g, '')}
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

      {/* Modal for confirmation message after booking */}
      <Modal show={showBookingConfirmation} onHide={handleBookingClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bokningsbekräftelse</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          Din bokning har gått igenom.

        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleBookingClose}>
            Stäng
          </Button>

        </Modal.Footer>
      </Modal>

      <Modal show={showRebookingConfirmation} onHide={handleRebookingClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ombokningsbekräftelse</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          Din ombokning har gått igenom.

        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={(e) => { window.location.reload() }}>
            Stäng
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}
