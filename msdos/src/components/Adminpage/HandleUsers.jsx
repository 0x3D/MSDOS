import React from 'react';
import {makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core/'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
},
);

function createData(name, lghNr, telNumber ) {
  return { name,lghNr, telNumber};
}


const rows = [
  createData('test1', 1, 123123123),
  createData('test2',2, 321321321),
  createData('test3',3, 111000333),
  createData('test4',4,999999999),
  createData('test5',5, 555555555),
];

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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.lghNr}</TableCell>
              <TableCell align="center">{row.telNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
