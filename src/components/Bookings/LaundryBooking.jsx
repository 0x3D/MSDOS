import React, { useState, useEffect } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addHours } from 'date-fns'
import { Button, Modal, Alert } from 'react-bootstrap'
import Emailer from '../../Emailer'
import { deleteData, getData, postData } from '../../Fetcher'
import '../../styles/Booking.css'
import LaundryInstruction from '../Instructions/LaundryInstruction'

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

  const [showBookingConfirmation, setShowBookingModal] = useState(false)

  const handleBookingClose = () => setShowBookingModal(false)

  const [showRebookingConfirmation, setShowRebookingModal] = useState(false)

  const handleRebookingClose = () => setShowRebookingModal(false)

  const [showInstruction, setShowInstruction] = useState(false)

  const handleInstructionClose = () => setShowInstruction(false)

  const handleInstructionOpen = () => setShowInstruction(true)

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
      // window.alert('Woops, du har bokat f??r m??nga tider, ' + maxAmount +
      // ' ??r max. \n Avboka en tid och f??rs??k igen')
    }

    await fetchBookings()

    // Check so that the app doesn't open 2 modals when doing a rebooking
    if (!idToRebook) {
      setShowBookingModal(true)
    }
  }

  // Posts the previously created booking
  const postBooking = async (pData) => {
    // If the booking is a rebooking, delete the old booking
    if (idToRebook) {
      await deleteData(url, laundryBookingsTable, idToRebook)
      await postData(url, laundryBookingsTable, pData)
      await fetchBookings()
      setShowRebookingModal(true)
    } else {
      await postData(url, laundryBookingsTable, pData)
      await fetchBookings()
    }
  }

  const handleModalConfirmation = () => {
    // om bekr??ftat k??rs denna f??r att "spara bokningen"
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
      <div className='instruction-container'>
        <h4 className='pt-4 pb-4 ml-auto mr-auto'>S??h??r bokar du tv??ttid</h4>
        <div className='w-50 ml-auto mr-auto mb-4' onClick={() => { handleInstructionOpen() }}>
          <ol className='instructionsList'>
            <li>V??lj ett datum</li>
            <li>V??lj en tid genom att klicka p?? 'Select Time'</li>
            <li>Klicka p?? ??nskad tid</li>
            <li>Bekr??fta bokning i rutan som kommer upp</li>
          </ol>
        </div>
      </div>
      <div className='border-top'>
        <TimeCalendar
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
          <Modal.Title>Bekr??fta din bokning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert show={showErrorAlert} variant='danger'>
            <Alert.Heading>Du har bokat f??r m??nga tider</Alert.Heading>
            <p>
              F??rs??k igen efter du har avbokat en tid.
              Max antal bokningar ??r {maxAmountState}
            </p>
            <hr />
          </Alert>
          Bekr??fta din bokning av tv??ttid.
          <br />
          Tid: {JSON.stringify(format(startTime, 'HH.mm')).replace(
            /"/g,
            ''
          )} - {JSON.stringify(format(endTime, 'HH.mm')).replace(/"/g, '')}
          <br />
          Dag:{' '}
          {JSON.stringify(format(startTime, 'dd/MM - yyyy')).replace(/"/g, '')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            St??ng
          </Button>
          <Button variant='primary' onClick={handleModalConfirmation}>
            Boka
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for confirmation message after booking */}
      <Modal show={showBookingConfirmation} onHide={handleBookingClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bokningsbekr??ftelse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Din bokning har g??tt igenom.
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
          <Button variant='secondary' onClick={handleBookingClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for confirmation message after rebooking */}
      <Modal show={showRebookingConfirmation} onHide={handleRebookingClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ombokningsbekr??ftelse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Din ombokning har g??tt igenom.
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
          <Button variant='secondary' onClick={(e) => { window.location.reload() }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showInstruction} onHide={handleInstructionClose} size='lg'>
        <Modal.Title> <h4 style={{ marginTop: '2%', color: 'var(--c2-color)' }}><b>Tv??ttbokning instruktion</b></h4> </Modal.Title>
        <Modal.Body> <LaundryInstruction /> </Modal.Body>
        <Modal.Footer>
          <p style={{ marginRight: '30%' }}> <b>Videon spelas om autumatiskt</b></p>
          <Button onClick={handleInstructionClose}>
            St??ng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
