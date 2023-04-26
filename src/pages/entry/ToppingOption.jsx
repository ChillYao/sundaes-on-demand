import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemcount } = useOrderDetails();
  const handleChange = (e) => {
    updateItemcount(name, e.target.checked ? 1 : 0, 'toppings');
  };
  return (
    <Col xs={12} sm={6} md={4} lg={4} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/toppings/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type='checkbox'
          onChange={handleChange}
          label={name}
          aria-label={name}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
