import React from "react";
import Person from "./Person";

const Persons = ({ persons, query, click }) => {
  const filteredPeople = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      {filteredPeople.map((person) => (
        <Person key={person.id} person={person} eventHandler={click} />
      ))}
    </div>
  );
};

export default Persons;
