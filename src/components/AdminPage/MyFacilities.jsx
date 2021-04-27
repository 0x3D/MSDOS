import React, { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

/**
 * A admin component that gives a overview of all Faciities
 *
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function MyFacilities () {
  const [facilities, setFacilities] = useState(null)

  const fetchBookings = async () => {
    const response = await fetch('http://localhost:8000/facilities')
    const data = await response.json()
    setFacilities(data)
    console.log(data)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className='AddFacility'>
      <Card>
        <Card.Header as='h3'> <b>Faciliteter</b> </Card.Header> <br />
        <ListGroup variant='flush'>
          {!facilities
            ? (<h1>loading...</h1>)
            : (<> {
              facilities.map((row) => (
                <>
                  <ListGroup.Item>{row.fac}</ListGroup.Item>
                </>
              ))
            }
            </>)}
        </ListGroup>
      </Card>
    </div>
  )
}
