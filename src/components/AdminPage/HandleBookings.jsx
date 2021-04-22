import React, { useState, useEffect } from 'react'
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function HandleBookings() {

  const classes = useStyles()


  const [laundryBookings, setLaundryBookings] = useState(null)

  //Fetches the bookings from the api
const fetchBookings = async () => {
  const response = await fetch('http://localhost:8000/laundryBookings')
  const data = await response.json()
  setLaundryBookings(data)
  console.log(data)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "LightGrey" }}>
              <TableCell align="left"><h3>Start Tid</h3></TableCell>
              <TableCell align="center"><h3>Slut Tid</h3></TableCell>
              <TableCell align="center"><h3>Lägenhetsnummer</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          

            {!laundryBookings ? (<h1>loading...</h1>) : (<>{laundryBookings.map((row) => (
              <TableRow key={row.lghNr}>
                <TableCell component="th" scope="row">
                  {row.start_time}
                </TableCell>
                <TableCell align="center">
                  {row.end_time}
                </TableCell>
                <TableCell align="center">
                  {row.lghNr}
                </TableCell>
              </TableRow>
            ))}</>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
