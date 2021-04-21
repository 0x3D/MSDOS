import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, ListGroup, Modal, Button } from 'react-bootstrap'
import HandleBookings from './HandleBookings'
import HandleUsers from './HandleUsers'
import AddFacility from './AddFacility'
import dataBackend from '../../Data/dataBackend'


export default function AdminPage() {

    const dataBE = new dataBackend()

    // dataBE.insertToSql()

    const [show, setShow] = useState(false)

    const [selectedModal, setSelectedModal] = useState([])

    let handle_bookings = <HandleBookings />
    let handle_users = <HandleUsers />
    let add_facility = <AddFacility />

    const handleShow = (event) => {
        let modal = event.target.id
        // TODO: make this prettier
        if (modal === 'handle-bookings') { setSelectedModal(handle_bookings) }
        if (modal === 'handle-users') { setSelectedModal(handle_users) }
        if (modal === 'add-fac') { setSelectedModal(add_facility) }
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }


    return (
        <div className="AdminPage">
            {/* Tänker att detta ska vara typ som knappar som man klickar på med en pane eller annat som tycker upp på skärmen
                med en React Komponent för varje vald "hantering".
                Det är bara en tanke men vi kanske vill ha det på annat sätt */}
            <h1> Admin sida</h1>
            <Container>
                <Row>
                    <Col sm={12}>

                        <ListGroup>
                            <ListGroup.Item>
                                <Button id="handle-bookings" onClick={handleShow}>
                                    Hantera bokningar
                                </Button>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button id="handle-users" onClick={handleShow}>
                                    Hantera användare
                                </Button>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button id="add-fac" onClick={handleShow}>
                                    Lägga till faciliteter
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>

                </Row>
            </Container>


            <Modal show={show} onHide={handleClose} size={'xl'}>
                <Modal.Header closeButton>
                    Admin
                </Modal.Header>
                <Modal.Body id="modal-body" scrollable={true}>
                    {/* HÄR VILL JAG ATT MAN SKA KUNNA OLIKA SLAGS KOMPONENTER WALLA BILLA */}
                    {selectedModal}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
