import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Room from '../Room/Room';
import data from './../../data';

const Featured = () => {
  const [rooms, ] = useState(data.filter(room => room.featured));
  return (
    <Container className="py-5">
      <h4
        style={{ fontSize: '2rem' }}
        className="text-capitalize text-center font-weight-bold mt-4"
      >
        featured rooms
      </h4>
      <div
        className="mx-auto mt-3 mb-5"
        style={{ width: '5rem', height: '0.3rem', backgroundColor: '#af9a7d' }}
      ></div>
      <Row md={3}>
        {
          rooms.slice(-3).map(room => <Room key={room.id} room={room}/>)
        }
      </Row>
    </Container>
  );
};

export default Featured;