import { call, put } from 'redux-saga/effects';
import { manageWebSocketConnection, createWebSocketConnection } from './sagas';
import WS from 'jest-websocket-mock';
// 'wss://api-pub.bitfinex.com/ws/2'
describe('WebSocket Saga', () => {
  it('should handle WebSocket connection and messages', async () => {
    const server = new WS('wss://api-pub.bitfinex.com/ws/2');
    const gen = manageWebSocketConnection();

    expect(gen.next().value).toEqual(call(createWebSocketConnection));  // corrected here

    await server.connected;
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    expect(gen.next(socket).value).toEqual(fork(watchMessages, socket));  // assuming you have watchMessages saga

    server.send('some message');
    expect(gen.next({ data: 'some message' }).done).toBe(true);

    server.close();
  });
});
