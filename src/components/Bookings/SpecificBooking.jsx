import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

export default function SpecificBooking({bookingInfo}) {


    const [info, setInfo] = useState(bookingInfo)


    return (
        <div>
            <Button>
                {JSON.stringify(bookingInfo)}
            </Button>
        </div>
    )
}
