
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

export default function Profile() {

    /**
     * TODO: När inloggningen är klar måste ni skicka vilket lägenhetsnummer 
     * som är inloggad
     */

    const currentUser = 3

    const formatLghNr = () => {
        return "lghNr=" + String(3)
    }

    const [userData, setUserData] = useState(null)
    const [laundryBookings, setLaundryBookings] = useState(null)

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8000/users?' + formatLghNr())
        const data = await response.json()
        setUserData(data)
        console.log(data)
    }

    const fetchBookings = async () => {
        const response = await fetch('http://localhost:8000/laundryBookings?' + formatLghNr())
        const data = await response.json()
        setLaundryBookings(data)
        console.log(data)
    }

    useEffect(() => {
        fetchBookings()
        fetchUsers()
    }, [])


    return (
        <div>
            {/* {laundryBookings ?  (laundryBookings[0].start_time) : <p>ERROR</p>} */}
            <Container>
                <Row>
                    <Col>
                        <h3>
                            <h3><b>Email: </b></h3> {!userData ? (<h2>Not logged in</h2>) : 
                            (userData[0].email)}
                        </h3>
                    </Col>

                    <Col>
                        <h3>
                            <h3><b>Lägenhetsnummer: </b></h3> {currentUser}
                        </h3>
                    </Col>
                </Row>
                {!laundryBookings ? (<h1>loading...</h1>) : (
                    <Card style={{}}>
                        <Card.Header as="h3"> <b>Mina Bokningar</b> </Card.Header> <br />
                        {laundryBookings.map((row) => (
                            <>
                                <Card.Text className="border">
                                    <b>StartTime</b> : {row.start_time} <br /> <b>Sluttid</b> : {row.end_time} <br />
                                    <Button variant="danger">Ta bort bokning</Button>
                                </Card.Text>

                            </>
                        ))}
                    </Card>
                )}
            </Container>
        </div>
    )
}
