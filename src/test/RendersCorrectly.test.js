import '@testing-library/jest-dom/extend-expect'
import LaundryBooking from '../components/Bookings/LaundryBooking'
import ShallowRenderer from 'react-test-renderer/shallow'
import GymBooking from '../components/Bookings/GymBooking'
import RoomBooking from '../components/Bookings/RoomBooking'
import Login from '../components/Login'
import Profile from '../components/Profile/Profile'
import NavigationBar from '../components/NavigationBar'
import BookingHistory from '../components/AdminPage/BookingHistory'
import HandleBookings from '../components/AdminPage/HandleBookings'
import HandleUsers from '../components/AdminPage/HandleUsers'
import MyFacilities from '../components/AdminPage/MyFacilities'
import AuthDataProvider from '../LoginBackend'
import AdminPage from '../components/AdminPage/AdminPage'
import MyLaundryBookings from '../components/Profile/MyLaundryBookings'
import MyGymBookings from '../components/Profile/MyGymBookings'
import MyRoomBookings from '../components/Profile/MyRoomBookings'

it('LaundryBookings renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<LaundryBooking />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('GymBookings renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<GymBooking />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('RoomBokings renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<RoomBooking />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('Login renders correctly', () => {
  const renderer = new ShallowRenderer()
  // AuthDataProvider provides login which Login component needs
  renderer.render(<AuthDataProvider> <Login /></AuthDataProvider>)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('AdminPage renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<AdminPage />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('Profile renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Profile />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('NavigationBar renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<AuthDataProvider> <NavigationBar /></AuthDataProvider>)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('BookingHistory renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<BookingHistory />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('HandleBookings renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<HandleBookings />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('HandleUsers renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<HandleUsers />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('MyFacilities renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<MyFacilities />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('MyLaundryBookings renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<MyLaundryBookings />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('MyGymBookings renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<MyGymBookings />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})

it('MyRoomBookings renders correctly', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<MyRoomBookings />)
  const result = renderer.getRenderOutput()
  expect(result).toMatchSnapshot()
})
