import React, { useState, useEffect } from 'react'
import TimeCalendar from "react-timecalendar";
import { format, addHours } from 'date-fns'


const LOCAL_STORAGE_LAUNDRY_TIMES = 'bookingApp.laundryBooked'

export default function LaundryBooking() {
    //const writeJsonFile = require('write-json-file');
    const openHours = [[9, 18]];

    //Booked times
    const [bookings, setBookings] = useState([])

    //Get bookings from session
    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAUNDRY_TIMES))
        if (storedBookings) setBookings(storedBookings)
    }, [])

    //Save booked times to session
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_LAUNDRY_TIMES, JSON.stringify(bookings))
    }, [bookings])



    //Should be moved to app.js
    const handleChosenTime = (startTime) => {
        var dateformat = 'yyyy-MM-dd HH:mm:ss'
        var endTime = addHours(startTime, 2)


        //här ska modal skickas upp för vidare bekräftelse

        //om bekräftat ska denna köras för att "spara bokningen"
        setBookings(prevBookings => {
            return [...prevBookings, {
                start_time: format(startTime, dateformat),
                end_time: format(endTime, dateformat)
            }]
        })
        console.log(bookings)
    }



    return (
        <>
            <TimeCalendar clickable
                openHours={openHours}
                disableHistory
                timeSlot={120}
                bookings={bookings}
                onTimeClick={handleChosenTime}
            />

            {/* Also show modal to book a time */}
        </>
    )
}
