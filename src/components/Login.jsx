import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { Redirect } from "react-router-dom";
import { authenticateUser, useAuth, getAuthData } from "../LoginBackend";
import { format } from "morgan";

export default function Login(props) {
  const { basicLogin } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleClose = () => setShowHelp(false);
  const handleShow = () => setShowHelp(true);
  const referrer = document.referrer || "/";
  const url = "http://localhost:8000/users?";

  // console.log("referrer url",referrer);

  if (isLoggedIn) {
    return <Redirect to={referrer} />;
  }

  const handleLogin = async (e) => {
    // TODO: Add token here
    console.log("Starting to handle login");
    await setUserData(await request());
    console.log("The login was handled");
    console.log(userData);
  };

  /*const userTokens = authenticateUser(username, password);
      basicLogin(userTokens);
      // fetchUser();
      console.log("Hej logga in");
      if (username === JSON.parse(json[0].password)) {
        setLoggedIn(true);
      }
      */

  const request = async () => {
    const response = await fetch(
      "http://localhost:8000/users?" + "apartmentNo=" + "1"
    );
    const json = await response.json();
    console.log(json);
    return json;
  };

  //request();

  function validateForm() {
    // TODO: Add check for password security and proper email here
    return username.length > 0 && password.length > 0;
  }

  // TODO: Authenticate here. authentication should probably be factored out into another file
  /*
  const fetchUser = async () => {
    const tokens = getAuthData();
    const response = await fetch(url + "apartmentNo=" + "1")
      .then((response) => {
        response.text();
      })
      .then((json) => {
        console.log(json);
        console.log("hej");
      });
    console.log(url + "apartmentNo=" + "1");
    const data = await response.json();
    setUserData(data);
    await console.log(data);
  };
  */
  // if authenticated(tokens) check instead

  return (
    <Container classname="loginContainer">
      {isLoggedIn ? <Redirect to="/booking" /> : <h1> &nbsp;</h1>}
      <Modal show={showHelp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>To create a login ask your administrator</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Row className="justify-content-md-center">
        <Col xs={5} xs-offset={2}>
          <Form
            classname="loginForm"
            onClick={() => {
              handleLogin();
            }}
          >
            <Form.Group controllId="formBasicUsername">
              <Form.Label> Apartment Number </Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="47"
              />
            </Form.Group>
            <Form.Group controllerId="formBasicPassword">
              <Form.Label> Password </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </Form.Group>
            <Row className="justify-content-md-center">
              <Button type="submit" disabled={!validateForm()}>
                Sign in
              </Button>
              <Col xs={1}>&nbsp;</Col>
              <Button
                type="button"
                onClick={() => {
                  handleShow();
                }}
              >
                Help
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
