import React, { useState, useEffect } from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'


/**
 * @constant useStyles is used to set the width of the table created
 * @see [Materia-UI](https://material-ui.com/styles/basics/)
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
},
);

/**
 * A admin component that gives a overview of all Users
 * The bookings i stored in a Json-placeholder
 * 
 * 
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function HandleUsers() {

  /**
   * users is a variables, and setUsers is a set-method for the variable
   * Usestate is the default value
   * @constant users
   * @method setUsers
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [users, setUsers] = useState(null)

  /**
   * @constant classes is to set the styles in the returned Component
   */
  const classes = useStyles()

  /**
   * Fething the users data
   */
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8000/users')
    const data = await response.json()
    setUsers(data)
    console.log(data)
  }

  /**
 * useEffect is a React function that is used to not rerender uneccesary thing
 */
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

