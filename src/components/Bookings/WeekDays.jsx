import React from 'react'
import { format,startOfWeek, addDays  } from "date-fns";

export default function WeekDays() {

    let date = new Date()

const weekDayFormat = "PPPP";
        let firstDayInWeek = startOfWeek(date)
        const days = [];
        for (let i = 1; i < 8; i++) {
            days.push(
                <div className="weekDays-middle" id="weekDays-middle" key={i}>
                    <h2 className="weekDays-middle-child" id={"weekday" + i}>
                        {format(addDays(firstDayInWeek, i), weekDayFormat)}
                    </h2>
                </div>
            );
        }

    return (
       <div> {days} </div> 
    )
}
