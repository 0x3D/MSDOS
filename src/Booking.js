import React from 'react'
import { Container } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import LaundryBooking from './components/Bookings/LaundryBooking'

export default function Booking() {
    
    return (
        <>
            <Container className="mt-2 subnav" >
                <Tabs justify defaultActiveKey="laundry" id="uncontrolled-tab-example">
                    <Tab eventKey="laundry" title="Tvättstuga">
                        <div className="border-bottom border-left border-right">
                            <LaundryBooking />
                        </div>
                    </Tab>
                    <Tab eventKey="gym" title="Gym">
                        {/* Create component for booking the gym */}
                    </Tab>
                    <Tab eventKey="lokaler" title="Lokaler">
                        {/* Create component for booking lokaler */}
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}
