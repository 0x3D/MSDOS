import React from 'react'
import WeekNumber from './WeekNumber'
import WeekDays from './WeekDays'
import LaundryTimeStamps from '../../Data/laundryTimeStamps.json'


export default function Calander() {
    return (
        <div>
            <WeekNumber />
            <WeekDays timeIntervall={LaundryTimeStamps} />
        </div>

    )
}
