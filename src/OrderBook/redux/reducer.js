const initialState = {
  tradingBook: {
    bids: {},
    asks: {},
  },
  prec: 'P0',
};

const orderBookReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ORDER_BOOK_DATA_SUCCESS': {
      const { payload } = action;
      const [price, count, amount] = payload;
      let updatedState = { ...state };
      
      // Algorithm for trading book
      if (count > 0) {
        if (amount > 0) {
          updatedState = {
            ...updatedState,
            tradingBook: {
              ...updatedState.tradingBook,
              bids: {
                ...updatedState.tradingBook.bids,
                [price]: { count, amount }
              }
            }
          };
        } else if (amount < 0) {
          updatedState = {
            ...updatedState,
            tradingBook: {
              ...updatedState.tradingBook,
              asks: {
                ...updatedState.tradingBook.asks,
                [price]: { count, amount }
              }
            }
          };
        }
      } else if (count === 0) {
        if (amount === 1) {
          const { [price]: removed, ...restBids } = updatedState.tradingBook.bids;
          updatedState = {
            ...updatedState,
            tradingBook: {
              ...updatedState.tradingBook,
              bids: restBids
            }
          };
        } else if (amount === -1) {
          const { [price]: removed, ...restAsks } = updatedState.tradingBook.asks;
          updatedState = {
            ...updatedState,
            tradingBook: {
              ...updatedState.tradingBook,
              asks: restAsks
            }
          };
        }
      }
      
      return updatedState;
    }
    case 'UPDATE_PRECISION':
      return {
        ...state,
        prec: action.payload,
      };
    default:
      return state;
  }
};

export default orderBookReducer;
