import React from "react";

const Filter = ({ onQueryChangeHandler }) => (
  <div>
    filter shown with: <input onChange={onQueryChangeHandler} />
  </div>
);

export default Filter;
