import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';


/**
 * A admin component that gives a overview of all Faciities
 * 
 * 
 * 
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function MyFacilities() {


    const [facilities, setFacilities] = useState([])

    
    useEffect(() => {
        setFacilities("tvättStuga")
    })

    return (
        <div className="AddFacility">
            <Card>
                <Card.Header> Lista över Faciiteter</Card.Header>
                <Card.Body> {facilities} </Card.Body>
            </Card>
        </div>
    )
}

