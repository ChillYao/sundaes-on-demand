import './App.css';
import { Container } from 'react-bootstrap';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/entry/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';

function App() {
  const [orderPhase, setOrderPhase] = useState('inprogress');

  let orderPhaseToRender;
  if (orderPhase === 'inprogress') {
    orderPhaseToRender = <OrderEntry setOrderPhase={setOrderPhase} />;
  }
  if (orderPhase === 'review') {
    orderPhaseToRender = <OrderSummary setOrderPhase={setOrderPhase} />;
  }
  if (orderPhase === 'complete') {
    orderPhaseToRender = <OrderConfirmation setOrderPhase={setOrderPhase} />;
  }

  return (
    <div className='App'>
      <Container>
        <OrderDetailsProvider>
          {/*Summary page and entry page needs provider*/}
          {orderPhaseToRender}
          {/*Confirmation Page does not need provider*/}
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;
