import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../styles/Footer.css'
import { getData } from '../Fetcher'

/**
 * Footer is a react komponent that always will be shown on the website
 * @returns a footer as a react-component
 */
export default function Footer () {
/**
 * @constant fetch is a constant that holds the executed window
 */

  const url = 'http://localhost:8000/'
  const usersTable = 'users/'
  const adminCondition = '?role=admin'

  const [admins, setAdmins] = useState(null)

  const fetchAdmins = useCallback(async () => {
    // const response = await fetch('http://localhost:8000/users?role=admin')
    // const data = await response.json()
    const data = await getData(url, usersTable, adminCondition)
    setAdmins(data)
  }, [])

  /**
   * @method useEffect is a React function that is used to not rerender uneccesary thing
   */
  useEffect(() => {
    fetchAdmins()
  }, [fetchAdmins])

  return (
    <div className='main-footer'>
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h4>Skapats av </h4>
            <ul className='list-unstyled'>
              <li> <a href='https://github.com/axelhertzberg' target='_blank' rel='noreferrer'> Axel Hertzberg</a> </li>
              <li> <a href='https://github.com/jonasn-chalmers' target='_blank' rel='noreferrer'> Jonas Nordin</a> </li>
              <li> <a href='https://github.com/0x3D' target='_blank' rel='noreferrer'> Erik Anttila Ryderup</a> </li>
              <li> <a href='https://github.com/erikbengtssonchalmers' target='_blank' rel='noreferrer'> Erik Bengtsson</a> </li>
              <li> <a href='https://github.com/theodorlyrheden' target='_blank' rel='noreferrer'> Theodor Lyrheden</a> </li>
              <li> <a href='https://github.com/filiphan' target='_blank' rel='noreferrer'> Filip Hansson</a> </li>
              <li> <a href='https://github.com/oliost' target='_blank' rel='noreferrer'> Oliver Österberg</a> </li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h4>Länkar </h4>
            <ul className='list-unstyled'>
              <li> <a href='http://localhost:3000/booking'> Bokning </a> </li>
              <li> <a href='http://localhost:3000/profile'> Mina bokningar</a> </li>
              <li> <a href='http://localhost:3000/home'> Login</a> </li>
              <li> <a href='http://localhost:3000/admin'> Admin</a> </li>
              <li> <a href='http://localhost:3000/admin'> Om applikation </a> </li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h4>Kontakta MSDOS</h4>
            <ul className='list-unstyled'>
              <li><a href='mailto: msdosmsdos1@gmail.com' target='_blank' rel='noreferrer'>msdosmsdos1@gmail.com</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h4>Adminstratörers kontaktuppgifter </h4>
            <ul className='list-unstyled'>

              {!admins
                ? (<h4>loading...</h4>)
                : (
                  <>
                    {admins.map((row) =>
                      <li key={row.id}><a href={'mailto: ' + row.email} target='_blank' rel='noreferrer'>{row.email}</a></li>
                    )}
                  </>
                  )}
            </ul>
          </Col>
        </Row>
        <div className='footer-buttom'>
          <p className='text-xs-center'>
            <a href='https://github.com/0x3D/MSDOS' target='_blank' rel='noreferrer'> &copy;{new Date().getFullYear()} MSDOS - bokningssystem </a>
          </p>
        </div>
      </Container>
    </div>
  )
}
