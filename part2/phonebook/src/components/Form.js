import React from "react";

const Form = ({ submitHandler, handleNameChange, handlePhoneNumberChange }) => (
  <form onSubmit={submitHandler}>
    <div>
      name: <input onChange={handleNameChange} />
    </div>
    <div>
      number: <input onChange={handlePhoneNumberChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default Form;
