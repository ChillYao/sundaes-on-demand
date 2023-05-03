import './App.css';
import { Container } from 'react-bootstrap';
import { useOrderDetails } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/entry/OrderConfirmation';

function App() {
  const { orderPhase } = useOrderDetails();

  let orderPhaseToRender;
  if (orderPhase === 'inprogress') {
    orderPhaseToRender = <OrderEntry />;
  }
  if (orderPhase === 'review') {
    orderPhaseToRender = <OrderSummary />;
  }
  if (orderPhase === 'complete') {
    orderPhaseToRender = <OrderConfirmation />;
  }

  return (
    <div className='App'>
      <Container>
        {/*Summary page and entry page needs provider*/}
        {orderPhaseToRender}
        {/*Confirmation Page does not need provider*/}
      </Container>
    </div>
  );
}

export default App;
