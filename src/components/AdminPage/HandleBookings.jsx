import React, { useState, useEffect } from 'react'
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'

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
   * Fetches the bookings from the api
   */
  const fetchBookings = async () => {
    const response = await fetch('http://localhost:8000/laundryBookings')
    const data = await response.json()
    setLaundryBookings(data)
  }
  /**
   * useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow style={{ backgroundColor: 'LightGrey' }}>
              <TableCell align='left'><h3>Start Tid</h3></TableCell>
              <TableCell align='center'><h3>Slut Tid</h3></TableCell>
              <TableCell align='center'><h3>Lägenhetsnummer</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {!laundryBookings
              ? (<h1>loading...</h1>)
              : (
                <>
                  {laundryBookings.map((row) => (
                    <TableRow key={row.lghNr}>
                      <TableCell component='th' scope='row'>
                        {row.start_time}
                      </TableCell>
                      <TableCell align='center'>
                        {row.end_time}
                      </TableCell>
                      <TableCell align='center'>
                        {row.lghNr}
                      </TableCell>
                    </TableRow>))}
                </>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
