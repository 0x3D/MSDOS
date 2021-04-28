import React, { useState, useEffect } from 'react'
import TimeCalendar from "react-timecalendar";
import { format, addHours, differenceInMinutes } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'


const gymSections = 30
const openHours = [[8, 22.5]];
const url = 'http://localhost:8000/gymBookings/'
const maxGymSessionTime = 3

export default function GymBooking() {
    //Booked times
    const [bookings, setBookings] = useState(null)
    const [showConfirmation, setShowModal] = useState(false);
    const [hasChosenTime, setHasChosenTime] = useState(false)


    const [startTime, setStartTime] = useState('') 
    const [endTime, setEndTime] = useState('')

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
            start_time: sTime,
            end_time: eTime,
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

        //om bekräftat körs denna för att "spara bokningen"
        //newBooking(chosenTime.startTime, chosenTime.endTime)
    }


    const handleChosenTime = (time) => {

        if (startTime === '') {
            setStartTime(time)
            setEndTime(time)
        } else if (differenceInMinutes(time, startTime) > maxGymSessionTime * 60 || time < startTime) {
            setHasChosenTime(false)
            setStartTime('')
            setEndTime('')
        } else {
            setHasChosenTime(true)
            //setShowModal(true);
            setEndTime(time)
        }
    }

    return (
        <>
            <h4 className="pt-4 pb-4 ml-auto mr-auto">Här bokar du dina gymtider</h4>
            <div className="border-top">
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

            {/* Modal for confirmation of booking*/}
            <Modal show={showConfirmation} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bekräfta din bokning</Modal.Title>
                </Modal.Header>
                {!hasChosenTime ? (<p>No chosen time</p>) : (
                    <Modal.Body>
                        Bekräfta din bokning av tvättid.
                        <br />
                        Tid: {JSON.stringify(format(startTime, 'HH.mm')).replace(/"/g, "")} - {JSON.stringify(format(endTime, 'HH.mm')).replace(/"/g, "")}
                        <br />
                        Dag: {JSON.stringify(format(startTime, 'dd/MM-yyyy')).replace(/"/g, "")}
                    </Modal.Body>
                )}
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
