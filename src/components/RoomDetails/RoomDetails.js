import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Banner from '../Banner/Banner';

const RoomDetails = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const rooms = useSelector((state) => state.rooms);
  useEffect(() => {
    setRoom(rooms.find((r) => r.id === roomId));
  }, [roomId, rooms]);
  return (
    <>
      <Banner
        {...{
          isRoomDetails: true,
          title: `${room.name} room`,
          href: room.id,
          desc: '',
          btnText: 'book room',
          imageURL: room.images?.[0],
        }}
      />
      <Container>
        <Row>
          <Col md={12} className="mt-5">
            <Row md={3}>
              {room.images?.map((imageURL, idx) =>
                idx ? (
                  <Col key={idx}>
                    <Image fluid src={`/assets/images/${imageURL}`} />
                  </Col>
                ) : null
              )}
            </Row>
          </Col>
          <Col md={6} className="mt-5">
            <h3
              style={{ letterSpacing: '0.3rem' }}
              className="text-capitalize font-weight-bold"
            >
              details
            </h3>
            <p style={{ lineHeight: '1.5' }}>{room.description}</p>
          </Col>
          <Col md={6} className="mt-5">
            <h3
              style={{ letterSpacing: '0.3rem' }}
              className="text-capitalize font-weight-bold"
            >
              info
            </h3>
            <h6
              style={{ fontSize: '1.2rem' }}
              className="text-capitalize font-weight-light mb-3"
            >
              price : ${room.price}
            </h6>
            <h6
              style={{ fontSize: '1.2rem' }}
              className="text-capitalize font-weight-light mb-3"
            >
              size : {room.size} SQFT
            </h6>
            <h6
              style={{ fontSize: '1.2rem' }}
              className="text-capitalize font-weight-light mb-3"
            >
              max capacity: {room.capacity}
            </h6>
            <h6
              style={{ fontSize: '1.2rem' }}
              className="text-capitalize font-weight-light mb-3"
            >
              {room.pets ? '' : 'No'} pets allowed
            </h6>
            <h6
              style={{ fontSize: '1.2rem' }}
              className="text-capitalize font-weight-light mb-3"
            >
              {room.breakfast ? 'free breakfast included' : ''}
            </h6>
          </Col>
          <Col md={12} className="mt-4">
            <h6
              style={{ letterSpacing: '0.3rem' }}
              className="text-capitalize font-weight-bold mb-3"
            >
              extras
            </h6>
            <ul className="list-unstyled d-flex flex-wrap">
              {room.extras?.map((extra, idx) => (
                <li
                  key={idx}
                  className="mb-3"
                  style={{ flexBasis: 'calc(100% / 3)' }}
                >
                  -{extra}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RoomDetails;
