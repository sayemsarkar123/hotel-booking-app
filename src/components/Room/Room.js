import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Room = ({ room: { id, name, price, images } }) => {
  const history = useHistory();
  return (
    <Col>
      <Card
        onClick={() => history.push(`/room/${id}`)}
        style={{ cursor: 'pointer' }}
        className="position-relative rounded-0 border-0 shadow-sm my-3"
      >
        <Card.Img className="rounded-0" src={`assets/images/${images[0]}`} />
        <Card.Body style={{ backgroundColor: '#cfcfcf' }} className="px-0 py-2">
          <Card.Title className="text-capitalize text-center">
            {name}
          </Card.Title>
        </Card.Body>
        <div
          style={{ backgroundColor: 'rgba(0 0 0 / 50%)' }}
          className="position-absolute top-0 left-0 p-2"
        >
          <h6 className="text-white m-0">${price}</h6>
          <p style={{ fontSize: '10px' }} className="text-white m-0">
            per night
          </p>
        </div>
      </Card>
    </Col>
  );
};

export default Room;
