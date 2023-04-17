import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  //optionType is 'scoops' or 'toppings'

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // Todo: handle error response
      });
  }, [optionType]);

  // TODO: Replace null with ToppingOption when available
  const ItemCompoent = optionType === 'scoops' ? ScoopOption : null;
  const optionItems = items.map((item) => (
    <ItemCompoent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}
