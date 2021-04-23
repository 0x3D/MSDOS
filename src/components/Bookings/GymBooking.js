import React, { useState, useEffect } from 'react'
import TimeCalendar from "react-timecalendar";
import { format, addHours } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'


const gymSections = 30
const openHours = [[8, 22.5]];
const url = 'http://localhost:8000/gymBookings/'
var startTime = new Date()
var endTime = new Date()


export default function GymBooking() {
    //Booked times
    const [bookings, setBookings] = useState(null)
    const [showConfirmation, setShowModal] = useState(false);
    const [chosenTime, setChosenTime] = useState(null)

    const handleClose = () => setShowModal(false);


    //Fetches the bookings from the api
    const fetchBookings = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setBookings(data)
    }


    useEffect(() => {
        fetchBookings()
    }, [])


    //Creates a new booking
    const newBooking = async (sTime, eTime) => {
        var dateformat = 'yyyy-MM-dd HH:mm:ss'

        const bookingData = {
            start_time: format(sTime, dateformat),
            end_time: format(eTime, dateformat),
            lghNr: "3"
        }

        await postBooking(bookingData)
        await fetchBookings()
    }

    //Posts the previously created booking
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

        //släng upp en alert om godkänt i nåra sec
        //showAlert()

        //om bekräftat körs denna för att "spara bokningen"
        newBooking(chosenTime.startTime, chosenTime.endTime)
    }


    const handleChosenTime = (chosenStartTime) => {
        //startTime = chosenStartTime
        //endTime = addHours(startTime, gymSections / 60)
        console.log(chosenStartTime)

        //Show modal for further confirmation
        setShowModal(true);
    }

    return (
        <>
                <h4 className="pt-4 pb-4">Här bokar du dina gymtider</h4>
                <div className="border-top">
                    <TimeCalendar 
                        clickable
                        openHours={openHours}
                        disableHistory
                        timeSlot={gymSections}
                        bookings={bookings}
                        onTimeClick={handleChosenTime}
                        startTime={setChosenTime.startTime}
                        endTime={setChosenTime.endTime}
                    />
                </div>

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
