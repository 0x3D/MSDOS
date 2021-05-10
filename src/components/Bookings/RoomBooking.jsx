import React, { useState, useEffect, useCallback } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addHours } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'
import Emailer from '../../Emailer'



export default function RoomBooking() {
    const [bookings, setBookings] = useState([])
    const [showConfirmation, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)
    const [chosenDate, setChosenDate] = useState(new Date())
    const url = 'http://localhost:8000/roomBookings/'

    const openHours = [[8, 13]]

    const handleChosenDate = (date) => {
        console.log(date)
        setChosenDate(addHours(date, 0))
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
        //Emailer(postData, 'ROOM')
    }

    // Fetches bookings from the database
    const fetchBookings = useCallback(async () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setBookings(json)
            })
    }, [])


    useEffect(() => {
        fetchBookings()
    }, [fetchBookings])

    // Posts the new booking to the database
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
                    Dag: {JSON.stringify(format(chosenDate, "dd/MM-yy")).replace(/"/g, '')}
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
