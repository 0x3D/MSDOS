import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

export default function Login() {
  return (
    <Container classname="loginContainer">
      <Row>
        <Col md={6}>
          <Form classname="loginForm">
            <Form.Group controllId="formBasicEmail">
              <Form.Label> Email adress </Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controllerId="formBasicPassword">
              <Form.Label> Password </Form.Label>
              <Form.Control type="password"></Form.Control>
              <Button>Sign in</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
