import './App.css';
import OrderBook from './OrderBook/OrderBook';
import WebSocketComponent from './OrderBook/WebSocket';

function App() {
  return (
    <div className="App">
      <WebSocketComponent />
      <OrderBook />
    </div>
  );
}

export default App;
