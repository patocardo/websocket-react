import React from 'react';
import { useDispatch } from 'react-redux';
import PrecisionSelector from './PrecisionSelector';
import './WebSocket.css';

const WebSocketComponent = () => {
  const dispatch = useDispatch();

  const connect = () => {
    dispatch({ type: 'CONNECT' });
  };
  
  const disconnect = () => {
    dispatch({ type: 'DISCONNECT' });
  };
  
  return (
    <div className="control-group float-right">
      <button onClick={connect} className="control-btn">Connect</button>
      <button onClick={disconnect} className="control-btn">Disconnect</button>
      <PrecisionSelector />
    </div>
  );
};
  
export default WebSocketComponent;
