// PrecisionSelector.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePrecision } from './redux/actions';

const PrecisionSelector = () => {
  const dispatch = useDispatch();
  
  const handleSelect = (event) => {
    dispatch(updatePrecision(event.target.value));
  };
  
  return (
    <select onChange={handleSelect} defaultValue="P0" className="precision-selector">
      <option value="P0">P0</option>
      <option value="P1">P1</option>
      <option value="P2">P2</option>
      <option value="P3">P3</option>
      <option value="P4">P4</option>
    </select>
    );
  };
  
  export default PrecisionSelector;
