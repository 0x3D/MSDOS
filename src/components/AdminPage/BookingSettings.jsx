import { Form, Row, Col } from 'react-bootstrap'
export default function BookingSettings () {
  const handleDropDownChange = e => {
    // TODO: This should change in globalstate/cookies/LocalStorage
    console.log(e)
  }

  // defaultValue={this.state.selectValue}
  return (
    <>
      <Form>
        <Form.Group as={Row} controlId='BookingAmount'>
          <Form.Label column sm='3'>
            Tvättstuga max antal bokade tider :
          </Form.Label>
          <Col sm='9'>
            <Form.Control as='select' onChange={handleDropDownChange}>
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
