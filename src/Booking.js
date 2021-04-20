import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import Calander from './components/Bookings/Calander';
import LaundryTimes from './Data/laundry.json'
import LaundryBooking from './components/Bookings/LaundryBooking'



export default function Booking() {
    const [key, setKey] = useState('laundry');

    return (
        <>
            <Container className="mt-2 subnav" >
                <Tabs justify defaultActiveKey="laundry" id="uncontrolled-tab-example">
                    <Tab eventKey="laundry" title="Tvättstuga">
                        {/* Create component for booking the laundryroom */}
                        {/* <BookingCalander timeStamps={LaundryTimes} /> */}
                        <LaundryBooking />
                    </Tab>
                    <Tab eventKey="gym" title="Gym">
                        {/* Create component for booking the gym */}
                        <Calander />
                    </Tab>
                    <Tab eventKey="lokaler" title="Lokaler">
                        {/* Create component for booking lokaler */}
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}
