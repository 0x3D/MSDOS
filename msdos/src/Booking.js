import React from 'react'
import { Container } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';

export default function Booking() {
    return (
        <>
            <Container className="mt-2 subnav" >
                <Tabs justify defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="Tvättstuga" title="Tvättstuga">
                        {/* Create component for booking the laundryroom */}
                        <p>hej</p>
                    </Tab>
                    <Tab eventKey="Gym" title="Gym">
                        {/* Create component for booking the gym */}
                        <h1>hej</h1>
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
