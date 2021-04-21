import React from "react";

const Persons = ({ persons, query }) => (
  <div>
    {persons.map((person) => {
      if (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        query === ""
      ) {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      }
      return;
    })}
  </div>
);

export default Persons;
