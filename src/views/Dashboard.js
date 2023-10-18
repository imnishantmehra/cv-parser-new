import React, { useState, useRef, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Toast,
} from "react-bootstrap";

function Dashboard() {
  const [showB, setShowB] = useState(false);
  const toggleShowB = () => setShowB(!showB);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={6} className="mb-2">
            Dashboard
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
