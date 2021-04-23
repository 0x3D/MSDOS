import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, ListGroup, Modal, Button } from 'react-bootstrap'
import HandleBookings from './HandleBookings'
import HandleUsers from './HandleUsers'
import AddFacility from './MyFacilities'

/**
 * The AdminPage component is the component that gather all things a admin can do
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function AdminPage () {
/**
   * show is a variable, and setShow is a set-method for the variable
   * Usestate is the default value
   *
   * @constant show is a boolean
   * @method setLaundryBookings is a set-method for the boolean
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [show, setShow] = useState(false)

  /**
   * selectedModal is a variable, and setSelectedModal is a set-method for the variable
   * Usestate is the default value
   *
   * @constant selectedModal is a array
   * @method setLaundryBookings is a set-method for the array
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [selectedModal, setSelectedModal] = useState([])

  /**
     * @var handle_bookings refrences to the HandleBooking-component
     * @see{@link (https://github.com/0x3D/MSDOS/blob/main/src/components/AdminPage/HandleBookings.jsx)}
     */
  const handle_bookings = <HandleBookings />

  /**
     * @var handle_users refrences to the HandleUser-component
     * @see{@link (https://github.com/0x3D/MSDOS/blob/main/src/components/AdminPage/HandleUsers.jsx)}
     */
  const handle_users = <HandleUsers />

  /**
     * @var handle_bookings refrences to the add_facility-component
     * @see{@link (https://github.com/0x3D/MSDOS/blob/main/src/components/AdminPage/AddFacility.jsx)}
     */
  const add_facility = <AddFacility />

  /**
 * handelShow is a method that does the logic of which admin-component which is showing
 * Use @method setSelectedModal to set the selectedmodal
 * @param event is a eventListener
 */
  const handleShow = (event) => {
    const modal = event.target.id
    // TODO: make this prettier
    if (modal === 'handle-bookings') { setSelectedModal(handle_bookings) }
    if (modal === 'handle-users') { setSelectedModal(handle_users) }
    if (modal === 'add-fac') { setSelectedModal(add_facility) }
    setShow(true)
  }
  /**
 * handelClose is a method that close the modal
 * Use @method setSelectedModal to set the selectedmodal
 * @param event is a eventListener
 */
  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className='AdminPage'>
      <h1> Admin sida</h1>
      <Container>
        <Row>
          <Col sm={12}>

            <ListGroup>
              <ListGroup.Item>
                <Button id='handle-bookings' onClick={handleShow}>
                  Hantera bokningar
                </Button>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button id='handle-users' onClick={handleShow}>
                  Hantera användare
                </Button>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button id='add-fac' onClick={handleShow}>
                  Lägga till faciliteter
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Col>

        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          Admin
        </Modal.Header>
        <Modal.Body id='modal-body' scrollable='true'>
          {selectedModal}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
