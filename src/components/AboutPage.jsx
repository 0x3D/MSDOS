import React, { } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, ListGroup, Modal, Button, Image, Card, CardGroup, CardDeck } from 'react-bootstrap'
import '../styles/AboutPage.css'
import '../styles/App.css'
import House from '../assets/BrfLemansgatan.jpeg'
import codeStock from '../assets/stockCodePic.jpeg'
import Hello from '../assets/hello.jpg'
import CardsUI from './CardsUI.jsx'

export default function AboutPage() {

    /**
     * This is the about page where we have gathered information about the project.
     */




    return (
        <div>
            <h1>
                <Image src={House} height={300} width={900}></Image>
            </h1>
            <h5>
                Om oss
                </h5>
            <div>
                <p> MSDOS utvecklades som ett skolprojekt i kusen Agile software project management för att hjälpa BRF Lemansgatan att digitalisera fastighetens analoga bokningar av tvättstuga, gym och övernattningslägenhet. </p>
            </div>
            <div>
                <Row>
                    <Col md>
                        <CardDeck>
                            <CardsUI imgsrc={Hello} />
                            <CardsUI imgsrc={codeStock} />
                        </CardDeck>
                    </Col>
                </Row>
            </div>
        </div>
    )
}