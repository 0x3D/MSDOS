import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { getAuthData } from '../../LoginBackend'
import { getData } from '../../Fetcher'
import MyLaundryBookings from './MyLaundryBookings'
import MyGymBookings from './MyGymBookings'
import MyRoomBookings from './MyRoomBookings'

/**
 * The Profile component is the component that show the info of the users that are logged in.
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */

export default function Profile () {
  const currentUser = getAuthData().apartmentNo
  const url = 'http://localhost:8000/'
  const userTable = 'users'
  const userCondition = '?apartmentNo=' + String(currentUser)

  /**
   * usersData is a variables, and setUserData is a set-method for the variable
   * Usestate is the default value
   * @constant usersData holds the data
   * @method setUsers sets the data
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [userData, setUserData] = useState(null)

  /**
  * @method fetchUsers gets the user that is loggedIn
  */
  const fetchUsers = useCallback(async () => {
    const data = await getData(url, userTable, userCondition)
    setUserData(data)
  }, [userCondition])

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              <h3>
                <h3>
                  <b>Email:</b>
                </h3>{' '}
                {!userData
                  ? (<h2>Not logged in</h2>)
                  : (
                      userData[0].email
                    )}
              </h3>
            </Col>

            <Col>
              <h3>
                <h3>
                  <b>Lägenhetsnummer: </b>{' '}
                </h3>{' '}
                {currentUser}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              {/* {Sätt in bekräftelse på bokning här} */}
            </Col>
          </Row>
          <Row>
            <Col style={{ margin: '20px' }}>  <MyLaundryBookings loggedIn={currentUser} /> </Col>
          </Row>
          <Row>
            <Col style={{ margin: '20px' }}>  <MyGymBookings loggedIn={currentUser} /> </Col>
          </Row>
          <Row>
            <Col style={{ margin: '20px' }}> <MyRoomBookings loggedIn={currentUser} /> </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
