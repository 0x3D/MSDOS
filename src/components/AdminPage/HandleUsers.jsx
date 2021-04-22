import React, { useState, useEffect } from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'




const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
},
);


export default function HandleUsers() {

  const [users, setUsers] = useState(null)
  const classes = useStyles()

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8000/users')
    const data = await response.json()
    setUsers(data)
    console.log(data)
    }

  useEffect(async () => {
    fetchUsers()
  }, [])


  return (
    <div>
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "LightGrey" }}>
              <TableCell ><h2>Lägenhetsnummer</h2></TableCell>
              <TableCell align="center"><h2>Email</h2></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!users ? (<h1>loading...</h1>) : (<>{users.map((row) => (
              <TableRow key={row.lghNr}>
                <TableCell align="center" scope="row">
                  {row.lghNr}
                </TableCell>
                <TableCell align="center">
                  {row.email}
                </TableCell>
              </TableRow>
            
            ))}</>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

