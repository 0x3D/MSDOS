import React from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'
import { MdLocalLaundryService } from 'react-icons/md'
import LaundryBooking from './components/Bookings/LaundryBooking'
import { CgGym } from 'react-icons/cg'
import { BiBuildings } from 'react-icons/bi'
import GymBooking from './components/Bookings/GymBooking'

/**
 * This is a container that contains the components Laundry booking and gymbooking in tabs.
 * @returns A react component that loads LaundryBooking.jsx, Gymbooking.jsx and in the future localbooking.jsx
 */
export default function Booking () {
  return (
    <>
      <Container className='mt-2 subnav'>
        <Tabs justify defaultActiveKey='laundry' id='uncontrolled-tab-example'>
          <Tab eventKey='laundry' title={<span> <MdLocalLaundryService size='2em' /> Tvättstuga </span>}>
            <div className='border-bottom border-left border-right'>
              <LaundryBooking />
            </div>
          </Tab>
          <Tab eventKey='gym' title={<span> <CgGym size='2em' /> Gym </span>}>
            {/* Create component for booking the gym */}
            <div className='border-bottom border-left border-right'>
              <GymBooking />
            </div>
          </Tab>
          <Tab eventKey='lokaler' title={<span> <BiBuildings size='2em' /> Lokaler</span>}>
            {/* Create component for booking lokaler */}
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}
