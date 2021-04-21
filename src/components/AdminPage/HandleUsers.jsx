import React, {useState} from 'react';
import {makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core/'
var jsonTestData = require('./../../testData/handleUsers.json')

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
},
);

export default function HandleUsers() {

const classes = useStyles()

   return (
    <div>
      <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style ={{backgroundColor:"LightGrey"}}>
            <TableCell ><h2>Name</h2></TableCell>
            <TableCell align="center"><h2>Lägenhetsnummer</h2></TableCell>
            <TableCell align="center"><h2>Mobilnummer</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonTestData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.appNr}</TableCell>
              <TableCell align="center">{row.telNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
