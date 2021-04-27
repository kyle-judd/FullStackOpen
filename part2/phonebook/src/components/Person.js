import React from "react";

const Person = ({ person, eventHandler }) => (
  <div>
    <p>
      <strong>{person.name}</strong>
    </p>
    <p>{person.number}</p>
    <button onClick={() => eventHandler(person)}>Delete Entry</button>
  </div>
);

export default Person;
