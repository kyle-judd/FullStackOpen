import React from "react";

const Filter = ({ onChangeHandler }) => (
  <div>
    find countries <input onChange={onChangeHandler} />
  </div>
);

export default Filter;
