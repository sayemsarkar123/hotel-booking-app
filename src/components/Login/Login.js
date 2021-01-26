import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth } from '../../features/roomsSlice/roomsSlice';
import { useHistory, useLocation } from 'react-router-dom';

const schema = yup.object({
  mode: yup.ref('$mode'),
  name: yup
    .string()
    .min(6)
    .when('mode', (mode, schema) =>
      mode === 'Register' ? schema.required() : schema
    ),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
      'password at least one letter, one numeral, one special charcacter and six character'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password did not matched')
    .when('mode', (mode, schema) =>
      mode === 'Register' ? schema.required() : schema
    ),
});

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [mode, setMode] = useState('Login');
  const { register, handleSubmit, errors } = useForm({
    context: { mode },
    resolver: yupResolver(schema),
  });
  const error = useSelector((state) => state.error);
  const success = useSelector((state) => state.success);
  const changeMode = () => setMode(mode === 'Login' ? 'Register' : 'Login');
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(userAuth(data, () => history.replace(from)));
  };

  return (
    <Container>
          <Row>
            <Col className="mx-auto mt-5" md={6}>
              <div className="text-right">
                <button
                  onClick={changeMode}
                  className="btn btn-primary rounded-0"
                >
                  {mode === 'Login' ? 'Register' : 'Login'}
                </button>
              </div>
              <Alert
                className="mt-3"
                show={!!success || !!error}
                variant={success ? 'success' : 'danger'}
              >
                {success || error}
              </Alert>
              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                {mode === 'Register' && (
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      isInvalid={!!errors.name}
                      ref={register}
                      name="name"
                      className="rounded-0"
                      type="text"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.email}
                    ref={register}
                    name="email"
                    className="rounded-0"
                    type="email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.password}
                    ref={register}
                    name="password"
                    className="rounded-0"
                    type="password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                {mode === 'Register' && (
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      isInvalid={!!errors.confirmPassword}
                      ref={register}
                      name="confirmPassword"
                      className="rounded-0"
                      type="password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Button className="rounded-0" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
  );
};

export default Login;
