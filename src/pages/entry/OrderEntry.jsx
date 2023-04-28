import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

const OrderEntry = () => {
  const { totals } = useOrderDetails();
  const grandTotal = formatCurrency(totals['scoops'] + totals['toppings']);
  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand Total: {grandTotal}</h2>
    </>
  );
};

export default OrderEntry;
