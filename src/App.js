import './App.css';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';

function App() {
  return (
    <div className='App'>
      <Container>
        <OrderDetailsProvider>
          {/*Summary page and entry page needs provider*/}
          <OrderEntry />
        </OrderDetailsProvider>
        {/*Confirmation Page does not need provider*/}
      </Container>
    </div>
  );
}

export default App;
