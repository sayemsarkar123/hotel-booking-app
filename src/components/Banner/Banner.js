import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const Banner = ({ btnText, desc, href, imageURL, isRoomDetails, title }) => {
  const history = useHistory();
  return (
    <Container
      className="py-5"
      style={{
        backgroundImage: `url(/assets/images/${imageURL})`,
        backgroundSize: 'cover',
      }}
      fluid
    >
      <Row>
        <Col className="mx-auto" md={8}>
          <div
            style={{ backgroundColor: 'rgba(0 0 0 / 50%)' }}
            className="text-center my-5 py-5"
          >
            <h1
              style={{ fontSize: '4rem' }}
              className="text-capitalize text-white font-weight-bold"
            >
              {title}
            </h1>
            <div
              className="mx-auto mt-3"
              style={{
                width: '10rem',
                height: '0.3rem',
                backgroundColor: '#af9a7d',
              }}
            ></div>
            <p
              style={{ fontSize: '1.2rem' }}
              className="text-capitalize text-white font-weight-bold my-4"
            >
              {desc}
            </p>
            {isRoomDetails ? (
              <button
                onClick={() => history.push(`/book/${href}`)}
                style={{ backgroundColor: '#af9a7d' }}
                className="text-uppercase text-dark btn rounded-0"
              >
                {btnText}
              </button>
            ) : (
              <Link
                to={href}
                style={{ backgroundColor: '#af9a7d' }}
                className="text-uppercase text-decoration-none text-dark btn rounded-0"
              >
                {btnText}
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
