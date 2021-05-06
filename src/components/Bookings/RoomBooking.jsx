import React, { useState, useEffect, useCallback } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addMinutes, differenceInMinutes } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'



export default function RoomBooking() {
    const [bookings, setBookings] = useState([{
        start_time: "2021-05-11",
        end_time: "2021-05-11",
        apartmentNo: 3,
        id: 14
    }])
    const openHours = [[8,9]]

    const handleChosenDate = (date) => {
        console.log(date)
        setBookings([{
            start_time: "2021-05-11 08:00:00",
            end_time: "2021-05-11 9:00:00",
            apartmentNo: 3,
            id: 14
        }])
        console.log(bookings)
    }

    return (
        <>
            <TimeCalendar
                clickable
                disableHistory
                openHours={openHours}
                bookings={bookings}
                onDateFunction={handleChosenDate}
            />
        </>
    )
}
