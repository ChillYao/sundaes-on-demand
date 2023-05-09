import React,{useState} from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import Button from 'react-bootstrap/Button';

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();
  const grandTotal = totals['scoops'] + totals['toppings'];
  const formatedGrandTotal = formatCurrency(grandTotal);
  const orderButtonDisabled = totals.scoops === 0;
  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand Total: {formatedGrandTotal}</h2>
      <Button variant='light' onClick={() => setOrderPhase('review')} disabled={orderButtonDisabled}>
        Order Sundae!
      </Button>
    </>
  );
};

export default OrderEntry;
