import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import Button from 'react-bootstrap/Button';

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();
  const grandTotal = formatCurrency(totals['scoops'] + totals['toppings']);
  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand Total: {grandTotal}</h2>
      <Button variant='light' onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </>
  );
};

export default OrderEntry;
