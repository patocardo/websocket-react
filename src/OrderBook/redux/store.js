import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
  // middleware: [sagaMiddleware]
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
