import React from 'react'
import { format  } from "date-fns";

export default function RenderWeekNumber() {

    let date = new Date()
    const weekFormat = "w"
    

    return (
        <div>
            <div className="test">
                <h2>{format( date, weekFormat)} </h2>
            </div>
        </div>
    )
}
