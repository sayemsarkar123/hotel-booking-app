import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Service from '../Service/Service';
import data from './data';

const Services = () => {
  const [services, ] = useState(data);
  return (
    <Container style={{ backgroundColor: '#cfcfcf' }} className="py-5" fluid>
      <h4
        style={{ fontSize: '2rem' }}
        className="text-capitalize text-center font-weight-bold mt-4"
      >
        services
      </h4>
      <div
        className="mx-auto mt-3 mb-5"
        style={{ width: '5rem', height: '0.3rem', backgroundColor: '#af9a7d' }}
      ></div>
      <Row>
        {services.map((service, idx) => (
          <Service key={idx} service={service} />
        ))}
      </Row>
    </Container>
  );
};

export default Services;
