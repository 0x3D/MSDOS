import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

export default function Profile() {


    const userName = "Håkan Håkansson"
    const location = "Lemansgatan 6"
    const lghNr = 7
    const bookings = [
        {
            start_time: "2021-04-21 08:00:00",
            end_time: "2021-04-21 11:00:00"
        },
        {
            start_time: "2021-06-21 11:00:00",
            end_time: "2021-06-21 14:00:00"
        }
    ]

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h3>
                            <b>Namn: </b>{userName}
                        </h3>
                    </Col>
                    <Col>
                        <h3>
                            <h3><b>Lägenhetsnummer: </b></h3> {lghNr}
                        </h3>
                    </Col>
                </Row>
                {!bookings ? (<h1>loading...</h1>) : (
                    <Card style={{}}>
                        <Card.Header as="h3"> <b>Mina Bokningar</b> </Card.Header> <br/>
                        {bookings.map((row) => (
                            <>
                                <Card.Text className="border">
                                    <b>StartTime</b> : {row.start_time} <br/> <b>Sluttid</b> : {row.end_time} <br/>
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
