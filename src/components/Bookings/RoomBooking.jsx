import React, { useState, useEffect, useCallback } from 'react'
import TimeCalendar from 'react-timecalendar'
import { format, addMinutes, differenceInMinutes } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'



export default function RoomBooking() {
    const startTime = ''
    const endTime = ''
    const bookings = ''

    const handleChosenDate = (date) => {
        console.log(date)
    }
    
    return (
        <>
            <TimeCalendar
                    clickable
                    disableHistory
                    bookings={bookings}
                    startTime={startTime}
                    endTime={endTime}
                    onDateFunction={handleChosenDate}
                />
        </>
    )
}
