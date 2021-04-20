import React from 'react'
import { Button } from 'react-bootstrap'


export default function TimeStambs({ timeIntervall }) {

    let timeText = []
    const timeStamps = () => {
        for (let i = 0; i < timeIntervall.length; i++) {
            timeText.push(
                <Button >
                        {timeIntervall[i].timeFrom + " - " + timeIntervall[i].timeTo}
                </Button>

            )
        }
        return timeText
    }

    return (
        <div>
            {timeStamps()}
        </div>
    )
}
