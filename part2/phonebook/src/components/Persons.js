import React from "react";

const Persons = ({ persons, query, click }) => (
  <div>
    {persons.map((person) => {
      if (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        query === ""
      ) {
        return (
          <div key={person.name}>
            <p>
              {person.name} {person.number}
            </p>
            <button onClick={() => click(person)}>delete</button>
          </div>
        );
      }
      return;
    })}
  </div>
);

export default Persons;
