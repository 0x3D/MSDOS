import React, { useState, useEffect } from 'react'
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'
import { Container, Row, Col, Toast } from 'react-bootstrap'
import CheckBox from '../../assets/greenCheck.png'

/**
 * @constant useStyles is used to set the width of the table created
 * @see [Materia-UI](https://material-ui.com/styles/basics/)
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
}
)

/**
 * A admin component that gives a overview of all Users
 * The bookings i stored in a Json-placeholder
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function HandleUsers () {
  /**
   * users is a variables, and setUsers is a set-method for the variable
   * Usestate is the default value
   * @constant users
   * @method setUsers
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [users, setUsers] = useState(null)

  /**
   * @constant  showToast is a variables, and @method setShowToast is a set-method for the variable
   * Usestate is the default value
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [showToast, setShowToast] = useState(false)
  const toggleShowToast = () => { setShowToast(!showToast) }

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
  }

  /**
 * useEffect is a React function that is used to not rerender uneccesary thing
 */
  useEffect(() => {
    fetchUsers()
  }, [])

  const removeUser = async (e) => {
    console.log('m called')
    const id = String(e)
    fetch('http://localhost:8000/users/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
    toggleShowToast()
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Toast show={showToast} onClose={toggleShowToast}>
              <Toast.Header>
                <img width='35px' src={CheckBox} alt='' />
                <strong className='mr-auto'>Bokning borttagen</strong>

              </Toast.Header>
              <Toast.Body> Användaren har blivit borttagen! Uppdatera sidan för att se resultat </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow style={{ backgroundColor: 'LightGrey' }}>
              <TableCell><h2>Lägenhetsnummer</h2></TableCell>
              <TableCell align='center'><h2>Email</h2></TableCell>
              <TableCell align='center'><h2> {/** SKA VARA TOM */} </h2></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!users
              ? (<h1>loading...</h1>)
              : (
                <>
                  {users.map((row) => (
                    <TableRow key={row.apartmentNo}>
                      <TableCell align='center' scope='row'>
                        {row.apartmentNo}
                      </TableCell>
                      <TableCell align='center'>
                        {row.email}
                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          variant='contained' color='secondary' onClick={(e) => {
                            removeUser(row.id)
                          }}
                        > Ta bort användare
                        </Button>
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
