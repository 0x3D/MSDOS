import React from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'
import { MdLocalLaundryService } from "react-icons/md";
import LaundryBooking from './components/Bookings/LaundryBooking'
import { CgGym } from "react-icons/cg";
import { BiBuildings } from "react-icons/bi";



export default function Booking () {
  return (
    <>
      <Container className='mt-2 subnav'>
        <Tabs justify defaultActiveKey='laundry' id='uncontrolled-tab-example'>
          <Tab eventKey='laundry' title='Tvättstuga'>
            <div className='border-bottom border-left border-right'>
              <LaundryBooking />
            </div>
          </Tab>
          <Tab eventKey='gym' title='Gym' image="favicon.ico">
            {/* Create component for booking the gym */}
            <CgGym size="2em"/>
            
          </Tab>
          <Tab eventKey='lokaler' title='Lokaler'>
            {/* Create component for booking lokaler */}
            <BiBuildings size="2em"/>
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}
