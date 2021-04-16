import React from 'react'
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'

var jsonTestData = require('./../../testData/handleBookings.json')

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function HandleBookings() {

  const classes = useStyles()

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "LightGrey" }}>
              <TableCell align="left"><h3>Name</h3></TableCell>
              <TableCell align="center"><h3>Faciliteter</h3></TableCell>
              <TableCell align="center"><h3>Tid</h3></TableCell>
              <TableCell align="center"><h3>Dag</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonTestData.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
