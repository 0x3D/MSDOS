import React, { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'
import { Container, Row, Col, Toast } from 'react-bootstrap'
import CheckBox from '../../assets/greenCheck.png'


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
    <div>
      <Card >
        <Card.Header as='h3'> <b class="card-header card-header-warning" id="card-header-color">Faciliteter</b> </Card.Header> <br />
        <ListGroup>
          {!facilities
            ? (<h1>loading...</h1>)
            : (<> {
              facilities.map((row) => (
                <>
                  
                    <ListGroup.Item key={row.fac} >{row.fac}</ListGroup.Item>
                  
                </>
              ))
            }
            </>)}
        </ListGroup>
      </Card>
    </div>
  )
  
}
