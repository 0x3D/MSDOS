import React, { useState, useEffect } from 'react'
import TimeCalendar from "react-timecalendar";
import { format, addHours } from 'date-fns'
import { Button, Modal, Alert } from 'react-bootstrap'


//const LOCAL_STORAGE_LAUNDRY_TIMES = 'bookingApp.laundryBooked'
const laundryTime = 180
const openHours = [[8, 20]];
var startTime = new Date();
var endTime = new Date();
const url = 'http://localhost:8000/laundryBookings/'


export default function LaundryBooking() {
    //Booked times
    const [bookings, setBookings] = useState(null)

    const [showConfirmation, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);


    // //Get bookings from local
    // useEffect(() => {
    //     const storedBookings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAUNDRY_TIMES))
    //     if (storedBookings) setBookings(storedBookings)
    // }, [])

    // //Save booked times to local machine (we dont have any database)
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_LAUNDRY_TIMES, JSON.stringify(bookings))
    // }, [bookings])


    //Fetches the bookings from the api
    const fetchBookings = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setBookings(data)
    }


    useEffect(() => {
        fetchBookings()
    }, [])


    const newBooking = async (sTime, eTime) => {
        var dateformat = 'yyyy-MM-dd HH:mm:ss'

        
        const postData = {
            start_time: format(sTime, dateformat),
            end_time: format(eTime, dateformat),
            lghNr: "3"
        }
        
        await postBooking(postData)
        await fetchBookings()
    }

    const postBooking = async (postData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        console.log(data)
    }


    const handleModalConfirmation = () => {
        setShowModal(false);

        //om bekräftat körs denna för att "spara bokningen"
        newBooking(startTime, endTime)
    }


    const handleChosenTime = (chosenStartTime) => {
        startTime = chosenStartTime
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

            {/* Modal for confirmation of booking*/}
            <Modal show={showConfirmation} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bekräfta din bokning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bekräfta din bokning av tvättid.
                    <br />
                    Tid: {JSON.stringify(format(startTime, 'HH.mm')).replace(/"/g, "")} - {JSON.stringify(format(endTime, 'HH.mm')).replace(/"/g, "")}
                    <br />
                    Dag: {JSON.stringify(format(startTime, 'dd/MM-yyyy')).replace(/"/g, "")}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Stäng
                    </Button>
                    <Button variant="primary" onClick={handleModalConfirmation}>
                        Boka
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
