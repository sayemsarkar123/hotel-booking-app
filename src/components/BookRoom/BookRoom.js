import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().min(6).required(),
  phone: yup
    .string()
    .matches(/^(?:\+?88)?0[0-9]{10}$/, 'phone number is not valid')
    .required(),
});

const BookRoom = () => {
  const { roomId } = useParams();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const [message, setMessage] = useState({ error: '', success: '' });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const response = await fetch(
      `https://beach-resort-2021-default-rtdb.firebaseio.com/booked.json?auth=${token}`,
      {
        method: 'POST',
        body: JSON.stringify({ ...data, userId, roomId }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();
    if (result.name) setMessage({ success: 'Book successfully', error: '' });
    if (!result.name)
      setMessage({ error: 'Book failed. Please, try again', success: '' });
    setTimeout(() => setMessage({ success: '', error: '' }), 3000);
  };
  return (
    <Container>
      <Row>
        <Col className="mx-auto mt-5" md={6}>
          <Alert
            show={!!message.success || !!message.error}
            variant={message.success ? 'success' : 'danger'}
          >
            {message.success || message.error}
          </Alert>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={register}
                className="rounded-0"
                name="name"
                type="text"
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                ref={register}
                className="rounded-0"
                name="phone"
                type="tel"
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="rounded-0" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookRoom;
