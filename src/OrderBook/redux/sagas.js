import { eventChannel, END } from '@redux-saga/core';
import { take, call, put, fork, takeLatest, cancelled, cancel } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';

export function createWebSocketConnection() {
    return new WebSocket('wss://api-pub.bitfinex.com/ws/2');
}

export function createWebSocketChannel(socket) {
    return eventChannel(emit => {
        socket.onmessage = event => {
            emit(event);
        };
        socket.onclose = () => {
            // Close the channel when the WebSocket is closed
            emit(END);
        };
        return () => {
            socket.onmessage = null;
        };
    });
}

function* watchMessages(socket) {
    const channel = yield call(createWebSocketChannel, socket);
    while (true) {
        const event = yield take(channel);
        const response = JSON.parse(event.data);
        if (response.event !== 'info' && !response.event) {
            yield put({ type: 'FETCH_ORDER_BOOK_DATA_SUCCESS', payload: response[1] });
        }
    }
}

function* manageWebSocketConnection() {
  const socket = yield call(createWebSocketConnection);
  const socketTask = yield fork(watchMessages, socket);

  const prec = yield select(state => state.prec); // get the current prec value from the Redux store

  yield call([socket, socket.addEventListener], 'open', function onOpen() {
      // Subscribe to order book updates
      const msg = JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: 'tBTCUSD',
          prec,
      });
      socket.send(msg);
  });

  try {
      yield take('DISCONNECT');
  } finally {
      if (yield cancelled()) {
          socket.close();
      }
      yield cancel(socketTask);
  }
}

function* rootSaga() {
    yield takeLatest('CONNECT', manageWebSocketConnection);
}

export default rootSaga;
