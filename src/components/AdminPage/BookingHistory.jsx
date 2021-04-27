
import React, { useState, useEffect } from 'react'
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core/'
import { Container, Row, Col, Toast } from 'react-bootstrap'
import CheckBox from '../../assets/greenCheck.png'

/**
 * @constant useStyles is used to set the width of the table created
 * @see [Materia-UI](https://material-ui.com/styles/basics/)
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

/**
 * A admin component that gives overView og all bookingHistory
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function BookingHistory () {
  /**
      * @constant classes is to set the styles in the returned Component
      */
  const classes = useStyles()

  const [bookingHistory, setBookingHistory] = useState(null)

  const [showToast, setShowToast] = useState(false)
  const toggleShowToast = () => { setShowToast(!showToast) }

  /**
   * Fetches the bookings from the api
   */
  const fetchBookings = async () => {
    const response = await fetch('http://localhost:8000/bookingHistory')
    const data = await response.json()
    setBookingHistory(data)
  }

  const clearBookingHistory = async () => {
    console.log('m called')
    const arr = Object.keys(bookingHistory)
    console.log(arr)
    for (let i = 0; i < bookingHistory.length; i++) {
      fetch('http://localhost:8000/bookingHistory/' + bookingHistory[i].id, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => console.log(res))
    }
    toggleShowToast()
  }

  /**
     * useEffect is a React function that is used to not rerender uneccesary thing
     */
  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Toast show={showToast} onClose={toggleShowToast}>
              <Toast.Header>
                <img width='35px' src={CheckBox} alt='' />
                <strong className='mr-auto'>Bokning borttagen</strong>

              </Toast.Header>
              <Toast.Body>Bokningen har blivit borttagen, uppdatera sidan för att se ädnringar</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>

      <TableContainer component={Paper}>
        <Button
          variant='contained' color='secondary' fullWidth='true' onClick={(e) => {
            clearBookingHistory()
          }}
        >
          Rensa bokningshistorik
        </Button>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow style={{ backgroundColor: 'LightGrey' }}>
              <TableCell align='left'><h3>Start Tid</h3></TableCell>
              <TableCell align='center'><h3>Slut Tid</h3></TableCell>
              <TableCell align='center'><h3>Lägenhetsnummer</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {!bookingHistory
              ? (<h1>loading...</h1>)
              : (
                <>
                  {bookingHistory.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component='th' scope='row'>
                        {row.start_time}
                      </TableCell>
                      <TableCell align='center'>
                        {row.end_time}
                      </TableCell>
                      <TableCell align='center'>
                        {row.apartmentNo}
                      </TableCell>
                      <TableCell />
                    </TableRow>))}
                </>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
