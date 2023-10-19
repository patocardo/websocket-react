import React from 'react';
import { useSelector } from 'react-redux';
import './OrderBook.css';

const OrderBook = () => {
  const {tradingBook } = useSelector(state => state.orderBook);  // Access the data from the Redux store

  return (
    <div>
      <h2>Trading Book</h2>
      <table className="table-dark">
        <caption className="table-caption">Order Book Bids</caption>
        <thead>
          <tr>
            <th scope="col">Price</th>
            <th scope="col">Count</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tradingBook.bids).map(([price, { count, amount }]) => (
            <tr key={price}>
              <td>{price}</td>
              <td>{count}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default OrderBook;
