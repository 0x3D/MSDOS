import React from 'react'
import { Container } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import BookingCalander from './components/Bookings/BookingCalander';
import Calander from './components/Bookings/Calander';

import LaundryTimes from './Data/laundry.json'
import WeekDays from './components/Bookings/WeekDays';

export default function Booking() {
    return (
        <>
            <Container className="mt-2 subnav" >
                <Tabs justify defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="Tvättstuga" title="Tvättstuga">
                        {/* Create component for booking the laundryroom */}
                        <BookingCalander timeStamps={LaundryTimes} />

                    </Tab>
                    <Tab eventKey="Gym" title="Gym">
                        {/* Create component for booking the gym */}
                        <Calender />
                    </Tab>
                    <Tab eventKey="Lokaler" title="Lokaler">
                        {/* Create component for booking lokaler */}
                        <p>hej</p>
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}
