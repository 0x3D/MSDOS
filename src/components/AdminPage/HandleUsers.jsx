import React, { useState, useEffect } from 'react'
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core/'
import { Container, Row, Col, Toast } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'
import { getData, deleteData } from '../../Fetcher'

const url = 'http://localhost:8000/'

/**
 * @constant useStyles is used to set the width of the table created
 * @see [Materia-UI](https://material-ui.com/styles/basics/)
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

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
   * @constant users holds the values of the users
   * @method setUsers is a setter for the users constant
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [users, setUsers] = useState(null)

  /**
   * @constant  showToast is a variables, and @method setShowToast is a set-method for the variable
   * Usestate is the default value
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [showToast, setShowToast] = useState(false)

  /**
   * @method toggleShowToast is a method that handle the the @method setShowToast setter
   */
  const toggleShowToast = () => {
    setShowToast(!showToast)
  }

  /**
   * @constant classes is to set the styles in the returned Component
   */
  const classes = useStyles()

  /**
   * Fething the users data
   */
  const fetchUsers = async () => {
    const data = await getData(url, 'users/')
    setUsers(data)
  }

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchUsers()
  }, [])

  /**
   * @method removeUser is a async function that removes the user from the DB
   * @param {is the event} e
   */
  const removeUser = async (e) => {
    const id = String(e)
    deleteData(url, 'users/', id)
    toggleShowToast()
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Toast show={showToast} onClose={toggleShowToast}>
              <Toast.Header>
                <FaCheck size='2em' />
                <strong className='mr-auto'>Användare borttagen</strong>
              </Toast.Header>
              <Toast.Body>
                {' '}
                Användaren har blivit borttagen! Uppdatera sidan för att se
                resultat{' '}
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead className='handleUsersTop'>
            <TableRow style={{ backgroundColor: 'LightGrey' }}>
              <TableCell>
                <h2 className='handleUsersTitle'>Lägenhetsnummer</h2>
              </TableCell>
              <TableCell align='center'>
                <h2 className='handleUsersTitle'>Email</h2>
              </TableCell>
              <TableCell align='center'>
                <h2> {/** SKA VARA TOM */} </h2>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className='handleUsersBody'>
            {!users
              ? (<h1>loading...</h1>)
              : (
                <>
                  {users.map((row) => (
                    <TableRow key={row.apartmentNo}>
                      <TableCell align='center' scope='row'>
                        {row.apartmentNo}
                      </TableCell>
                      <TableCell align='center'>{row.email}</TableCell>
                      <TableCell className='removeUser' align='center'>
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={(e) => {
                            removeUser(row.id)
                          }}
                        >
                          {' '}
                          Ta bort användare
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
