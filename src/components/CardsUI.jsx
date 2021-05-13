import React, { Component } from 'react'
import { Card, Container } from 'react-bootstrap'
import '../styles/Cards.css'

export default function CardsUI(props) {



    return (
        <div className='mx-auto'>
            <Card className='card' className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Img className='card-img-top' src={props.imgsrc}></Card.Img>
                    <Card.Title>
                        <h4>
                            {props.cardTitle}
                        </h4>
                    </Card.Title>
                    <Card.Text className='md-text'> {props.cardText} </Card.Text>
                    <Card.Footer>
                        <Card.Link href='https://github.com/0x3D/MSDOS'> Github </Card.Link>
                    </Card.Footer>
                </Card.Body>
            </Card>

        </div>
    )
}