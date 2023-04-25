import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext();

// create custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example: { Chocholate: 1, Vanila: 2 }
    toppings: {}, // example: { GummiBear: 1 }
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    // make a copy of exisiting state
    const newOptionCounts = { ...optionCounts };
    // update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;
    // update the state with the updated copy
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {},
    });
  }

  function calculateTotal(optionType) {
    // get the counts for array for optionType
    const countsArray = Object.values(optionCounts[optionType]);
    // get the total number
    const totalCount = countsArray.reduce(
      (accumulator, currentNumber) => accumulator + currentNumber,
      0
    );
    // calculate the total price
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
