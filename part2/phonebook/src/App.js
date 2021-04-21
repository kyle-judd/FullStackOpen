import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [query, setQuery] = useState("");

  const onNameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const onPhoneNumberChangeHandler = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const onQueryChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists!`);
    } else {
      setPersons(persons.concat({ name: newName, number: newPhoneNumber }));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={onQueryChangeHandler} />
      </div>
      <h1>add a new</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input onChange={onNameChangeHandler} />
        </div>
        <div>
          number: <input onChange={onPhoneNumberChangeHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
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
};

export default App;
