import React from 'react'
import renderer from 'react-test-renderer'
import LaundryBooking from '../components/Bookings/LaundryBooking'

// test('renders learn react link', () => {
//   render(<App />)
//   const linkElement =
//   expect(linkElement).toBeInTheDocument();
// })

test('LaundryBookings render correctly', () => {
  const tree = renderer.create(<LaundryBooking />).toJSON()
  expect(tree).toMatchSnapshot()
})
