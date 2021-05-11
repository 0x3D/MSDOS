import React, { useState, useEffect, useCallback } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'
import Emailer from '../../Emailer'
import { getData, postData } from '../../Fetcher'

// TODO removeFunction ska gå via fetcher istället.

/**
 *
 * @param {Function} removeFunction Conditional function, defined when using the component to rebook an already booked time
 * @param {Integer} idToRebook The id to for the booking to be rebooked
 * @returns A react component with a calendar for booking rooms
 */
export default function RoomBooking ({ removeFunction, idToRebook }) {
  const [bookings, setBookings] = useState([])
  const [showConfirmation, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const [chosenDate, setChosenDate] = useState(new Date())
  const url = 'http://localhost:8000/'
  const localStorage = window.localStorage

  const openHours = [[8, 13]]

  const handleChosenDate = (date) => {
    setChosenDate(date)
    setShowModal(true)
  }

  // Handles the Book button on the modal
  const handleModalConfirmation = () => {
    setShowModal(false)

    // om bekräftat körs denna för att "spara bokningen"
    newBooking(chosenDate)
  }

  // Creates an new booking, ready to post to the database
  const newBooking = async (chosenDate) => {
    const postData = {
      start_time: chosenDate,
      end_time: chosenDate,
      apartmentNo: JSON.parse(localStorage.getItem('tokens')).apartmentNo
    }
    await postBooking(postData)
    await fetchBookings()

    // Sends email confiramtion when a time is booked
    Emailer(postData, 'room')
  }

  // Fetches bookings from the database
  const fetchBookings = useCallback(async () => {
    const data = await getData(url, 'roomBookings')
    setBookings(data)
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  // Posts the previously created booking
  const postBooking = async (data) => {
    if (idToRebook !== undefined) {
      // TODO: GÅ via fetcher för removefunction
      removeFunction(idToRebook)
      window.location.reload()
    }
    postData(url, 'roomBookings', data)
  }

  return (
    <>
      <h4 className='pt-4 pb-4 ml-auto mr-auto'>Här bokar du lokalen</h4>
      <div className='w-50 ml-auto mr-auto mb-4'>
        <ol className='instructionsList'>
          <li>Välj ett tillgängligt datum</li>
          <li>Bekräfta bokning i rutan som kommer upp</li>
        </ol>
      </div>

      <TimeCalendar
        clickable
        disableHistory
        openHours={openHours}
        bookings={bookings}
        onDateFunction={handleChosenDate}
      />

      <Modal show={showConfirmation} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta din bokning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bekräfta din bokning av lokalen.
          <br />
          Tid: 8.00 - 20.00
          <br />
          Dag: {JSON.stringify(format(chosenDate, 'dd/MM - yy')).replace(/"/g, '')}
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
