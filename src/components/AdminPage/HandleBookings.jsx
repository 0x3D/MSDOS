import React, { useState, useEffect } from 'react'
import Loader from '../Loader'
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core/'
import { Container, Row, Col, Toast } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'
import { getData, deleteData } from '../../Fetcher'
import { formatDate } from '../../DateFormatter'

const url = 'http://localhost:8000/'
const laundryBokingTable = 'laundryBookings/'

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
 * A admin component that gives a overview of all bookings
 * The bookings i stored in a Json-placeholder
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function HandleBookings () {
  /**
   * @constant classes is to set the styles in the returned Component
   */
  const classes = useStyles()

  /**
   * laundryBookings is a variable, and setLaundryBookings is a set-method for the variable
   * Usestate is the default value
   *
   * @constant laundryBookings
   * @method setLaundryBookings
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [laundryBookings, setLaundryBookings] = useState(null)

  /**
   * @constant  showToast is a variables, and @method setShowToast is a set-method for the variable
   * Usestate is the default value
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [showToast, setShowToast] = useState(false)

  /**
   * @method toggleShowToast is a method that handle the the @method setShowToast setter
   */
  const toggleShowToast = () => {
    setShowToast(!showToast)
  }

  /**
   * Fetches the bookings from the api
   */
  const fetchBookings = async () => {
    const data = await getData(url, laundryBokingTable)
    setLaundryBookings(data)
  }

  /**
   * @method removeBooking is a async function that remove a booking from the DB
   * @param {is the event} e
   */
  const removeBooking = async (e) => {
    const id = String(e)
    deleteData(url, laundryBokingTable, id)
    toggleShowToast()
  }

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
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
                <FaCheck size='2em' />
                <strong className='mr-auto'>Bokning borttagen</strong>
              </Toast.Header>
              <Toast.Body>
                Bokningen har blivit borttagen, uppdatera sidan för att se
                ädnringar
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead className='handleBookingTop'>
            <TableRow>
              <TableCell align='left'>
                <h3 className='handleBookingStart'>Starttid</h3>
              </TableCell>
              <TableCell align='center'>
                <h3 className='handleBookingSlut'>Sluttid</h3>
              </TableCell>
              <TableCell align='center'>
                <h3 className='handleBookingLGHnr'>Lägenhetsnummer</h3>
              </TableCell>
              <TableCell align='center'>
                <h3 className='handleBookingTaBort'>Ta bort bokning</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='handleBookingBody'>
            {!laundryBookings
              ? (<Loader />)
              : (
                <>
                  {laundryBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell component='th' scope='row'>
                        {formatDate(booking.start_time)}
                      </TableCell>
                      <TableCell align='center'>{formatDate(booking.end_time)}</TableCell>
                      <TableCell align='center'>{booking.apartmentNo}</TableCell>
                      <TableCell className='removeUser'>
                        {' '}
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={(e) => {
                            removeBooking(booking.id)
                          }}
                        >
                          {' '}
                          Ta bort bokning
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
