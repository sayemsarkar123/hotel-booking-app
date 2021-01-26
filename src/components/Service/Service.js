import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Service = ({ service: { icon, title, desc } }) => {
  return (
    <Col md={3}>
      <div className="text-center">
        <span style={{ color: '#af9a7d', fontSize: '2.5rem' }}>
          {<FontAwesomeIcon icon={icon} />}
        </span>
        <h6 style={{fontSize: '1.1rem'}} className="text-capitalize font-weight-bold my-3">{title}</h6>
        <p>{desc}</p>
      </div>
    </Col>
  );
};

export default Service;
