import { Form, Row, Col } from 'react-bootstrap'

const localStorage = window.localStorage

export default function BookingSettings () {
  const settings = {
    laundryTime: 2,
    gymTime: 1
  }

  // If settings already exist load them
  if (localStorage.getItem('settings')) {
    settings.laundryTime = JSON.parse(localStorage.getItem('settings')).laundryTime
    settings.gymTime = JSON.parse(localStorage.getItem('settings')).gymTime
  }
  // todo: Load changes from settings1

  const handleLaundryChange = e => {
    e.preventDefault()
    // TODO  Check if valid here.
    settings.laundryTime = e.target.value
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  const handleGymChange = e => {
    e.preventDefault()
    // TODO  Check if valid here.
    settings.gymTime = e.target.value
    localStorage.setItem('settings', JSON.stringify(settings))
  }
  // defaultValue={this.state.selectValue}
  return (
    <>
      <Form>
        <Form.Group as={Row} controlId='laundryBookingAmount'>
          <Form.Label column sm='3'>
            Tvättstuga max antal bokade tider :
          </Form.Label>
          <Col sm='9'>
            <Form.Control as='select' value={settings.laundryTime} onChange={handleLaundryChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='gymBookingAmount'>
          <Form.Label column sm='3'>
            Gym max antal bokade tider :
          </Form.Label>
          <Col sm='9'>
            <Form.Control as='select' value={settings.gymTime} onChange={handleGymChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Col>
        </Form.Group>

      </Form>
    </>
  )
}
