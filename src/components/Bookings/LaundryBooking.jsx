import React, { useState, useEffect } from 'react'
import TimeCalendar from "react-timecalendar";
import { format, addHours } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'


const LOCAL_STORAGE_LAUNDRY_TIMES = 'bookingApp.laundryBooked'
const laundryTime = 180
const openHours = [[8, 20]];
var startTime = '';
var endTime = '';


export default function LaundryBooking() {
    //Booked times
    const [bookings, setBookings] = useState([])

    //Get bookings from local
    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAUNDRY_TIMES))
        if (storedBookings) setBookings(storedBookings)
    }, [])

    //Save booked times to local machine (we dont have any database)
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_LAUNDRY_TIMES, JSON.stringify(bookings))
    }, [bookings])

    const [showConfirmation, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);


    const handleConfirmation = () => {
        setShowModal(false);
        var dateformat = 'yyyy-MM-dd HH:mm:ss'
        
        //om bekräftat körs denna för att "spara bokningen"
        setBookings(prevBookings => {
            return [...prevBookings, {
                start_time: format(startTime, dateformat),
                end_time: format(endTime, dateformat)
            }]
        })
    }
    
    //Should be moved to app.js
    const handleChosenTime = (chosenTime) => {
        startTime = chosenTime
        endTime = addHours(startTime, laundryTime / 60)
        
        //Show modal for further confirmation
        setShowModal(true);
    }

    return (
        <>
            <TimeCalendar clickable
                openHours={openHours}
                disableHistory
                timeSlot={laundryTime}
                bookings={bookings}
                onTimeClick={handleChosenTime}
            />

            {/* Also show modal for confirmation */}
            <Modal show={showConfirmation} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Stäng
                    </Button>
                    <Button variant="primary" onClick={handleConfirmation}>
                        Boka
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
