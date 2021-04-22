import React, { useState, useEffect } from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'
import dataBackend from '../../Data/dataBackend';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { setDate } from 'date-fns/esm';
//import Axios from 'axios'
//var jsonTestData = require('./../../testData/handleUsers.json')


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
},
);

export default function HandleUsers() {
  const [fetchedData, setFetchedData] = useState(null)

  useEffect(async () => {
      const response = await fetch('http://localhost:8000/bookedTimes/')
      const data = await response.json()
      setFetchedData(data)
      console.log(data)
  }, [])



  const classes = useStyles()
  return (
    <div>
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "LightGrey" }}>
              <TableCell ><h2>Name</h2></TableCell>
              <TableCell align="center"><h2>Lägenhetsnummer</h2></TableCell>
              {/* <TableCell align="center"><h2>Mobilnummer</h2></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {!fetchedData ? (<h1>loading...</h1>) : (<div>{fetchedData.map(row => <p>{row.start_time}</p>)}</div>)}

            {/* {jsonTestData.map((row) => {
              <TableRow key={row.apartmentNo}>
              <TableCell component="th" scope="row">
              {row.apartmentNo}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              </TableRow>
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}