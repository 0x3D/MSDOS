import React, { useState } from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'
import dataBackend from '../../Data/dataBackend';
import SelectInput from '@material-ui/core/Select/SelectInput';
//import Axios from 'axios'
//var jsonTestData = require('./../../testData/handleUsers.json')


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
},
);

export default function HandleUsers() {
  let jsonTestData = []

  const Axios = require('axios').default;


  const getUsers = async () => {
    try {
      const res = await Axios.get('http://localhost:3002/api/get')
      jsonTestData = res.data
    } catch (err) {
      console.log(err)
    }
  }
  getUsers()

  console.log(jsonTestData);

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

            {jsonTestData.map((row) => {
              <TableRow key={row.apartmentNo}>
                <TableCell component="th" scope="row">
                  {row.apartmentNo}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

// return (
//   <div>
//     <TableContainer component={Paper} >
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow style={{ backgroundColor: "LightGrey" }}>
//             <TableCell ><h2>Name</h2></TableCell>
//             <TableCell align="center"><h2>Lägenhetsnummer</h2></TableCell>
//             {/* <TableCell align="center"><h2>Mobilnummer</h2></TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>

//           {jsonTestData.map((row) => {
//             <TableRow key={row.apartmentNo}>
//               <TableCell component="th" scope="row">
//                 {row.apartmentNo}
//               </TableCell>
//               <TableCell align="center">{row.email}</TableCell>
//             </TableRow>
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </div>
// )




/* <TableBody>
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
*/
