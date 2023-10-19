import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrecisionSelector from './PrecisionSelector';
import './WebSocket.css';

const WebSocketComponent = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.isConnected);

  const connect = () => {
    dispatch({ type: 'CONNECT' });
  };
  
  const disconnect = () => {
    dispatch({ type: 'DISCONNECT' });
  };
  
  return (
    <div className="control-group float-right">
      <button onClick={connect} disabled={isConnected} className="control-btn">Connect</button>
      <button onClick={disconnect} disabled={!isConnected} className="control-btn">Disconnect</button>
      <PrecisionSelector />
    </div>
  );
};
  
export default WebSocketComponent;
