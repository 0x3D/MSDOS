import React, { } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, ListGroup, Modal, Button, Image, Card, CardGroup } from 'react-bootstrap'
import '../styles/AboutPage.css'
import '../styles/App.css'
import House from '../assets/BrfLemansgatan.jpeg'
import codeStock from '../assets/stockCodePic.jpeg'
import Hello from '../assets/hello.jpg'

export default function AboutPage() {

    /**
     * This is the about page where we have gathered information about the project.
     */

    return (
        <>
            <div>
                <h1>
                    <Image src={House} height={300} width={900}></Image>
                </h1>
                <h5>
                    Om oss
            </h5>
                <p> MSDOS utvecklades som ett skolprojekt i kusen Agile software project management för att hjälpa BRF Lemansgatan att digitalisera fastighetens analoga bokningar av tvättstuga, gym och övernattningslägenhet. </p>
                <CardGroup>
                    <Card >
                        <Card.Img variant="top" src={Hello} height={260} width={166} />
                        <Card.Body>
                            <Card.Title>Kontakta oss!</Card.Title>
                            <Card.Text>
                                Klicka på knappen för att komma i kontakt med skaparna bakom applikationen. Skriv med dina kontaktuppgifter så hör vi av oss!
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted"> this is a little footter </small>
                        </Card.Footer>
                    </Card>

                    <Card>
                        <Card.Img variant="top" src={codeStock} height={260} width={166} />
                        <Card.Body>
                            <Card.Title>Källkod</Card.Title>
                            <Card.Text>
                                spana in källkoden på github! klicka på länken nedan:
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </CardGroup>
            </div>
        </>
    )
}