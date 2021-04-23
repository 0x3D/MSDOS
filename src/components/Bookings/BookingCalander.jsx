import React, {useState} from 'react'
import BookingDay from './BookingDay'

export default function BookingCalander({timeStamps}) {


    return (
        
        <div>
            {JSON.stringify(timeStamps[0].week)}
            <BookingDay day={timeStamps[0].days[0]}/>
        </div>
    )
}
