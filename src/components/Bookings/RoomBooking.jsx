import React, { useState, useEffect, useCallback } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addMinutes, differenceInMinutes } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'



export default function RoomBooking() {
    const [bookings, setBookings] = useState([{
        start_time: "2021-05-11 08:00:00",
        end_time: "2021-05-11 09:00:00",
        apartmentNo: 3,
        id: 14
    }])
    
    const openHours = [[8,13]]

    const handleChosenDate = (date) => {
        console.log(date)
        console.log(bookings)
    }

    return (
        <>
            <TimeCalendar
                clickable
                disableHistory
                openHours={openHours}
                bookings={bookings}
                timeSlot={30}
                onDateFunction={handleChosenDate}
            />
        </>
    )
}
