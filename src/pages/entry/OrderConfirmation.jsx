import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = () => {
  const [orderNumber, setOrderNumber] = useState(null);
  const { setOrderPhase } = useOrderDetails();
  axios
    .post(`http://localhost:3030/order`)
    .then((response) => {
      console.log(response);
      setOrderNumber(response);
    })
    .catch((error) => {
      // todo: optional extra practice
    });

  const loadingPage = <h2>Loading</h2>;
  const confirmationPage = (
    <div>
      <h2>Thanks You!</h2>
      <p>Order Number: {orderNumber}</p>
      <Button onClick={() => setOrderPhase('inProgress')}>New Order</Button>
    </div>
  );
  const pageToShow = orderNumber === null ? loadingPage : confirmationPage;
  return pageToShow;
};

export default OrderConfirmation;
