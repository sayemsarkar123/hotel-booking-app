import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setValue, sortRooms } from '../../features/roomsSlice/roomsSlice';
import Banner from '../Banner/Banner';
import Room from '../Room/Room';

const Rooms = () => {
  const rooms = useSelector((state) => state.rooms);
  const values = useSelector((state) => state.values);
  const dispatch = useDispatch();
  const handleChange = ({ target: { name, type, checked, value } }) => {
    dispatch(setValue({ [name]: type === 'checkbox' ? checked : value }));
    dispatch(sortRooms());
  };
  return (
    <>
      <Banner
        {...{
          isRoomDetails: false,
          title: 'our rooms',
          href: '/',
          desc: '',
          btnText: 'return home',
          imageURL: 'room-2.jpeg',
        }}
      />
      <Container>
        <h4
          style={{ fontSize: '2rem' }}
          className="text-capitalize text-center font-weight-bold mt-4"
        >
          search rooms
        </h4>
        <div
          className="mx-auto mt-3 mb-5"
          style={{
            width: '5rem',
            height: '0.3rem',
            backgroundColor: '#af9a7d',
          }}
        ></div>
        <Form>
          <Form.Row>
            <Col>
              <Form.Label className="text-capitalize">room type</Form.Label>
              <Form.Control
                value={values.type}
                onChange={handleChange}
                as="select"
                name="type"
              >
                <option value="all">All</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="family">Family</option>
                <option value="presidential">Presidential</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label className="text-capitalize">guests</Form.Label>
              <Form.Control
                value={values.capacity}
                onChange={handleChange}
                as="select"
                name="capacity"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="10">10</option>
              </Form.Control>
            </Col>
            <Col className="d-flex flex-column">
              <Form.Label className="text-capitalize">
                room price ${values.price}
              </Form.Label>
              <Form.Control
                value={values.price}
                onChange={handleChange}
                className="my-auto"
                min="0"
                max="600"
                type="range"
                name="price"
              />
            </Col>
            <Col>
              <Form.Label className="text-capitalize">room size</Form.Label>
              <Form.Group as={Row}>
                <Col>
                  <Form.Control
                    value={values.minSize}
                    onChange={handleChange}
                    type="number"
                    name="minSize"
                  />
                </Col>
                <Col>
                  <Form.Control
                    value={values.maxSize}
                    onChange={handleChange}
                    type="number"
                    name="maxSize"
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col className="my-auto">
              <Form.Check
                value={values.breakfast}
                onChange={handleChange}
                type="checkbox"
                label="Breakfast"
                name="breakfast"
              />
              <Form.Check
                value={values.pets}
                onChange={handleChange}
                type="checkbox"
                label="Pets"
                name="pets"
              />
            </Col>
          </Form.Row>
        </Form>
        <Row md={4}>
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
          <Col md={12}>
            {!!rooms.length || (
              <h3
                style={{ fontSize: '1.5rem' }}
                className="font-weight-bold text-center my-5"
              >
                Unfortunately No Rooms Matched Your Search Parameters
              </h3>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Rooms;
