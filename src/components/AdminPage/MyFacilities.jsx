import React, { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { getData } from '../../Fetcher'

const url = 'http://localhost:8000/'
const facilitiestable = 'facilities/'

/**
 * A admin component that gives a overview of all Faciities
 *
 *
 *
 * @returns a react-component
 * @version 0.1.0
 * @author [Axel Hertzberg](https://github.com/axelhertzberg)
 */
export default function MyFacilities () {
  /**
   * facilities is a variables, and setFacilities is a set-method for the variable
   * Usestate is the default value
   * @constant facilities holds the values of the facilities
   * @method setFacilities is a setter for the users constant
   * @see [reactjs](https://reactjs.org/docs/hooks-state.html)
   */
  const [facilities, setFacilities] = useState(null)

  /**
   * @method fetchBookings Fething the facilities data from the database
   */
  const fetchBookings = async () => {
    const data = await getData(url, facilitiestable)
    setFacilities(data)
  }

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className='AddFacility'>
      <Card>
        <Card.Header as='h3'> <b>Faciliteter</b> </Card.Header> <br />
        <ListGroup variant='flush'>
          {!facilities
            ? (<h1>loading...</h1>)
            : (
              <> {
              facilities.map((row) => (
                <React.Fragment key={row.fac}>

                  <ListGroup.Item key={row.fac}>{row.fac}</ListGroup.Item>

                </React.Fragment>
              ))
            }
              </>
              )}
        </ListGroup>
      </Card>
    </div>
  )
}
