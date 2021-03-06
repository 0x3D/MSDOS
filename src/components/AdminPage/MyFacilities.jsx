import React, { useState, useEffect } from 'react'
import Loader from '../Loader'
import { Card, ListGroup } from 'react-bootstrap'
import { getData } from '../../Fetcher'
import '../../styles/App.css'

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
    <div>
      <div fac-header> </div>
      <Card style={{ color: 'white', backgroundColor: 'var(--c3-color)' }}>

        <Card.Header className='fac-div-border' style={{ color: 'var(--c2-color)' }}> <div><h3 className='fac-header'><b>Faciliteter</b></h3></div></Card.Header>
        <ListGroup style={{ backgroundColor: 'var(--c3-color)' }}>
          {!facilities
            ? (<Loader />)
            : (
              <> {
              facilities.map((row) => (
                <React.Fragment key={row.fac}>
                  <ListGroup.Item style={{ backgroundColor: 'var(--c3-color)' }} key={row.fac}>{row.fac}</ListGroup.Item>
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
