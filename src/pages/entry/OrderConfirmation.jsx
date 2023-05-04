import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    axios
      .post(`http://localhost:3030/order`, { signal: controller.signal })
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        // todo: optional extra practice
      });
    return controller.abort();
  }, []);

  const loadingPage = <h2>Loading</h2>;
  const confirmationPage = (
    <div>
      <h2>Thanks You!</h2>
      <p>Order Number: {orderNumber}</p>
      <Button onClick={() => setOrderPhase('inprogress')}>New Order</Button>
    </div>
  );
  const pageToShow = orderNumber === null ? loadingPage : confirmationPage;
  return pageToShow;
};

export default OrderConfirmation;
