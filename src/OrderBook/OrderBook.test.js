import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from './redux/store';  // adjust the import path accordingly
import WebSocketComponent from './WebSocket';
import OrderBook from './OrderBook';

test('OrderBook displays a table with values after 5 seconds of pressing the connect button', async () => {
    // Render the WebSocketComponent and OrderBook component within the Redux Provider
    render(
        <Provider store={store}>
            <WebSocketComponent />
            <OrderBook />
        </Provider>
    );

    // Find the "Connect" button and click it
    fireEvent.click(screen.getByText('Connect'));

    // Wait for 3 seconds
    await act(() => new Promise(res => setTimeout(res, 3000)));

    // Now check if the table has some rows with data
    await waitFor(() => {
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBeGreaterThan(1);
        
        // Check if the first data row contains numbers
        const firstDataRow = rows[1];
        const cells = firstDataRow.cells;
        expect(Number(cells[0].textContent)).not.toBeNaN();  // Price should be a number
        expect(Number(cells[1].textContent)).not.toBeNaN();  // Count should be a number
        expect(Number(cells[2].textContent)).not.toBeNaN();  // Amount should be a number
    });
});
