import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, ListGroup, Modal, Button } from 'react-bootstrap'
import HandleBookings from './HandleBookings'


/*
 TODO: Göra så att man vet vilken knapp man trycker på, just nu kan jag bara öppna en modul, medan jag vill man ska kunna öppna den man klickar på
 Axel
*/

export default function AdminPage() {

    const [show, setShow] = React.useState(false)


    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return (
        <div className="AdminPage">
            {/* Tänker att detta ska vara typ som knappar som man klickar på med en pane eller annat som tycker upp på skärmen
                med en React Komponent för varje vald "hantering".
                Det är bara en tanke men vi kanske vill ha det på annat sätt */}

            <Container>
                <Row>
                    <Col sm={12}>
                        <ListGroup>
                            <ListGroup.Item>
                                <Button onClick={handleShow}>
                                    Hantera bokningar
                                </Button>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button>
                                    Hantera användare
                                </Button>
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <Button>
                                Lägga till faciliteter
                                </Button>
                </ListGroup.Item>

                        </ListGroup>
                    </Col>

                </Row>
            </Container>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Titel
                </Modal.Header>
                <Modal.Body>
                    <HandleBookings />
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
