import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = ({ message }) =>
  <Row>
    <Col>{message}</Col>
  </Row>

export default Footer;
