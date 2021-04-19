import React from 'react'
import { Container,Row, Col } from 'react-bootstrap'
import SpecificBooking from './SpecificBooking'

export default function BookingDay({day }) {


    return (
        <div>
            <Container >
                <h2> {day.weekDay} </h2>
                <h2> {JSON.stringify(day.bookingTimes)} </h2>
                <Row>
                    <SpecificBooking bookingInfo={day.bookingTimes[0]}/>
                </Row>

            </Container>
            
        </div>
    )
}
