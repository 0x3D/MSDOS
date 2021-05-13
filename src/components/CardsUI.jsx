import React, { Component } from 'react'
import { Card, Container } from 'react-bootstrap'
import '../styles/Cards.css'



export default function CardsUI(props) {



    return (
        <div>
            <Card style={{ flex: 1 }}>
                <Card.Body>
                    <Card.Img src={props.imgsrc}></Card.Img>
                    <Card.Title>
                        This is a title
                     </Card.Title>
                    <Card.Text>
                        The most obvious one difference is the syntax. A functional component is just a plain JavaScript function which accepts props as an argument and returns a React element. A class component requires you to extend from React. Component and create a render function which returns a React element.
                    </Card.Text>
                    <Card.Footer> här ska vi ha en länk till något gött </Card.Footer>
                </Card.Body>
            </Card>

        </div>
    )
}