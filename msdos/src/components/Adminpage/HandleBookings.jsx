import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, type, time, date) {
  return { name, type, time, date};
}


const rows = [
  createData('test1', 'tvätt', 13, "tors"),
  createData('test2', 'cykel', 15, "onsdag"),
  createData('testr3', 'gym', 8, "måndag"),
  createData('teste4', 'tvätt', 8, "söndag"),
  createData('testd5', 'tvätt', 10, "lördag"),
];


export default function HandleBookings() {

 const classes = useStyles()

  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Facilitet</TableCell>
            <TableCell align="right">Tid</TableCell>
            <TableCell align="right">Dag</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
