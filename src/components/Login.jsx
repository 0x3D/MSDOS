import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

export default function Login() {
  const handleLogin = (e) => {};

  return (
    <Container classname="loginContainer">
      <Row className="justify-content-md-center">
        <Col xs={5}>
          <Form classname="loginForm">
            <Form.Group controllId="formBasicEmail">
              <Form.Label> Email adress </Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controllerId="formBasicPassword">
              <Form.Label> Password </Form.Label>
              <Form.Control type="password"></Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Button
          onClick={() => {
            console.log("hej");
          }}
        >
          Sign in
        </Button>
      </Row>
    </Container>
  );
}