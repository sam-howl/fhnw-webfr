import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = ({ message, qs }) =>
  <Row>
    <Col>{message}</Col>
    <Col className='text-right'>{qs} Questionnaires found</Col>
  </Row>

export default Footer;
